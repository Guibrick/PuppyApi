import { useState } from "react";
//import { Box, Button, FormControl, TextField, InputLabel} from "@mui/material";
import "../Components/Add.css";

const Add = () => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const puppy = { name, breed, birthdate };

        fetch('https://localhost:7002/api/Puppies', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(puppy)
        }).then(() => {
            console.log('New puppy added.');
        })
    }

    return (
        <div color="Blue">
            <div className="content">
                <h2>Add a New Puppy</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        value={breed}
                        onChange={(e: any) => setBreed(e.target.value)}
                        type="text"
                        placeholder="Breed"
                    />
                    <input
                        value={birthdate}
                        onChange={(e: any) => setBirthdate(e.target.value)}
                        type="date"
                    />
                    <div>
                        <button>Add Puppy</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;