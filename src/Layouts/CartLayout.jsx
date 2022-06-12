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
            axios.post(`https://proseller.pro/api/basket`, {basket_id: store.cartID}).then((res) => {setServerData(res.data.results.products)}).then(() => {console.log(serverData); setIsLoading(false)});
        } else {
            setEmpty(true);
        }
    }, [])

    return (
        <>
            <Header title={'Cart'} back={true} withCart={false}/>
            <div className='catalog__container' style={{ paddingTop : 'calc(min(10vh, 95px))', height: 'calc(100vh - calc(min(10vh, 95px)))', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {empty && <div style={{fontSize: '30px', height: '100%', display: 'flex', flexDirection: 'column', placeItems: 'center', justifyContent: 'center', gap: '40px'}}>
                    <>Your cart is empty</>
                    <CartLink text={'Back to store'} back={true}/>
                </div>}

                {!isLoading && <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                    {serverData?.map((element, id) => {
                        console.log(element);
                        return <div style={{width: '95%', border: '2px solid grey', borderRadius: '10px', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '18px'}}>
                            <div style={{marginLeft: '20px'}}>
                                {element.name}
                            </div>
                            
                            <div className="catalog__price" style={{margin: '0'}}>{element.price}</div>

                            <div style={{marginRight: '20px'}}>
                                <CartAmountMeter startAmount={element.quantity} productID={element.id} />
                            </div>
                        </div>
                    })}    
                </div>}
            </div>
        </>
    );
}
 
export default CartLayout;