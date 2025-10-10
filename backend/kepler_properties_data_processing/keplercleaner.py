import pandas as pd
import tensorflow as tf

# === Step 1. Load dataset ===
df = pd.read_csv("keplerdataset.csv")
print("Original shape:", df.shape)

# === Step 2. Standardize column names ===
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

# === Step 3. Drop duplicates, empty columns, and unwanted columns ===
df = df.drop_duplicates()
df = df.dropna(axis=1, how="all")

cols_to_drop = ["kepid", "koiname", "kepler_name", "disposition_score"]
df = df.drop(columns=[c for c in cols_to_drop if c in df.columns], errors="ignore")

# === Step 4. Handle missing values ===
# Fill numeric columns with their median
num_cols = df.select_dtypes(include=["float64", "int64"]).columns
df[num_cols] = df[num_cols].fillna(df[num_cols].median())

# Strip whitespace from text/object columns
obj_cols = df.select_dtypes(include=["object"]).columns
df[obj_cols] = df[obj_cols].apply(lambda x: x.str.strip())

# === Step 5. TensorFlow Normalization ===
# Create TensorFlow normalization layer
normalizer = tf.keras.layers.Normalization(axis=-1)

# Fit normalization on numeric data
normalizer.adapt(df[num_cols])

# Apply normalization
normalized_values = normalizer(df[num_cols])

# Replace numeric columns with normalized values
df[num_cols] = normalized_values.numpy()

# === Step 6. Save cleaned + normalized dataset ===
output_path = "keplerdataset_cleaned_normalized_tf.csv"
df.to_csv(output_path, index=False)

print("\n✅ Cleaning + TensorFlow normalization complete!")
print(f"Saved as: {output_path}")
print("Final shape:", df.shape)
print("Remaining columns:\n", df.columns.tolist())
