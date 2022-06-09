import React from 'react';
import useDebounce from '../../Hooks/useDebounce';
import useUpdateEffect from '../../Hooks/useUpdateEffect';
import axios from 'axios';
import { InitDataContext } from '../../InitDataProvider';
import './CartAmountMeter.css';

const CartAmountMeter = ({ productID, startAmount }) => {
    const [amount, setAmount] = React.useState(startAmount)

    const store = React.useContext(InitDataContext);

    const debouncedCount = useDebounce(amount, 400);

    useUpdateEffect(() => {
        if (store.cartID) {
            axios.post(`https://proseller.pro/api/basket/${productID}`, {
            quantity: debouncedCount,
            _auth: store.initData,
            basket_id: store.cartID,
            id: productID
        })    
        }

        else {
            axios.post(`https://proseller.pro/api/basket/${productID}`, {
                quantity: debouncedCount,
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
        setAmount(() => amount + 1)
    }

    return (
        <div className="amount__container">
            <button style={{fontSize: '20px', width: '30px', border: 'none', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '50%'}} onClick={minusClickHandler}>-</button>
            {amount}
            <button style={{fontSize: '20px', width: '30px', backgroundColor: '#2094bf', border: 'none', height: '30px', display: 'grid', placeItems: 'center', borderRadius: '50%'}} onClick={plusClickHandler}>+</button>
        </div>

    );
}
 
export default CartAmountMeter;