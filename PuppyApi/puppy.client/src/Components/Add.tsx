import { useState } from "react";
import "../Components/Style.css";

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
        <div>
            <div className="add-area">
                <form className="grid-container-form" onSubmit={handleSubmit}>
                    <input
                        className="form-item1"
                        required
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        className="form-item2"
                        value={breed}
                        onChange={(e: any) => setBreed(e.target.value)}
                        type="text"
                        placeholder="Breed"
                    />
                    <input
                        className="form-item3"
                        value={birthdate}
                        onChange={(e: any) => setBirthdate(e.target.value)}
                        type="date"
                    />
                    <div>
                        <button className="form-item4">Add Puppy</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;