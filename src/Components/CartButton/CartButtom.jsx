import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Cart } from '../../Assets/cart.svg';

const CartButton = () => {
    return (
        <Link to='/proseller/cart'>
            <Cart />
        </Link>
    );
}
 
export default CartButton;