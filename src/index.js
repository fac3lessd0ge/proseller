import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import CatalogLayout from './Layouts/CatalogLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Navigate to={'/cats/0'} />}/>
			<Route path='/cats/:id' element={<CatalogLayout type={'test_categories'} headerTitle={'Categories'}/>}/>
			<Route path='/item/:id' element={<>Zdes' budet otdel'naya stranitsa tovara!</>}/>
		</Routes>
	</BrowserRouter>
);
