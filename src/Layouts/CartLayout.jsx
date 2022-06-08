import React, { useContext } from 'react';
import { InitDataContext } from '../InitDataProvider';
import Header from '../Components/Header/Header';
import axios from 'axios';
import CartLink from '../Components/CartLink/CartLink';
import CartButton from '../Components/CartButton/CartButtom';
import CartAmountMeter from '../Components/CartAmountMeter/CartAmountMeter';

const fakeServDat = {
    products: [
        {
            name: 'napas',
            quantity: 3,
            id: 3,
            price: 500
        },
        {
            name: 'napas',
            quantity: 3,
            id: 3,
            price: 500
        },
        {
            name: 'napas',
            quantity: 3,
            id: 3,
            price: 500
        },
        {
            name: 'napas',
            quantity: 3,
            id: 3,
            price: 500
        }
    ]
}

const CartLayout = () => {
    const store = useContext(InitDataContext);

    const [serverData, setServerData] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);

    const [empty, setEmpty] = React.useState(false);

    React.useEffect(() => {
        if (store.cartID) {
            axios.post(`https://proseller.pro/api/basket/${store.cartID}`, {
                _auth: store.initData
            }).then((res) => {setServerData(res.data.order)}).then(() => setIsLoading(false));
        }
        else {
            setServerData(fakeServDat);
            //setEmpty(true);
        }
    }, [])

    return (
        <>
            <Header title={'Cart'} back={true} withCart={false}/>
            <div className='catalog__container' style={{ paddingTop : 'calc(min(10vh, 95px))', height: 'calc(100vh - calc(min(10vh, 95px)))', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {empty && <div style={{fontSize: '30px', height: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center', justifyContent: 'center', gap: '40px'}}>
                    <>Ваша корзина пуста!</>
                    <CartLink text={'Вернуться к покупкам'} back={true}/>
                </div>}

                {!empty && <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                    {serverData?.products?.map((element, id) => 
                        <div style={{width: '95%', border: '2px solid grey', borderRadius: '10px', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px'}}>
                            <div style={{marginLeft: '20px'}}>
                                {element.name}
                            </div>
                            

                            <div style={{marginRight: '20px'}}>
                                <CartAmountMeter startAmount={0} productID={element.id} />
                            </div>
                        </div>
                    )}    
                </div>}
            </div>
        </>
    );
}
 
export default CartLayout;