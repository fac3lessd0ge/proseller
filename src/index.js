import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import InitDataProvider from './InitDataProvider';
import CartLayout from './Layouts/CartLayout';
import CatalogLayout from './Layouts/CatalogLayout';
import ItemLayout from './Layouts/ItemLayout';
import OrderLayout from './Layouts/OrderLayout';
import ReloadDummyRoute from './Layouts/ReloadDummyRoute';

/*global Telegram*/
const initData = Telegram.WebApp.initData;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<InitDataProvider initialValue={initData}>
		<BrowserRouter>
			<Routes>
				<Route path='/proseller/' element={<Navigate to={'/proseller/cats/0'} />}/>
				<Route path='/proseller/cats/:id' element={<CatalogLayout type={'test_categories'} headerTitle={'Categories'}/>}/>
				<Route path='/proseller/item/:id' element={<ItemLayout />}/>
				<Route path='/proseller/cart' element={<CartLayout />} />
				<Route path='/proseller/order' element={<OrderLayout />} />
				<Route path='/proseller/reload' element={<ReloadDummyRoute />} />
			</Routes>
		</BrowserRouter>
	</InitDataProvider>
);
