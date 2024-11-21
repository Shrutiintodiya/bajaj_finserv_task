import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
    const [jsonInput, setJsonInput] = useState(""); // To store user input
    const [response, setResponse] = useState(null); // To store API response
    const [filter, setFilter] = useState({ alphabets: false, numbers: false, highest_lowercase_alphabet: false }); // To store selected filter options

    // Update the document title with your roll number
    document.title = "0827CS211231"; // Replace 'Your Roll Number' with your actual roll number

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Parse the JSON input and send it to the backend
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post("https://bajaj-finserv-backend-flnp.onrender.com/bfhl", parsedInput); // Update URL for deployment
            setResponse(res.data);
        } catch (error) {
            alert("Invalid JSON or server error");
        }
    };

    // Handle the checkbox change for filter options
    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: checked,
        }));
    };

    return (
        <div className="app-container">
            <h1 className="app-title">API Input</h1>
            
            {/* Form to accept JSON input */}
            <form onSubmit={handleSubmit}>
                <div className="input-section">
                    <textarea
                        className="json-input"
                        placeholder='Enter JSON input (e.g., { "data": ["A", "1", "b"] })'
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>

            {/* Error handling */}
            <p className="error-message">{jsonInput && !response ? "Please enter valid JSON" : ""}</p>

            {/* After valid JSON submission */}
            {response && (
                <>
                    <div className="filter-section">
                        <h2>Multi Filter</h2>

                        {/* Checkbox for multi-select filter options */}
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="alphabets"
                                    checked={filter.alphabets}
                                    onChange={handleFilterChange}
                                />
                                Alphabets
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="numbers"
                                    checked={filter.numbers}
                                    onChange={handleFilterChange}
                                />
                                Numbers
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="highest_lowercase_alphabet"
                                    checked={filter.highest_lowercase_alphabet}
                                    onChange={handleFilterChange}
                                />
                                Highest Lowercase Alphabet
                            </label>
                        </div>
                    </div>

                    <div className="filtered-response" style={{ marginTop: "20px" }}>
                        {/* Conditional rendering based on selected filters */}
                        {filter.alphabets && (
                            <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>
                        )}
                        {filter.numbers && (
                            <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>
                        )}
                        {filter.highest_lowercase_alphabet && (
                            <p><strong>Highest Lowercase Alphabet:</strong> {response.highest_lowercase_alphabet}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
