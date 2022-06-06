import React, {createContext} from 'react';

export const InitDataContext = createContext();

const InitDataProvider = ({ children, initialValue }) => {
    return (
        <InitDataContext.Provider value={{ initData: initialValue }}>{children}</InitDataContext.Provider>
    );
}
 
export default InitDataProvider;