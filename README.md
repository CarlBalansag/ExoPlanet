2025 NASA Space Apps Challenge

A World Away: Hunting for Exoplanets with AI

Group: vibe coding only
- Nick
- Carl
- Mahad
- Lynn
- Tahmid
- Javier

Getting started
===============

This repository contains a small Flask backend (model inference) and a React + TypeScript frontend. Below are concise, copy-paste PowerShell instructions to get both running on Windows. These steps assume you have Python 3.10+ and Node.js installed.

Backend (Flask + TensorFlow)
----------------------------

1. Open PowerShell and change to the backend folder:

```powershell
cd .\backend
```

2. Create a virtual environment and activate it (recommended):

```powershell
python -m venv .venv
. .venv\Scripts\Activate.ps1
```

3. Install Python dependencies. If a requirements file isn't present, install the essentials used by the project:

```powershell
pip install --upgrade pip
pip install flask flask-cors flask-socketio tensorflow numpy
```

4. Make sure the model file `exoplanet_lightcurve_cnn.h5` exists in the `backend/` folder. The `/predict` endpoint expects JSON with fields `time` (CSV string), `flux` (CSV string), `period`, and `t0`.

5. Run the backend server (development):

```powershell
# from backend folder
py app.py
```


Frontend (React + TypeScript)
----------------------------

1. Open a new PowerShell window and change to the frontend folder:

```powershell
cd ..\frontend
```

2. Install node dependencies:

```powershell
npm install
```

3. Start the dev server:

```powershell
npm start
```

By default the dev server runs on http://localhost:3000 

Testing / testcases
-------------------

- Useful test inputs are in `backend/testcases/` (JSON files). Each file contains `time`, `flux` (both CSV strings) and `period`, `t0` fields. You can POST these files directly to the backend for a quick check.

Example PowerShell POST (send a saved testcase to the backend):

```powershell
$body = Get-Content .\backend\testcases\kepler227_synth.json -Raw
Invoke-RestMethod -Uri http://localhost:5000/predict -Method Post -Body $body -ContentType 'application/json'
```

If you get a CORS or network error when the frontend tries to call the backend, verify both servers are running and check the browser console (DevTools) for the actual error.

Notes and troubleshooting
-------------------------

- The backend's preprocessing mirrors the training code: flux is median-centered and scaled by std, the time domain is phase-folded using period and t0, then interpolated to the model input size (501 samples). If you modify preprocessing in `backend/app.py`, re-check parity with `backend/ai_model_training/data_processing.py` (training code).
- If the model returns unexpectedly confident outputs on tiny inputs, provide longer, higher-sample testcases (the `backend/testcases/` folder contains some exported Kepler examples and a synthesized confirmed-like transit `kepler227_synth.json`).
- To enable detailed debugging in the backend (raw logits, preprocessed array), update `/predict` to return additional fields guarded by a query parameter (e.g. `?debug=1`).

If anything is unclear or you'd like me to add an automated script to start both servers (or to create a `requirements.txt` / `package.json` scripts), tell me and I can add it.
