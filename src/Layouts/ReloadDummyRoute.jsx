// Господь прости меня за этот ужасный костыль

import React from 'react';
import CartModal from '../Components/CartModal/CartModal';
import { useNavigate } from 'react-router-dom';
import { InitDataContext } from '../InitDataProvider';
import { OutOfStockContext } from '../OutOfStockProvider';

const ReloadDummyRoute = () => {

    const navigate = useNavigate();

    const { outOfStock } = React.useContext(OutOfStockContext);

    const store = React.useContext(InitDataContext);

    return (
        <>
            { outOfStock && 
                <div className="dummy">
                    <CartModal active={true} info={outOfStock}/>
                </div>
            }
            { store.success && 
                <div className="modal">
                    <div className="modal__content">
                        <div className="modal__title" style={{width: '100%', textAlign: 'center', marginTop: '20px', fontSize: '17px'}}>
                            Operation success!
                        </div>
                        <button onClick={() => navigate('/proseller/cart', { replace: true })} className='modal__submit clickable'> Okay, reload cart </button>
                    </div>
                </div>
            }
        </>
    );
}
 
export default ReloadDummyRoute;