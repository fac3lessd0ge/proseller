import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartButton from '../CartButton/CartButtom';
import NavBackButton from '../NavBackButton/NavBackButton';
import './Header.css'

const Header = ({ title, back, withCart = true}) => {
    const navigate = useNavigate();

    const backClickHandler = () => {
        navigate(-1);
    }

    return (
        <header>
            <div style={{ paddingTop: '4px'}} className='header__icon'>
                {back && 
                    <div onClick={backClickHandler} className='back-button'>
                        <NavBackButton />
                    </div>}
            </div>
            

            <div className='header__homeLink'><Link to='/proseller/cats/0'>{ title }</Link> </div>
            
        </header>
    );
}
 
export default Header;