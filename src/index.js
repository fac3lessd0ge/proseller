import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './connect-fonts.css';
import './index.css';
import CatalogLayout from './Layouts/CatalogLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Navigate to={'/cats'} />}/>
			<Route path='/cats' element={<CatalogLayout headerTitle={'Categories'}/>}/>
			<Route path='/sub_cats' element={<CatalogLayout headerTitle={'Sub-categories'}/>}/>
			<Route path='/item' element={<CatalogLayout headerTitle={'Product'}/>}/>
		</Routes>
	</BrowserRouter>
);
