import axios from 'axios';
import React from 'react';
import useDebounce from '../../Hooks/useDebounce';
import useUpdateEffect from '../../Hooks/useUpdateEffect';
import InitDataProvider, { InitDataContext } from '../../InitDataProvider';

import './BuyButton.css';

const BuyButton = ({ id, max = 10000 }) => {
    const [count, setCount] = React.useState(0);
    const [buyClass, setBuyClass] = React.useState('buyBTN buy');
    const [minusClass, setMinusClass] = React.useState('minusBTN');

    const debouncedCount = useDebounce(count, 400);

    const store = React.useContext(InitDataContext);

    const buyClickHandler = () => {
        if (count < max) {
            setCount(() => count + 1);
        }
    }

    const minusClickHandler = () => {
        setCount(() => count - 1);
    }

    React.useEffect(() => {
        if (count === max) {
            setBuyClass('buyBTN max');
            setMinusClass('minusBTN up');
        }
        else if (count > 0) {
            setBuyClass('buyBTN plus');
            setMinusClass('minusBTN up');

        }
        else {
            setBuyClass('buyBTN buy');
            setMinusClass('minusBTN');
        }
    }, [count])

    useUpdateEffect(() => {
        if (store.cartID) {
            axios.post(`https://proseller.pro/api/basket/${id}`, {
            id: id,
            quantity: debouncedCount,
            _auth: store.initData,
            basket_id: store.cartID
        })    
        }

        else {
            axios.post(`https://proseller.pro/api/basket/${id}`, {
                id: id,
                quantity: debouncedCount,
                _auth: store.initData
            }).then((res) => {
                console.log(res);
                store.cartID = res.data.results.basket_id;
            }).then(console.log(store.cartID))
        } 
    }, [debouncedCount])

    return (
        <div className="buy__container" style={{marginLeft: '2px'}}>
            <button onClick={buyClickHandler} className={buyClass}><span></span></button>
            <div className="buy__count">{count}</div>
            <button onClick={minusClickHandler} className={minusClass}><span>-</span></button>
        </div>
    );
}
 
export default BuyButton;