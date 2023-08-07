import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Stolovi.css';
import { getTables, addNewTable } from '../utils/apiCalls';
import { useNavigate } from 'react-router-dom';
import closeImg from '../assets/images/close.png';
import StolRow from '../components/StolRow';

// Formik, yup
import { Formik } from 'formik';
import * as Yup from 'yup';

function Stolovi() {
	let navigate = useNavigate();
	const getData = async () => {
		const res = await getTables();
		const data = res.msg;
		if (res.success === true) {
			setTables(data);
			console.log(data);
		}
	};

	const [tables, setTables] = useState([]);
	const [addTable, setAddTable] = useState(false);
	useEffect(() => {
		getData();
	}, []);

	const initialValuse = {
		tableNumber: '',
		numberOfSeats: '',
	};

	const validationSchema = Yup.object({
		tableNumber: Yup.number()
			.required()
			.positive()
			.integer()
			.required('Required'),
		numberOfSeats: Yup.number()
			.required()
			.positive()
			.integer()
			.required('Required'),
	});

	const onHandleSubmit = async (values, formikActions) => {
		formikActions.setSubmitting(false);

		// Insert into db
		const res = await addNewTable(values);
		console.log(res);
		if (!res.success) {
			// setInsertError(res.data);
			formikActions.resetForm();
		} else {
			// setInsertError();
			formikActions.resetForm();
			navigate(0);
		}
	};
	return (
		<div>
			{addTable && (
				<div className="add-table">
					<Formik
						initialValues={initialValuse}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={onHandleSubmit}
					>
						{(formik) => (
							<form
								className="add-table-container"
								onSubmit={formik.handleSubmit}
							>
								<button
									onClick={() => setAddTable(false)}
									className="close-button"
								>
									<img src={closeImg} alt="" width={16} />
								</button>
								<h1>Dodaj stol:</h1>

								<p>Broj stola:</p>
								{formik.touched.tableNumber && formik.errors.tableNumber ? (
									<div className="error">{formik.errors.tableNumber}</div>
								) : null}
								<input
									type="number"
									name="tableNumber"
									{...formik.getFieldProps('tableNumber')}
									autoComplete="off"
								/>

								<p>Max broj osoba za stolom:</p>

								{formik.touched.numberOfSeats && formik.errors.numberOfSeats ? (
									<div className="error">{formik.errors.numberOfSeats}</div>
								) : null}
								<input
									type="number"
									name="numberOfSeats"
									{...formik.getFieldProps('numberOfSeats')}
									autoComplete="off"
								/>

								<button className="dodaj-stol-button" type="submit">
									Dodaj stol
								</button>
							</form>
						)}
					</Formik>
				</div>
			)}
			<Sidebar />
			<div className="stolovi-container">
				<h1>Stolovi:</h1>

				<button onClick={() => setAddTable(true)}>Dodaj stol</button>

				<div className="stolovi-table">
					{tables.length == 0 && <h2>Nema stolova</h2>}
					{tables.map((table, index) => {
						return (
							<StolRow
								id={table.Id}
								numberOfSeats={table.NumberOfSeats}
								key={table.Id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Stolovi;
