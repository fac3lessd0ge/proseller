import React from 'react';
import { ReactComponent as OutStockSVG } from '../../Assets/outOfStock.svg';

import './CartModal.css';

const CartModal = ({ active, info}) => {
    const [andMore, setAndMore] = React.useState((info && info?.length > 4) ? true : false)

    return (
        active && <div className="modal">
            <div className="modal__content">
                <OutStockSVG />
                <div className="modal__title">
                    We're sorry, but several items that you've chosen are out of stock. <br/>
                    These items are:
                </div>
                {info && info?.length !== 0 && info.slice(0, 4).map((element) => 
                    <div className="modal__item">{element}</div>
                )}

                {andMore && <div className='modal__item'>and some others...</div>}

                <button onClick={() => window.location.reload()} className='modal__submit'> Okay, reload cart </button>
            </div>
        </div>
    );
}
 
export default CartModal;