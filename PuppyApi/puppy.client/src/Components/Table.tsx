import { useEffect, useState } from "react";
import PuppyInfo from "../Interfaces/PuppyInfo";
import "../Components/Style.css";


function Table() {
	const [puppyData, setPuppyData] = useState<PuppyInfo[]>([]);
	const [id, setId] = useState(0);
	const [name, setName] = useState('');
	const [breed, setBreed] = useState('');
	const [birthdate, setBirthdate] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await fetch("https://localhost:7002/api/Puppies");
		const userResults = await response.json();
		setPuppyData(userResults);
	}

	function selectPuppy(puppyId: number) {
		setId(puppyId)
		setName(name)
		setBreed(breed)
		setBirthdate(birthdate);
	}

	function updatePuppy() {
		const puppy = { id, name, breed, birthdate }
		console.log(puppy);
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

	function deletePuppy(puppyId: number) {
		fetch(`https://localhost:7002/api/Puppies/${puppyId}`, {
			method: 'DELETE'
		}).then((result) => {
			result.json().then((resp) => {
				getData()
			})
		})
	}

	return (
		<>
			<div className="main">
				<table className="main-table">
					<thead>
						<td>ID</td>
						<td>NAME</td>
						<td>BREED</td>
						<td>BIRTH DATE</td>
						</thead>
					<tbody>
						<tr>

						</tr>
						{puppyData.map(p =>
							<tr>
								<td>{p.id}</td>
								<td>{p.name}</td>
								<td>{p.breed}</td>
								<td>{p.birthdate}</td>
								<td><button className="details" onClick={() => selectPuppy(p.id)}>Details</button></td>
								<td><button className="update" onClick={() => selectPuppy(p.id)}>Update</button></td>
								<td><button className="delete" onClick={() => deletePuppy(p.id)}>Delete</button></td>
							</tr>)}
					</tbody>
				</table>
				<div className="input-options">
					<input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} /> <br /><br />
					<input type="text" placeholder="Breed" value={breed} onChange={(e) => { setBreed(e.target.value) }} /> <br /><br />
					<input type="date" value={birthdate} onChange={(e) => { setBirthdate(e.target.value) }} /> <br /><br />
					<button className="form-item5" onClick={updatePuppy} >Update Puppy</button>
				</div>
			</div>
		</>
	);
}

export default Table;