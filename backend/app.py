from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


model = tf.keras.models.load_model("exoplanet_lightcurve_cnn.h5")

@app.route("/api/hello", methods=["GET","POST"])
def hello():
    return jsonify({"message": "Hello from Flask backend!"})


@app.route("/predict", methods=["GET","POST"])
def predict():
    if request.method == "OPTIONS":
        response = app.make_default_options_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    data = request.get_json(force=True)
    time = np.array([float(x.strip()) for x in data["time"].split(",")])
    flux = np.array([float(x.strip()) for x in data["flux"].split(",")])
    period = float(data["period"])
    t0 = float(data["t0"])
    # Validate lengths
    if len(time) != len(flux):
        return jsonify({"error": "time and flux arrays must have same length"}), 400

    # --- Normalize using median and std (same as training preprocessing) ---
    flux_std = np.std(flux)
    flux_std = flux_std if flux_std != 0 else 1.0
    flux = (flux - np.median(flux)) / flux_std

    # --- Phase fold (same math as data_processing.process_single_tbl_file) ---
    phase = (time - t0) / period
    phase = phase - np.floor(phase + 0.5)

    # Sort by phase
    sorted_idx = np.argsort(phase)
    phase_sorted = phase[sorted_idx]
    flux_sorted = flux[sorted_idx]

    # Remove duplicate phases keeping first occurrence (unique in training code)
    phase_unique, unique_idx = np.unique(phase_sorted, return_index=True)
    flux_unique = flux_sorted[unique_idx]

    # Interpolate to fixed input size
    fixed_size = 501
    flux_interp = np.interp(np.linspace(-0.5, 0.5, fixed_size), phase_unique, flux_unique)

    X_input = flux_interp.reshape(1, fixed_size, 1)

    predictions = model.predict(X_input)
    predicted_class = int(np.argmax(predictions, axis=1)[0])
    probability = float(np.max(predictions))

    return jsonify({
        "prediction": "Exoplanet" if predicted_class == 1 else "Not Exoplanet",
        "probability": probability
    })

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('message')
def handle_message(msg):
    print('Message from client:', msg)
    send('Server received your message: ' + msg)

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
