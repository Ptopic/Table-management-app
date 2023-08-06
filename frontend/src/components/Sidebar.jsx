import React from 'react';
import './Navbar.css';

function Sidebar() {
	return (
		<div>
			<div className="navbar-container">
				<h1>Table Management</h1>
				<div className="links-container">
					<a href="/">Home</a>
					<a href="/stolovi">Stolovi</a>
					<a href="/rezervacije">Pregled rezervacija</a>
					<a href="/dodaj-rezervaciju">Dodaj rezervaciju</a>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
