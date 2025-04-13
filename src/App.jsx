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
 
}

export default App
