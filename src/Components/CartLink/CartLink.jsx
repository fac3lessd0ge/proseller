import React from 'react';
import { Link } from 'react-router-dom';
import './CartLink.css';


const CartLink = ({ text, back = false }) => {
    return (
            <div className='cart__link' role={'button'}> <Link style={{width: '100%'}} to={back ? '/proseller/cats/0' : '/proseller/cart'}> <div style={{width: '100%', display: 'grid', placeItems: 'center'}}>{text}</div> </Link> </div>
    );
}
 
export default CartLink;