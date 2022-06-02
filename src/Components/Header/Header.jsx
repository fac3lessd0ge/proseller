import React from 'react';
import { Link } from 'react-router-dom';
import NavBackButton from '../NavBackButton/NavBackButton';
import './Header.css'

const Header = ({ title }) => {
    const [backURL, setBackURL] = React.useState(null);

    React.useEffect(() => {
        switch (title) {
			case 'Categories':
				setBackURL(null);
                break;
			case 'Sub-categories':
				setBackURL('/cats')
                break;

            case 'Product':
                setBackURL('/sub_cats')
                break;
			default:
				break;
		}

        console.log(backURL);
    }, [title])

    return (
        <header>
            <div style={{ paddingTop: '4px'}} className='header__icon'>
                {backURL && 
                <Link to={backURL}>
                    <NavBackButton />
                </Link>}
            </div>
            { title }
        </header>
    );
}
 
export default Header;