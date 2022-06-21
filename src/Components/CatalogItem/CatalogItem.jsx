import React from 'react';
import { Link } from 'react-router-dom';
import BuyButton from '../CatalogBuyButton/BuyButton';

import './CatalogItem.css';

const CatalogItem = ({ id, product, name, imgUrl, description, price = undefined, fastbuy = true, max }) => {
    const [linkTo, setLinkTo] = React.useState('');

    React.useEffect(() => {
        if (product) { 
            setLinkTo(`/proseller/item/${id}`);
            return
        }
        setLinkTo(`/proseller/cats/${id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const URL = imgUrl.includes('media') ? "https://proseller.pro/django" + imgUrl.slice(12) : 'https://proseller.pro/django/media/' + imgUrl;
    
    return (
        <div className={`item-wrapper ${product ? '': 'm10'}`}>
            <div className="catalog__item">
                <div className="catalog__avatar">
                    <img src={URL} alt="product avatar" />
                </div>
                <div className="catalog__info">
                    <div className="catalog__name">
                    {linkTo ? <Link to = {linkTo}>{name?.length > 20 ? name.substring(0, 20) + '...' : name}</Link> : <>{name}</>}
                    </div>
                    <div className="catalog__description">
                        {description?.length > 40 ?  description.substring(0, 40) + '...' : description}
                    </div>
                    {product && 
                        <div className="catalog__price">
                            {price}
                        </div>
                    }
                </div>
            </div>
            {product && fastbuy && <BuyButton max={max} id = {id}/>}
            {product && !fastbuy && <Link to = {`/proseller/item/${id}`}><BuyButton /></Link>}
        </div>
    );
}
 
export default CatalogItem;