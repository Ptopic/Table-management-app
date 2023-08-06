import React, { useEffect, useState } from 'react';
import './Main.css';
import stolZa2 from '../assets/images/2.png';
import stolZa4 from '../assets/images/4.png';
import stolZa6 from '../assets/images/6.png';
import { getTables, getReservations } from '../utils/apiCalls';

// Redux
import { useSelector } from 'react-redux';

function Main() {
	const date = useSelector((state) => state.date.value);
	const time = useSelector((state) => state.time.value);
	const [tables, setTables] = useState([]);
	const [reservations, setReservations] = useState([]);
	const [reservationModal, setReservationModal] = useState(false);

	// Get all table data
	const getDataTable = async () => {
		const res = await getTables();
		const data = res.msg;
		setTables(data);
		console.log(data);
	};

	// Get reservations data for given date and time

	const getReservationsData = async (dateVal, timeVal) => {
		const res = await getReservations(dateVal, timeVal);
		const data = res.msg;
		setReservations(data);
	};

	useEffect(() => {
		getDataTable();
		getReservationsData(date, time);
	}, []);

	useEffect(() => {
		// Change reservations data when date changes
		getReservationsData(date, time);
	}, [date, time]);

	// TESTING ONLY
	useEffect(() => {
		console.log(reservations);
	}, [reservations]);

	const handleReservation = async () => {};

	return (
		<div className="main-container">
			<div className="main">
				{tables.map((table) => {
					if (reservations) {
						const hasReservation = reservations.filter(
							(reservation) => reservation.TableNumber === table.Id
						);
						if (hasReservation.length > 0) {
							table.hasReservation = true;
							table.reservation = hasReservation;
						}
					}
					return (
						<div
							key={table.Id}
							style={{ opacity: table.hasReservation === true ? 0.5 : 1 }}
						>
							<button data-id={table.Id} onClick={() => console.log('click')}>
								<p>Stol {table.Id}</p>
								<p>{table.hasReservation === true ? 'Rezervirano' : null}</p>
								<img
									src={
										table.NumberOfSeats === 2
											? stolZa2
											: table.NumberOfSeats === 4
											? stolZa4
											: stolZa6
									}
									alt=""
									width={130}
								/>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Main;
