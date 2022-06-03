import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import CatalogLayout from './Layouts/CatalogLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Navigate to={'/cats'} />}/>
			<Route path='/cats' element={<CatalogLayout type={'test_categories'} headerTitle={'Categories'}/>}/>
			<Route path='/sub_cats' element={<CatalogLayout type={'test_categories'} headerTitle={'Sub-categories'}/>}/>
			<Route path='/item' element={<CatalogLayout type={'test_product'} headerTitle={'Product'}/>}/>
		</Routes>
	</BrowserRouter>
);
