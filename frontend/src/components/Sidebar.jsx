import React from 'react';
import './Navbar.css';
import homeIcon from '../assets/images/home.png';
import tableIcon from '../assets/images/tableicon.png';
import rezervacijeIcon from '../assets/images/calendar.png';

function Sidebar() {
	return (
		<div>
			<div className="navbar-container">
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
			</div>
		</div>
	);
}

export default Sidebar;
