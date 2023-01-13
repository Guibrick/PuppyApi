import React from 'react';
import Table from "./Components/Table";
import Add from "./Components/Add";
import "./Components/Style.css";

function App() {
    return (
        <div className="grid-container">
            <h1>Puppy API</h1>
            <h3>An app made to store puppies info.</h3>
            <Add />
            <Table />
        </div>
    );
}

export default App;
