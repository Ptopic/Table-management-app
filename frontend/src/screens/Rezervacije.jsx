import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './Rezervacije.css';
import { getAllReservations } from '../utils/apiCalls';
import Rezervacija from '../components/Rezervacija';

function Rezervacije() {
	const [rezervacije, setRezervacije] = useState([]);
	const getReservations = async () => {
		const res = await getAllReservations();
		const data = res.msg;
		if (res.success === true) {
			setRezervacije(data);
			console.log(data);
		}
	};

	useEffect(() => {
		// Get all reservations
		getReservations();
	}, []);
	return (
		<div>
			<Sidebar />
			<div className="rezervacije-container">
				<h1>Rezervacije:</h1>

				{/* Loop thru reservations */}
				<div className="rezervacije-content">
					{rezervacije.length == 0 && <h2>Nema rezervacija</h2>}
					{rezervacije.map((rezervacija) => {
						return (
							<Rezervacija
								key={rezervacija.Id}
								Id={rezervacija.Id}
								LastName={rezervacija.LastName}
								ReservationDate={rezervacija.ReservationDate}
								ReservationTime={rezervacija.ReservationTime}
								NumberOfPeople={rezervacija.NumberOfPeople}
								TableNumber={rezervacija.TableNumber}
								ContactPhone={rezervacija.ContactPhone}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Rezervacije;
