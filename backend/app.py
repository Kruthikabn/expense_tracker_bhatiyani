from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables cross-origin requests from frontend

# ✅ Optional test route for browser check
@app.route('/')
def home():
    return '✅ Backend is working!'

# In-memory list to simulate a database
expenses = []

# Get all expenses
@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    return jsonify(expenses)

# Add a new expense
@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.json
    expenses.append(data)
    return jsonify(data), 201

# Delete an expense by index
@app.route('/api/expenses/<int:index>', methods=['DELETE'])
def delete_expense(index):
    if index < 0 or index >= len(expenses):
        return jsonify({'error': 'Index out of range'}), 404
    expenses.pop(index)
    return jsonify({'msg': 'Deleted'}), 200

# Start the Flask server
if __name__ == '__main__':
    app.run(debug=True)



    
