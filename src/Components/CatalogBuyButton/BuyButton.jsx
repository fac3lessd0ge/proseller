import React from 'react';

import './BuyButton.css';

const BuyButton = () => {
    const [count, setCount] = React.useState(0);
    const [buyClass, setBuyClass] = React.useState('buyBTN buy');
    const [minusClass, setMinusClass] = React.useState('minusBTN');

    const buyClickHandler = () => {
        setCount(() => count + 1);
    }

    const minusClickHandler = () => {
        setCount(() => count - 1);
    }

    React.useEffect(() => {
        if (count > 0) {
            setBuyClass('buyBTN plus');
            setTimeout(() => {
                setMinusClass('minusBTN up');
            }, 0.5);
        }
        else {
            setBuyClass('buyBTN buy');
            setMinusClass('minusBTN');
        }
    }, [count])

    return (
        <div className="buy__container">
            <button onClick={buyClickHandler} className={buyClass}><span></span></button>
            <div className="buy__count">{count}</div>
            <button onClick={minusClickHandler} className={minusClass}><span>-</span></button>
        </div>
    );
}
 
export default BuyButton;