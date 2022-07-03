import React from 'react';
import useDelayedNavigation from '../../Hooks/useDelayedNavigation';
import './CartLink.css';


const CartLink = ({ text, to }) => {

    const delayedNav = useDelayedNavigation();

    return (
		<div 
        className="cart__link clickable" 
        role={'button'}
        onClick={() => delayedNav(to, 120)}
        >
				<div
					style={{
						width: '100%',
						display: 'grid',
						placeItems: 'center'
					}}
				>
					{text}
				</div>
		</div>
	);
}
 
export default CartLink;