import React, { useEffect, useState } from 'react';
import '../screens/Stolovi.css';
import closeImg from '../assets/images/close.png';
import editIcon from '../assets/images/edit.png';
import deleteIcon from '../assets/images/delete.png';
import { editTableData } from '../utils/apiCalls';
import { useNavigate } from 'react-router-dom';

// Formik, yup
import { Formik } from 'formik';
import * as Yup from 'yup';

function StolRow({ id, numberOfSeats }) {
	let navigate = useNavigate();
	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const handleDelete = () => {
		setDeleteModal(true);
	};

	const handleEdit = () => {
		setEditModal(true);
	};

	const onTableDelete = async () => {
		// Delete table with that id
		const res = await deleteTable(id);
		const data = res;
		console.log(data);

		setDeleteModal(false);

		if (data.success === true) {
			navigate(0);
		}
	};

	const onTableEdit = async (values, formikActions) => {
		// Edit table with current form data
		const res = await editTableData(values);
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

	const initialValuse = {
		tableNumber: id,
		numberOfSeats: numberOfSeats,
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

	return (
		<div>
			{deleteModal && (
				<div className="delete-modal">
					<div className="delete-modal-content">
						<h1>Želiš li obrisati stol broj {currentTable}?</h1>
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
			{editModal && (
				<div className="add-table">
					<Formik
						initialValues={initialValuse}
						enableReinitialize={true}
						validationSchema={validationSchema}
						onSubmit={onTableEdit}
					>
						{(formik) => (
							<form
								className="add-table-container"
								onSubmit={formik.handleSubmit}
							>
								<button
									onClick={() => setEditModal(false)}
									className="close-button"
								>
									<img src={closeImg} alt="" width={16} />
								</button>
								<h1>Uredi stol:</h1>

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
									Uredi stol
								</button>
							</form>
						)}
					</Formik>
				</div>
			)}
			<div className="stolovi-table-row">
				<div className="stolovi-table-row-content">
					<h2>Stol {id}</h2>
					<p>Broj osoba: {numberOfSeats}</p>
				</div>

				<div className="stolovi-table-row-buttons">
					<button
						className="edit"
						style={{ backgroundColor: '#0283d2' }}
						onClick={() => handleEdit()}
					>
						<img src={editIcon} alt="" width={24} />
					</button>
					<button
						className="delete"
						style={{ backgroundColor: '#ed5e69' }}
						onClick={() => {
							handleDelete();
						}}
					>
						<img src={deleteIcon} alt="" width={24} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default StolRow;
