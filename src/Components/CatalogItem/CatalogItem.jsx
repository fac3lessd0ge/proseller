import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../URLS';
import BuyButton from '../CatalogBuyButton/BuyButton';

import './CatalogItem.css';
import CatalogItemImageLoader from './CatalogItemImageLoader';

const CatalogItem = ({
	id,
	product,
	name,
	imgUrl,
	description,
	price = undefined,
	fastbuy = true,
	max
}) => {
	const [linkTo, setLinkTo] = React.useState('');
    const [imgLoaded, setImgLoaded] = React.useState(false);

	const navigate = useNavigate();
  
    const URL = imgUrl.includes('media')
    ? BASE_URL + '/django' + imgUrl.slice(12)
    : BASE_URL + '/django/media/' + imgUrl;

    const onLoad = () => setImgLoaded(true);

	React.useEffect(() => {
		if (product) {
			setLinkTo(`/proseller/item/${id}`);
		}
		else {
            setLinkTo(`/proseller/cats/${id}`);
        }    

        const img = new Image();
        img.src = URL;
        img.addEventListener('load', onLoad);

        return () => {
            img.removeEventListener('load', onLoad);
        }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imgUrl]);


	return (
		<div className={`item-wrapper ${product ? '' : 'm10'}`}>
			<div 
				className="catalog__item"
				onClick={() => navigate(linkTo, { replace: true })}
			>
				<div className="catalog__avatar">
					{imgLoaded ? (
						<img src={URL} alt="product avatar" />
					) : (
						<CatalogItemImageLoader />
					)}
				</div>
				<div className="catalog__info">
					<div className="catalog__name clickable">
						{linkTo ? (
							<Link to={linkTo}>
								{name?.length > 20
									? name.substring(0, 20) + '...'
									: name}
							</Link>
						) : (
							<>{name}</>
						)}
					</div>
					<div className="catalog__description">
						{description?.length > 40
							? description.substring(0, 50) + '...'
							: description}
					</div>
					{product && <div className="catalog__price">{price}</div>}
				</div>
			</div>
			{product && fastbuy && <BuyButton max={max} id={id} />}
			{product && !fastbuy && (
				<Link to={`/proseller/item/${id}`}>
					<BuyButton />
				</Link>
			)}
		</div>
	);
};

export default CatalogItem;
