import React, { useState } from 'react';
import './Navbar.css';
import { motion as m, AnimatePresence } from 'framer-motion';

import closeIcon from '../assets/images/close.png';
import clockIcon from '../assets/images/clock.png';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from '../redux/slices/dateSlice';
import { setTime } from '../redux/slices/timeSlice';

function Navbar() {
	const date = useSelector((state) => state.date.value);
	const time = useSelector((state) => state.time.value);
	const dispatch = useDispatch();
	const [timeModalOpen, setTimeModalOpen] = useState();
	// const [date, setDate] = useState(
	// 	// String(new Date().toLocaleDateString('de-DE'))
	// 	String(new Date().toISOString().slice(0, 10))
	// 	// String(`${new Date.getDate()}-${}-${}`)
	// );

	// const [time, setTime] = useState(todayTime);

	const toggleTimeModal = () => {
		timeModalOpen ? setTimeModalOpen(false) : setTimeModalOpen(true);
	};

	return (
		<div>
			<nav className="navbar">
				<div className="navbar-center">
					<h1>{date}</h1>
					<h2>{time}</h2>
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
						<a href="/">Home</a>
						<a href="/stolovi">Stolovi</a>
						<a href="/rezervacije">Pregled rezervacija</a>
						<a href="/dodaj-rezervaciju">Dodaj rezervaciju</a>
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
						<button onClick={() => toggleTimeModal()}>
							<img src={closeIcon} alt="" width={22} />
						</button>
						<h1>Change time and date:</h1>
						<p>Date:</p>
						<input
							type="date"
							name="date"
							id="date"
							onChange={(e) => dispatch(setDate(e.target.value))}
						/>
						<p>Time:</p>
						<input
							type="time"
							name="time"
							id="time"
							onChange={(e) => dispatch(setTime(e.target.value))}
						/>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Navbar;
