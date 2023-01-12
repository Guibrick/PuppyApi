import { useState } from "react";
import PuppyInfo from "../Interfaces/PuppyInfo";
import getData from "../Components/Table";

const Update = () => {
    const [puppyData, setPuppyData] = useState<PuppyInfo[]>([]);
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [birthdate, setBirthdate] = useState('');

    function selectPuppy(id: number) {
        const item = puppyData[id - 1];
        setId(item.id)
        setName(item.name)
        setBreed(item.breed)
        setBirthdate(item.birthdate);
    }

    function updatePuppy() {
        const puppy = { name, breed, birthdate }
        fetch(`https://localhost:7002/api/Puppies/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(puppy)
        }).then((result) => {
            result.json().then((resp) => {
                getData()
            })
        })
    }

    return (
        <div className="App">
            <h1>Update User Data With API </h1>
            <button onClick={() => selectPuppy(id)}>Update</button>
            <div>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /> <br /><br />
                <input type="text" value={breed} onChange={(e) => { setBreed(e.target.value) }} /> <br /><br />
                <input type="text" value={birthdate} onChange={(e) => { setBirthdate(e.target.value) }} /> <br /><br />
                <button onClick={updatePuppy} >Update Puppy</button>
            </div>
        </div>
    );
}

export default Update;