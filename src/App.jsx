import React, { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newExpense, setNewExpense] = useState({ name: "", description: "", amount: "" });
  const [sortBy, setSortBy] = useState("");

  React.useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  // Add a new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.name || !newExpense.description || !newExpense.amount) {
      alert("Please fill out all fields before adding an expense.");
      return;
    }
    if (newExpense.amount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }
    setExpenses([...expenses, newExpense]);
    setNewExpense({ name: "", description: "", amount: "" });
  };

  // Delete an expense
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  // Sort expenses
  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sortedExpenses = [...expenses].sort((a, b) => {
      if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) return -1;
      if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) return 1;
      return 0;
    });
    setExpenses(sortedExpenses);
  };

  // Filter expenses based on the search term
  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("New Expense:", newExpense);
  console.log("Expenses List:", expenses);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      />

      {/* Expense Form */}
      <form onSubmit={handleAddExpense} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={newExpense.name}
          onChange={handleInputChange}
          style={{ marginRight: "10px", padding: "10px" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newExpense.description}
          onChange={handleInputChange}
          style={{ marginRight: "10px", padding: "10px" }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          style={{ marginRight: "10px", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Add Expense
        </button>
      </form>

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => handleSort(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="description">Description</option>
      </select>

      {/* Expense Table */}
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteExpense(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
