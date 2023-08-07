import React, { useState } from 'react';
import './Navbar.css';
import { motion as m, AnimatePresence } from 'framer-motion';

import closeIcon from '../assets/images/close.png';
import clockIcon from '../assets/images/clock.png';
import homeIcon from '../assets/images/home.png';
import tableIcon from '../assets/images/tableicon.png';
import rezervacijeIcon from '../assets/images/calendar.png';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../redux/slices/dateSlice';
import { setTime } from '../redux/slices/timeSlice';

function Navbar() {
	const date = useSelector((state) => state.date.value);
	const time = useSelector((state) => state.time.value);
	const [tempTime, setTempTime] = useState(time);
	const [tempDate, setTempDate] = useState(date);
	const dispatch = useDispatch();
	const [timeModalOpen, setTimeModalOpen] = useState();

	const toggleTimeModal = () => {
		timeModalOpen ? setTimeModalOpen(false) : setTimeModalOpen(true);
	};

	const submitDateAndTimeChange = () => {
		dispatch(setDate(tempDate));
		dispatch(setTime(tempTime));
	};

	const dateSplited = date.split('-');

	const year = dateSplited[0];
	const month = dateSplited[1];
	const day = dateSplited[2];

	const newDateString = `${day}.${month}.${year}`;

	const timeSplited = time.split(':');
	const hour = timeSplited[0];
	let minutes = timeSplited[1];

	minutes.length <= 1 ? (minutes = '0' + timeSplited[1]) : timeSplited[1];

	const newTime = hour + ':' + minutes;
	return (
		<div>
			<nav className="navbar">
				<div className="navbar-center">
					<h1>{newDateString}</h1>
					<h2>{newTime}</h2>
				</div>
				<div className="navbar-right">
					<button onClick={() => toggleTimeModal()}>
						<img src={clockIcon} alt="" width={60} />
					</button>
				</div>
			</nav>

			<AnimatePresence>
				<m.div className="navbar-container" key={0}>
					<h1>Table Management</h1>
					<div className="links-container">
						<a href="/">
							<img src={homeIcon} alt="" width={32} />
							Home
						</a>

						<a href="/stolovi">
							<img src={tableIcon} alt="" width={32} />
							Stolovi
						</a>
						<a href="/rezervacije">
							<img src={rezervacijeIcon} alt="" width={32} />
							Rezervacije
						</a>
					</div>
				</m.div>

				{timeModalOpen && (
					<m.div
						className="time-modal"
						initial={{ y: -80, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ ease: 'easeInOut' }}
						exit={{
							opacity: 0,
							y: 80,
							transition: {
								ease: 'easeInOut',
							},
						}}
						key={1}
					>
						<button onClick={(e) => toggleTimeModal(e)}>
							<img src={closeIcon} alt="" width={22} />
						</button>
						<h1>Change time and date:</h1>
						<p>Date:</p>
						<input
							type="date"
							name="date"
							id="date"
							onChange={(e) => setTempDate(e.target.value)}
							defaultValue={tempDate}
						/>
						<p>Time:</p>
						<input
							type="time"
							name="time"
							id="time"
							onChange={(e) => setTempTime(e.target.value)}
							defaultValue={tempTime}
						/>
						<br></br>
						<br></br>
						<button
							className="submit-btn"
							onClick={() => submitDateAndTimeChange()}
						>
							Submit
						</button>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Navbar;
