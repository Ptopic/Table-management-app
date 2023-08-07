import React from 'react';
import ReactDOM from 'react-dom/client';

// Screens
import Home from './screens/Home';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Stolovi from './screens/Stolovi';

import store from './redux/store';
import { Provider } from 'react-redux';
import Rezervacije from './screens/Rezervacije';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/stolovi',
		element: <Stolovi />,
	},
	{
		path: '/rezervacije',
		element: <Rezervacije />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
