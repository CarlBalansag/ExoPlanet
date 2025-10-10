import os
import glob
import numpy as np
import pandas as pd
from io import StringIO
from sklearn.model_selection import train_test_split
from sklearn.utils import resample


KOI_CSV_PATH = "data/koi_cumulative.csv"
OUTPUT_DIR = "processed_data"
TBL_DIR = "data/AMATEUR"

koi_df = pd.read_csv(KOI_CSV_PATH, comment='#')
koi_df = koi_df[['kepid', 'kepoi_name', 'koi_disposition', 'koi_period', 'koi_time0bk']]
koi_df['koi_disposition'] = koi_df['koi_disposition'].str.upper()

label_mapping = {
    'CONFIRMED': 1,
    'CANDIDATE': 0,       
    'FALSE POSITIVE': 0
}

def process_single_tbl_file(filepath, fixed_size=501):
    metadata = {}

    try:
        with open(filepath, 'r') as f:
            content = f.read()

        # --- Extract metadata ---
        for line in content.splitlines():
            if line.startswith('\\'):
                parts = line[1:].split('=', maxsplit=1)
                if len(parts) == 2:
                    key = parts[0].strip()
                    value = parts[1].strip().strip("'")
                    metadata[key] = value
        period = float(metadata.get('PERIOD', 1.0))  
        t0 = float(metadata.get('FIT_TRANSIT_MIDPOINT', 0.0))

        lines = content.splitlines()
        data_start_index = None
        for i, line in enumerate(lines):
            if line.strip().startswith('|') and any(c in line for c in ['TIME', 'BJD']):
                data_start_index = i
                break
        if data_start_index is None:
            raise ValueError(f"No table found in {filepath}")

        data_table_str = "\n".join(lines[data_start_index:])
        lc_df = pd.read_fwf(StringIO(data_table_str), header=0)
        lc_df.columns = [col.strip().strip('|') for col in lc_df.columns]

        time_col = next((c for c in ['TIME', 'TIME_BJD', 'BJD'] if c in lc_df.columns), None)
        flux_col = next((c for c in ['PDCSAP_FLUX', 'SAP_FLUX'] if c in lc_df.columns), None)

        if time_col is None or flux_col is None:
            raise ValueError(f"Missing time or flux columns in {filepath}")

        time = pd.to_numeric(lc_df[time_col], errors='coerce').values
        flux = pd.to_numeric(lc_df[flux_col], errors='coerce').values

        valid = np.isfinite(time) & np.isfinite(flux)
        time, flux = time[valid], flux[valid]
        if len(flux) == 0:
            raise ValueError(f"No valid numeric flux in {filepath}")

        flux_std = np.std(flux)
        flux_std = flux_std if flux_std != 0 else 1.0
        flux = (flux - np.median(flux)) / flux_std

        phase = (time - t0) / period
        phase = phase - np.floor(phase + 0.5)
        sorted_idx = np.argsort(phase)
        phase, flux = phase[sorted_idx], flux[sorted_idx]
        phase, unique_idx = np.unique(phase, return_index=True)
        flux = flux[unique_idx]
        resampled_flux = np.interp(np.linspace(-0.5, 0.5, fixed_size), phase, flux)

        return resampled_flux, metadata

    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None, None


def match_koi_label(metadata):
    kepler_id = metadata.get('KEPLERID', None)
    if kepler_id is None:
        return None
    match = koi_df[koi_df['kepid'] == int(kepler_id)]
    if not match.empty:
        disp = match.iloc[0]['koi_disposition']
        return label_mapping.get(disp, None)
    return None


def create_dataset_from_all_tbl_files(tbl_dir, fixed_size=501):
    X, y = [], []
    for filepath in glob.glob(os.path.join(tbl_dir, '*.tbl')):
        flux, metadata = process_single_tbl_file(filepath, fixed_size)
        if flux is None:
            continue
        label = match_koi_label(metadata)
        if label is None:
            print(f"No KOI match for {metadata.get('KEPLERID', 'Unknown')} – skipping")
            continue
        X.append(flux)
        y.append(label)
    return np.array(X), np.array(y)


print("Starting data preprocessing. This may take some time...")
X_data, y_data = create_dataset_from_all_tbl_files(TBL_DIR)

X_train, X_test, y_train, y_test = train_test_split(X_data, y_data, test_size=0.2, random_state=42)

X_minority = X_train[y_train == 1]
y_minority = y_train[y_train == 1]
n_majority = len(y_train[y_train == 0])

if len(X_minority) > 0 and len(X_minority) < n_majority:
    X_resampled, y_resampled = resample(
        X_minority, y_minority,
        replace=True,
        n_samples=n_majority,
        random_state=42
    )
    X_train = np.vstack([X_train[y_train == 0], X_resampled])
    y_train = np.hstack([y_train[y_train == 0], y_resampled])

print(f"\nLight curve training data shape: {X_train.shape}")
print(f"Labels training data shape: {y_train.shape}")


if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

np.savez(os.path.join(OUTPUT_DIR, 'exoplanet_data.npz'),
         X_train=X_train,
         X_test=X_test,
         y_train=y_train,
         y_test=y_test)

print(f"Data saved to {os.path.join(OUTPUT_DIR, 'exoplanet_data.npz')}")