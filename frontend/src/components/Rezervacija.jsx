import React, { useEffect, useState } from 'react';
import deleteIcon from '../assets/images/delete.png';
import { deleteReservation } from '../utils/apiCalls';
import { useNavigate } from 'react-router-dom';

function Rezervacija({
	Id,
	LastName,
	ReservationDate,
	ReservationTime,
	NumberOfPeople,
	TableNumber,
	ContactPhone,
}) {
	let navigate = useNavigate();
	const [deleteModal, setDeleteModal] = useState(false);

	const onTableDelete = async () => {
		const res = await deleteReservation(Id);
		const data = res;
		console.log(data);

		if (data.success === true) {
			navigate(0);
		}
	};

	const dateSplited = ReservationDate.split('-');
	console.log(dateSplited);

	const year = dateSplited[0];
	const month = dateSplited[1];
	const day = dateSplited[2];

	const newDateString = `${day}.${month}.${year}`;
	return (
		<div>
			{deleteModal && (
				<div className="delete-modal">
					<div className="delete-modal-content">
						<h1>Želiš li obrisati rezervaciju broj {Id}?</h1>
						<div className="delete-modal-buttons">
							<button
								onClick={() => setDeleteModal(false)}
								style={{ backgroundColor: '#CBCCD0' }}
							>
								Ne
							</button>
							<button
								onClick={() => onTableDelete()}
								style={{ backgroundColor: '#ed5e69', color: 'white' }}
							>
								Da
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="rezervacija" key={Id}>
				<h2>Rezervacija {Id}</h2>
				<div>
					<p>Prezime: </p>
					<p className="rezervation-data">{LastName}</p>
				</div>
				<div>
					<p>Datum rezervacije:</p>
					<p className="rezervation-data">{newDateString}</p>
				</div>
				<div>
					<p>Vrijeme rezervacije:</p>
					<p className="rezervation-data">{ReservationTime}</p>
				</div>
				<div>
					<p>Broj osoba:</p>
					<p className="rezervation-data">{NumberOfPeople}</p>
				</div>
				<div>
					<p>Broj stola:</p>
					<p className="rezervation-data">{TableNumber}</p>
				</div>
				<div>
					<p>Kontakt broj:</p>
					<p className="rezervation-data">{ContactPhone}</p>
				</div>
				<button
					style={{ backgroundColor: '#ed5e69' }}
					onClick={() => {
						setDeleteModal(true);
					}}
				>
					<img src={deleteIcon} alt="" width={24} />
				</button>
			</div>
		</div>
	);
}

export default Rezervacija;
