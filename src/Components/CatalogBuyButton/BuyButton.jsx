import React from 'react';

import './BuyButton.css';

const BuyButton = ({ max = 10000}) => {
    const [count, setCount] = React.useState(0);
    const [buyClass, setBuyClass] = React.useState('buyBTN buy');
    const [minusClass, setMinusClass] = React.useState('minusBTN');

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

    return (
        <div className="buy__container" style={{marginLeft: '2px'}}>
            <button onClick={buyClickHandler} className={buyClass}><span></span></button>
            <div className="buy__count">{count}</div>
            <button onClick={minusClickHandler} className={minusClass}><span>-</span></button>
        </div>
    );
}
 
export default BuyButton;