import React, { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newExpense, setNewExpense] = useState({ name: "", description: "", amount: "" });
  const [sortBy, setSortBy] = useState("");
 
}

export default App
