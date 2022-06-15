import axios from 'axios';
import React from 'react';
import useDebounce from '../../Hooks/useDebounce';
import useUpdateEffect from '../../Hooks/useUpdateEffect';
import { InitDataContext } from '../../InitDataProvider';

import './BuyButton.css';

const BuyButton = ({ id, max = 10000, active = true }) => {
    const [count, setCount] = React.useState(0);
    const [buyClass, setBuyClass] = React.useState('buyBTN buy');
    const [minusClass, setMinusClass] = React.useState('minusBTN');

    console.log('rerender!');

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
        if (count === max && count !== 0) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    useUpdateEffect(() => {
        if (store.cartID) {
            axios.post(`https://proseller.pro/api/basket`, {
            product_id: id,
            quantity: debouncedCount,
            _auth: store.initData,
            basket_id: store.cartID
        })    
        }

        else {
            axios.post(`https://proseller.pro/api/basket/`, {
                product_id: id,
                quantity: debouncedCount,
                _auth: store.initData
            }).then((res) => {
                store.cartID = res.data.results.basket_id;
            })
        } 
    }, [debouncedCount])

    return (
        <div className="buy__container" style={{marginLeft: '2px'}}>
            <button style={active ? {} : {backgroundColor: 'grey'}} onClick={active ? buyClickHandler: () => {}} className={buyClass}><span></span></button>
            <div className="buy__count">{count}</div>
            <button onClick={minusClickHandler} className={minusClass}><span>-</span></button>
        </div>
    );
}
 
export default BuyButton;