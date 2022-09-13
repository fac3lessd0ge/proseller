import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
          <Route path='our-bot/' element={<><Outlet /></>}>
            <Route path='' element={<Navigate to={'/cats/0'} />}/>
            <Route path='cats/:id' element={<CatalogLayout type={'test_categories'} headerTitle={'Categories'}/>}/>
            <Route path='item/:id' element={<ItemLayout />}/>
            <Route path='cart' element={<CartLayout />} />
            <Route path='order' element={<OrderLayout />} />
            <Route path='reload' element={<ReloadDummyRoute />} />
            <Route path='faq' element={<InfoPage type={'FAQ'} />} />
            <Route path='contacts' element={<InfoPage type={'Contacts'} />} />
            <Route path='offer' element={<InfoPage type={'Offer'} />} />
            <Route path= 'privacy' element={<InfoPage type={'Privacy'} />} />

          </Route>
				</Routes>
			</BrowserRouter>
		</OutOfStockProvider>
	</InitDataProvider>
);
