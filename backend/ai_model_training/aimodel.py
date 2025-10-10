import numpy as np
import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.regularizers import l2

output_dir = 'processed_data'
data = np.load(os.path.join(output_dir, 'exoplanet_data.npz'))

X_train = data['X_train']
X_test = data['X_test']
y_train = data['y_train']
y_test = data['y_test']

print("Data loaded successfully.")
print(f"Loaded X_train shape: {X_train.shape}")
print(f"Loaded X_test shape: {X_test.shape}")


def build_cnn_model(input_shape, num_classes):
    model = Sequential()

    model.add(Conv1D(filters=16, kernel_size=7, activation='relu', input_shape=input_shape))
    model.add(BatchNormalization())
    model.add(MaxPooling1D(pool_size=4))

    model.add(Conv1D(filters=32, kernel_size=5, activation='relu', kernel_regularizer=l2(0.001)))
    model.add(BatchNormalization())
    model.add(MaxPooling1D(pool_size=4))

    model.add(Conv1D(filters=64, kernel_size=3, activation='relu', kernel_regularizer=l2(0.001)))
    model.add(BatchNormalization())
    model.add(MaxPooling1D(pool_size=4))

    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_classes, activation='softmax'))

    return model


fixed_size = X_train.shape[1]
num_classes = 2
input_shape = (fixed_size, 1)

model = build_cnn_model(input_shape=input_shape, num_classes=num_classes)
optimize = tf.keras.optimizers.Adam(learning_rate=0.0001)
model.compile(optimizer=optimize,
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.summary()

history = model.fit(
    X_train,
    y_train,
    epochs=100,
    batch_size=64,
    validation_data=(X_test, y_test)
)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f"\nTest accuracy: {test_acc}")

model.save("exoplanet_lightcurve_cnn.h5")
print("Model saved successfully!")
