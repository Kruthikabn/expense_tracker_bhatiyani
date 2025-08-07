from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "data.json"

def read_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as file:
            return json.load(file)
    return {"expenses": []}

def write_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

@app.route("/api/expenses", methods=["GET"])
def get_expenses():
    data = read_data()
    return jsonify(data["expenses"])

@app.route("/api/expenses", methods=["POST"])
def add_expense():
    data = read_data()
    new_expense = request.get_json()
    data["expenses"].append(new_expense)
    write_data(data)
    return jsonify(new_expense), 201

@app.route("/api/expenses/<int:index>", methods=["DELETE"])
def delete_expense(index):
    data = read_data()
    if 0 <= index < len(data["expenses"]):
        removed = data["expenses"].pop(index)
        write_data(data)
        return jsonify({"message": "Deleted", "removed": removed})
    return jsonify({"error": "Invalid index"}), 400


@app.route("/api/notifications", methods=["GET"])
def get_notifications():
    return jsonify([
        {"id": 1, "msg": "💸 You have spent ₹500 today."},
        {"id": 2, "msg": "📈 Expenses increased compared to yesterday."},
        {"id": 3, "msg": "📝 Don't forget to log your meals."}
    ])

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

