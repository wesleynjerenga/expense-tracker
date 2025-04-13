import React, { useState } from 'react';

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
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

  };
 
}

export default App
