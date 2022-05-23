import React from 'react';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import ExchangeDetails from './components/ExchangeDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

const App = () => {
	return (
		<>
			<Router>
				<div className='App'>
					<Switch>
						<Route exact path='/'>
							<HomePage />
						</Route>

						<Route exact path='/exchanges/:id'>
							<ExchangeDetails />
						</Route>

						<Route path='*'>
							<ErrorPage />
						</Route>
					</Switch>
				</div>
			</Router>
		</>
	);
};

export default App;
