// Господь прости меня за этот ужасный костыль

import React from 'react';
import CartModal from '../Components/CartModal/CartModal';
import { InitDataContext } from '../InitDataProvider';

const ReloadDummyRoute = () => {

    const store = React.useContext(InitDataContext);

    return (
        <div className="dummy">
            <CartModal active={true} info={store?.outOfStore}/>
        </div>
    );
}
 
export default ReloadDummyRoute;