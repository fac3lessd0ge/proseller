import React from 'react';

import useDelayedNavigation from '../../Hooks/useDelayedNavigation';
import NavBackButton from '../NavBackButton/NavBackButton';
import './Header.css';

const Header = ({ title, back, faq = true }) => {
	const delayedNav = useDelayedNavigation();

	const backClickHandler = () => {
		delayedNav(-1, 100);
	};

	return (
		<header>
			<div
				style={{
					paddingTop: '4px',
					display: 'flex',
					gap: '5px',
					marginLeft: '5px',
				}}
        >
				{back && (
          <div onClick={backClickHandler} className="back-button">
						<NavBackButton />
					</div>
				)}
				<span
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '120px'
          }}
        >
          {title}
        </span>
			</div>

			<div 
				style={{
					display: 'flex',
					flexDirection: 'row'
				}}
			>
				{faq && <div
					style={{width: '54px', textAlign: 'center', letterSpacing: '1px'}}
					className="header__homeLink clickable"
					onClick={(e) => delayedNav('/proseller/faq', 100)}
				>
					{'FAQ'}
				</div>}

				<div
					className="header__homeLink clickable"
					onClick={(e) => delayedNav('/proseller/cats/0', 100)}
				>
					{'Home'}
				</div>
			</div>

			
		</header>
	);
};

export default Header;
