import React from 'react';
import useDebounce from '../../Hooks/useDebounce';
import useUpdateEffect from '../../Hooks/useUpdateEffect';
import axios from 'axios';
import { InitDataContext } from '../../InitDataProvider';
import './CartAmountMeter.css';
import { BASE_API_URL } from '../../URLS';

const CartAmountMeter = ({ productID, startAmount, max=99999 }) => {
    const [amount, setAmount] = React.useState(startAmount)

    const store = React.useContext(InitDataContext);

    const debouncedCount = useDebounce(amount, 400);

    useUpdateEffect(() => {
        if (store.cartID) {
            axios.post(BASE_API_URL + `/basket/`, {
            quantity: debouncedCount,
            _auth: store.initData,
            basket_id: store.cartID,
            product_id: productID
        })    
        }

        else {
            axios.post(BASE_API_URL + `/basket/`, {
                quantity: debouncedCount,
                product_id: productID,
                _auth: store.initData
            }).then((res) => {
                store.cartID = res.data.basket_id;
            })
        } 
    }, [debouncedCount])

    const minusClickHandler = () => {
        if (amount > 0) {
            setAmount(() => amount - 1)
        }
    }

    const plusClickHandler = () => {
        if (amount < max) {
            setAmount(() => amount + 1)
        }
    }

    return (
        <div className="amount__container">
            <button style={{fontSize: '20px', width: '30px', border: 'none', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '4px'}} onClick={minusClickHandler}>-</button>
            {amount}
            <button className={amount === max ? 'stop' : ''} style={{fontSize: '20px', width: '30px', backgroundColor: '#2094bf', border: 'none', height: '30px', display: 'grid', placeItems: 'center', color: 'white', borderRadius: '4px'}} onClick={plusClickHandler}>{amount === max ?  '\u00D7' : '+'}</button>
        </div>

    );
}
 
export default CartAmountMeter;