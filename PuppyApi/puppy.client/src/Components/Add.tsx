import { useState } from "react";

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
        <div className="create">
            <h2>Add a New Puppy</h2>
            <form onSubmit={handleSubmit}>

                <label>Name:</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Breed:</label>
                <input
                    type="text"
                    required
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                <label>Birth date:</label>
                <input
                    type="text"
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
                <button>Add Puppy</button>
            </form>
        </div>
    );
}

export default Add;