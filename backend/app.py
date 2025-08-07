from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Data file path
DATA_FILE = 'data.json'

# Load data from file
def load_expenses():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

# Save data to file
def save_expenses(expenses):
    with open(DATA_FILE, 'w') as f:
        json.dump(expenses, f, indent=4)

# Load initial data
expenses = load_expenses()

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    return jsonify(expenses)

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    expenses.append(data)
    save_expenses(expenses)
    return jsonify(data), 201

@app.route('/api/expenses/<int:index>', methods=['DELETE'])
def delete_expense(index):
    try:
        expenses.pop(index)
        save_expenses(expenses)
        return jsonify({'msg': 'Deleted'})
    except IndexError:
        return jsonify({'error': 'Invalid index'}), 404

if __name__ == '__main__':
    app.run(debug=True)
