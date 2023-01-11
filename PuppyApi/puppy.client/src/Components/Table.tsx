import { useEffect, useState } from "react";

interface PuppyInfo {
	id: number,
	name: string,
	breed: string,
	birthdate: string
}

function Table() {
	const [puppyData, setPuppyData] = useState<PuppyInfo[]>([]);

	useEffect(() => {
		const getData = async () => {
			const response = await fetch("https://localhost:7002/api/Puppies");
			const userResults = await response.json();
			setPuppyData(userResults);
		}
		getData();
	}, []);

	const getSaveDates = puppyData.map((item) => {
		const d = new Date(item.birthdate)
		const saveConverted = d.toLocaleString();
		return { ...item, birthdate: saveConverted };
	});

	return (
		<>
			<table>
				<thead>
					<td>ID</td>
					<td>NAME</td>
					<td>BREED</td>
					<td>BIRTHDATE</td>
				</thead>
				<tbody>
					{puppyData.map(p =>
					<tr>
						<td>{p.id}</td>
						<td>{p.name}</td>	
						<td>{p.breed}</td>
						<td>{p.birthdate}</td>
					</tr>)}
				</tbody>
			</table>
		</>
	);
}

export default Table;