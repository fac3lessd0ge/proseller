// Господь прости меня за этот ужасный костыль

import React from 'react';
import { Navigate } from 'react-router-dom';

const ReloadDummyRoute = () => {
    return (
        <Navigate to={'/proseller/cart'} replace={true}/>
    );
}
 
export default ReloadDummyRoute;