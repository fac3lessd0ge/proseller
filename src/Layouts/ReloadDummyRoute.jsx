// Господь прости меня за этот ужасный костыль

import React from 'react';
import CartModal from '../Components/CartModal/CartModal';
import { useNavigate } from 'react-router-dom';
import { InitDataContext } from '../InitDataProvider';

const ReloadDummyRoute = () => {

    const navigate = useNavigate();

    const store = React.useContext(InitDataContext);

    return (
        <>
            { store.outOfStock && 
                <div className="dummy">
                    <CartModal active={true} info={store?.outOfStore}/>
                </div>
            }
            { store.success && 
                <div className="modal">
                    <div className="modal__content">
                        <div className="modal__title">
                            Operation success!
                        </div>
                        <button onClick={() => navigate('/proseller/cart', { replace: true })} className='modal__submit'> Okay, reload cart </button>
                    </div>
                </div>
            }
        </>
    );
}
 
export default ReloadDummyRoute;