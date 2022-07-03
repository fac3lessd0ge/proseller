import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

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
					marginLeft: '20px'
				}}
			>
				{back && (
					<div onClick={backClickHandler} className="back-button">
						<NavBackButton />
					</div>
				)}
				{title}
			</div>

			{faq && (
				<FaQuestionCircle
					className="clickable"
					onClick={(e) => delayedNav('/proseller/faq', 100)}
				/>
			)}

			<div
				className="header__homeLink clickable"
				onClick={(e) => delayedNav('/proseller/cats/0', 100)}
			>
				{'Home'}
			</div>
		</header>
	);
};

export default Header;
