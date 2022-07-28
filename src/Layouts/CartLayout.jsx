import React, { useContext } from 'react';
import { InitDataContext } from '../InitDataProvider';
import Header from '../Components/Header/Header';
import axios from 'axios';
import CartLink from '../Components/CartLink/CartLink';
import CartAmountMeter from '../Components/CartAmountMeter/CartAmountMeter';
import Forms from '../Components/Forms/Forms';
import { BASE_API_URL } from '../URLS';

const CartLayout = () => {
	const store = useContext(InitDataContext);

	const [serverData, setServerData] = React.useState(null);

	const [isLoading, setIsLoading] = React.useState(true);

	const [userInfo, setUserInfo] = React.useState({});

	const [empty, setEmpty] = React.useState(false);

	React.useEffect(() => {
		if (store.cartID) {
			axios
				.post(BASE_API_URL + `/basket/`, {
					basket_id: store.cartID,
					_auth: store.initData
				})
				.then((res) => {
					setServerData(res.data.results.products);
					setUserInfo(res.data.results.user_info);
				})
				.then(() => {
					setIsLoading(false);
				})
				.catch((e) => {
					console.error(e);
					setEmpty(true);
				});
		} else {
			setEmpty(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header title={'Cart'} back={true} withCart={false} />
			<div
				className="catalog__container"
				style={{
					paddingTop: 'calc(min(10vh, 95px))',
					height: 'calc(100vh - calc(min(10vh, 95px)))',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>

				{(empty || serverData?.length === 0) && (
					<div
						style={{
							fontSize: '30px',
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							placeItems: 'center',
							justifyContent: 'center',
							gap: '40px'
						}}
					>
						<>Your cart is empty</>
						<CartLink
							text={'Back to store'}
							to="/proseller/cats/0"
						/>
					</div>
				)}

				{!isLoading && (
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '10px'
						}}
					>
						{serverData?.length !== 0 &&
							serverData?.map((element, id) => {
								return (
									<div
										style={{
											width: '95%',
											border: '2px solid grey',
											borderRadius: '10px',
											height: '60px',
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											fontSize: '18px'
										}}
									>
										<div style={{ marginLeft: '20px' }}>
											{element.name?.length > 18
												? element.name.substring(
														0,
														18
												  ) + '...'
												: element.name}
										</div>

										<div
											className="catalog__price"
											style={{
												margin: '0',
												minWidth: '90px'
											}}
										>
											{element.price}
										</div>

										<div style={{ marginRight: '20px' }}>
											<CartAmountMeter
												startAmount={element.quantity}
												productID={element.id}
												max={
													element.max_quantity === -1
														? 99999
														: element.max_quantity
												}
											/>
										</div>
									</div>
								);
							})}
						{serverData?.length !== 0 && (
							<Forms initialValues={userInfo} />
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default CartLayout;
