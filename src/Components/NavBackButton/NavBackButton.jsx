import React from 'react';
import { ReactComponent as BackIcon } from '../../Assets/arrow-back.svg';

import './NavBackButton.css';

const NavBackButton = () => {
    return (
        <BackIcon className='clickable'/>
    );
}
 
export default NavBackButton;