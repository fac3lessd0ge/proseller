import React from 'react';
import { Link } from 'react-router-dom';
import './CartLink.css';


const CartLink = ({ text, to }) => {
    return (
            <div className='cart__link clickable' role={'button'}> <Link style={{width: '100%'}} to={to}> <div style={{width: '100%', display: 'grid', placeItems: 'center'}}>{text}</div> </Link> </div>
    );
}
 
export default CartLink;