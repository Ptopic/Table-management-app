import React, { useEffect, useState } from 'react';
import './Main.css';
import stolZa2 from '../assets/images/2.png';
import stolZa4 from '../assets/images/4.png';
import stolZa6 from '../assets/images/6.png';
import closeImg from '../assets/images/close.png';
import {
	getTables,
	getReservations,
	createReservation,
	updateReservation,
	assignTableToReservation,
} from '../utils/apiCalls';

// Formik, yup
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Navigate, useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function Main() {
	let navigate = useNavigate();
	const date = useSelector((state) => state.date.value);
	const time = useSelector((state) => state.time.value);
	const [tables, setTables] = useState([]);
	const [reservations, setReservations] = useState([]);
	const [reservationModal, setReservationModal] = useState(false);
	const [editReservationModal, setEditReservationModal] = useState(false);
	const [reservationToBeEdited, setReservationToBeEdited] = useState('');
	const [activeTable, setActiveTable] = useState();

	// Get all table data
	const getDataTable = async () => {
		const res = await getTables();
		const data = res.msg;
		if ((res.success = true)) {
			setTables(data);
		}
	};

	// Get reservations data for given date and time

	const getReservationsData = async (dateVal, timeVal) => {
		const res = await getReservations(dateVal, timeVal);
		const data = res.msg;
		setReservations(data);
	};

	// Get reservations for given date
	// const getReservationsForGivenDate

	useEffect(() => {
		getDataTable();
		getReservationsData(date, time);
	}, []);

	useEffect(() => {
		// Change reservations data when date changes
		getReservationsData(date, time);
	}, [date, time]);

	const initialValuse = {
		Firstname: '',
		Lastname: '',
		NumberOfPeople: '',
		ReservationDate: date,
		ReservationTime: time,
		ContactPhone: '',
	};

	const editingInitialValues = {
		Firstname: reservationToBeEdited.FirstName,
		Lastname: reservationToBeEdited.LastName,
		NumberOfPeople: reservationToBeEdited.NumberOfPeople,
		ReservationDate: reservationToBeEdited.ReservationDate,
		ReservationTime: reservationToBeEdited.ReservationTime,
		ContactPhone: reservationToBeEdited.ContactPhone,
	};

	const validationSchema = Yup.object({
		Firstname: Yup.string().required('Required'),
		Lastname: Yup.string().required('Required'),
		NumberOfPeople: Yup.number()
			.required()
			.positive()
			.integer()
			.required('Required'),
		ReservationDate: Yup.string().required('Required'),
		ReservationTime: Yup.string().required('Required'),
		ContactPhone: Yup.number()
			.required()
			.positive()
			.integer()
			.required('Required'),
	});

	const handleReservation = async (values, formikActions) => {
		formikActions.setSubmitting(false);
		// Napravi rezervaciju
		const res = await createReservation(values);
		const data = res;
		// Spremi id rezervacije
		const reservationId = res.data;
		// Dodaj broj stola i broj rezervacije u rezervacija stol tablicu
		const tableId = activeTable;
		const res2 = await assignTableToReservation(tableId, reservationId);
		const data2 = res2;
		if (data2.success === true) {
			navigate(0);
		}
	};

	const handleEditReservationSubmit = async (values, formikActions) => {
		formikActions.setSubmitting(false);
		// Napravi rezervaciju
		const res = await updateReservation(values, reservationToBeEdited.Id);
		const data = res;
		console.log(data);
		if (data.success === true) {
			navigate(0);
		}
	};

	const handleEditReservation = (id) => {
		setEditReservationModal(true);

		// Filter reservations data by table id
		const reservationForEdit = reservations.filter(
			(reservation) => reservation.TableNumber === id
		);

		setReservationToBeEdited(reservationForEdit[0]);

		console.log(reservationForEdit[0]);
	};

	return (
		<div className="main-container">
			{reservationModal && (
				<div className="add-reservation">
					<Formik
						initialValues={initialValuse}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={handleReservation}
					>
						{(formik) => (
							<form
								action=""
								className="add-reservation-container"
								onSubmit={formik.handleSubmit}
							>
								<button
									onClick={() => setReservationModal(false)}
									className="close-button"
								>
									<img src={closeImg} alt="" width={16} />
								</button>

								<h1>Dodaj rezervaciju za stol broj {activeTable}:</h1>

								<p>Ime:</p>
								{formik.touched.Firstname && formik.errors.Firstname ? (
									<div className="error">{formik.errors.Firstname}</div>
								) : null}
								<input
									type="text"
									name="Firstname"
									autoComplete="off"
									{...formik.getFieldProps('Firstname')}
								/>

								<p>Prezime:</p>
								{formik.touched.Lastname && formik.errors.Lastname ? (
									<div className="error">{formik.errors.Lastname}</div>
								) : null}
								<input
									type="text"
									name="Lastname"
									autoComplete="off"
									{...formik.getFieldProps('Lastname')}
								/>

								<p>Broj osoba:</p>
								{formik.touched.NumberOfPeople &&
								formik.errors.NumberOfPeople ? (
									<div className="error">{formik.errors.NumberOfPeople}</div>
								) : null}
								<input
									type="number"
									name="NumberOfPeople"
									autoComplete="off"
									{...formik.getFieldProps('NumberOfPeople')}
								/>

								<p>Datum rezervacije:</p>
								{formik.touched.ReservationDate &&
								formik.errors.ReservationDate ? (
									<div className="error">{formik.errors.ReservationDate}</div>
								) : null}
								<input
									type="date"
									name="ReservationDate"
									autoComplete="off"
									{...formik.getFieldProps('ReservationDate')}
								/>

								<p>Vrijeme rezervacije:</p>
								{formik.touched.ReservationTime &&
								formik.errors.ReservationTime ? (
									<div className="error">{formik.errors.ReservationTime}</div>
								) : null}
								<input
									type="time"
									name="ReservationTime"
									autoComplete="off"
									{...formik.getFieldProps('ReservationTime')}
								/>

								<p>Kontakt broj:</p>
								{formik.touched.ContactPhone && formik.errors.ContactPhone ? (
									<div className="error">{formik.errors.ContactPhone}</div>
								) : null}
								<input
									type="text"
									name="ContactPhone"
									autoComplete="off"
									{...formik.getFieldProps('ContactPhone')}
								/>

								<button className="dodaj-rezervaciju-button" type="submit">
									Dodaj rezervaciju
								</button>
							</form>
						)}
					</Formik>
				</div>
			)}

			{editReservationModal && (
				<div className="add-reservation">
					<Formik
						initialValues={editingInitialValues}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={handleEditReservationSubmit}
					>
						{(formik) => (
							<form
								action=""
								className="add-reservation-container"
								onSubmit={formik.handleSubmit}
							>
								<button
									onClick={() => setEditReservationModal(false)}
									className="close-button"
								>
									<img src={closeImg} alt="" width={16} />
								</button>

								<h1>Uredi rezervaciju za stol broj {activeTable}:</h1>

								<p>Ime:</p>
								{formik.touched.Firstname && formik.errors.Firstname ? (
									<div className="error">{formik.errors.Firstname}</div>
								) : null}
								<input
									type="text"
									name="Firstname"
									autoComplete="off"
									{...formik.getFieldProps('Firstname')}
								/>

								<p>Prezime:</p>
								{formik.touched.Lastname && formik.errors.Lastname ? (
									<div className="error">{formik.errors.Lastname}</div>
								) : null}
								<input
									type="text"
									name="Lastname"
									autoComplete="off"
									{...formik.getFieldProps('Lastname')}
								/>

								<p>Broj osoba:</p>
								{formik.touched.NumberOfPeople &&
								formik.errors.NumberOfPeople ? (
									<div className="error">{formik.errors.NumberOfPeople}</div>
								) : null}
								<input
									type="number"
									name="NumberOfPeople"
									autoComplete="off"
									{...formik.getFieldProps('NumberOfPeople')}
								/>

								<p>Datum rezervacije:</p>
								{formik.touched.ReservationDate &&
								formik.errors.ReservationDate ? (
									<div className="error">{formik.errors.ReservationDate}</div>
								) : null}
								<input
									type="date"
									name="ReservationDate"
									autoComplete="off"
									{...formik.getFieldProps('ReservationDate')}
								/>

								<p>Vrijeme rezervacije:</p>
								{formik.touched.ReservationTime &&
								formik.errors.ReservationTime ? (
									<div className="error">{formik.errors.ReservationTime}</div>
								) : null}
								<input
									type="time"
									name="ReservationTime"
									autoComplete="off"
									{...formik.getFieldProps('ReservationTime')}
								/>

								<p>Kontakt broj:</p>
								{formik.touched.ContactPhone && formik.errors.ContactPhone ? (
									<div className="error">{formik.errors.ContactPhone}</div>
								) : null}
								<input
									type="text"
									name="ContactPhone"
									autoComplete="off"
									{...formik.getFieldProps('ContactPhone')}
								/>

								<button className="dodaj-rezervaciju-button" type="submit">
									Dodaj rezervaciju
								</button>
							</form>
						)}
					</Formik>
				</div>
			)}
			<div className="main">
				{tables.length == 0 && <h2>Nema stolova</h2>}
				{tables.map((table) => {
					if (reservations) {
						const hasReservation = reservations.filter(
							(reservation) => reservation.TableNumber === table.Id
						);
						if (hasReservation.length > 0) {
							table.hasReservation = true;
							table.reservation = hasReservation;
						}
					} else {
						table.hasReservation = false;
					}
					return (
						<div
							key={table.Id}
							style={{ opacity: table.hasReservation === true ? 0.5 : 1 }}
						>
							<button
								data-id={table.Id}
								onClick={() => {
									if (!table.hasReservation) {
										setActiveTable(table.Id);
										setReservationModal(true);
									} else {
										setActiveTable(table.Id);
										handleEditReservation(table.Id);
									}
								}}
							>
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
