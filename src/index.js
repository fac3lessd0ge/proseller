import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import CatalogLayout from './Layouts/CatalogLayout';
import ItemLayout from './Layouts/ItemLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/proseller/' element={<Navigate to={'/proseller/cats/0'} />}/>
			<Route path='/proseller/cats/:id' element={<CatalogLayout type={'test_categories'} headerTitle={'Categories'}/>}/>
			<Route path='/proseller/item/:id' element={<ItemLayout />}/>
		</Routes>
	</BrowserRouter>
);
