import React, {createContext} from 'react';

export const InitDataContext = createContext();

const InitDataProvider = ({ children, initialValue }) => {
    return (
        <InitDataContext.Provider value={{ initData: initialValue, cartID: null, outOfStock: null }}>{children}</InitDataContext.Provider>
    );
}
 
export default InitDataProvider;