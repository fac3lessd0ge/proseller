import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import InitDataProvider from './InitDataProvider';
import OutOfStockProvider from './OutOfStockProvider';
import CartLayout from './Layouts/CartLayout';
import CatalogLayout from './Layouts/CatalogLayout';
import ItemLayout from './Layouts/ItemLayout';
import OrderLayout from './Layouts/OrderLayout';
import ReloadDummyRoute from './Layouts/ReloadDummyRoute';
import InfoPage from './Layouts/InfoPage/InfoPage';

/*global Telegram*/
const initData = Telegram.WebApp.initData;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<InitDataProvider initialValue={initData}>
		<OutOfStockProvider>		
			<BrowserRouter>
				<Routes>
					<Route path='/proseller/' element={<Navigate to={'/proseller/cats/0'} />}/>
					<Route path='/proseller/cats/:id' element={<CatalogLayout type={'test_categories'} headerTitle={'Categories'}/>}/>
					<Route path='/proseller/item/:id' element={<ItemLayout />}/>
					<Route path='/proseller/cart' element={<CartLayout />} />
					<Route path='/proseller/order' element={<OrderLayout />} />
					<Route path='/proseller/reload' element={<ReloadDummyRoute />} />
					<Route path='/proseller/faq' element={<InfoPage type={'FAQ'} />} />
					<Route path='/proseller/offer' element={<InfoPage type={'Offer'} />} />
					<Route path= '/proseller/privacy' element={<InfoPage type={'Privacy'} />} />
				</Routes>
			</BrowserRouter>
		</OutOfStockProvider>
	</InitDataProvider>
);
