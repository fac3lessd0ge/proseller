import React, {createContext} from 'react';

export const OutOfStockContext = createContext();

const OutOfStockProvider = ({ children, initialValue }) => {

    const [outOfStock, setOutOfStock] = React.useState(null);

    const stock = { outOfStock, setOutOfStock };

    return (
        <OutOfStockContext.Provider value={stock}>{children}</OutOfStockContext.Provider>
    );
}
 
export default OutOfStockProvider;