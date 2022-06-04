import React from 'react';
import { Link } from 'react-router-dom';
import BuyButton from '../CatalogBuyButton/BuyButton';

import './CatalogItem.css';

const CatalogItem = ({ id, product, name, imgUrl, description, price = undefined, fastbuy = true }) => {
    return (
        <div className={`item-wrapper ${product ? '': 'm10'}`}>
            <div className="catalog__item">
                <div className="catalog__avatar">
                    <img src={imgUrl} alt="product avatar" />
                </div>
                <div className="catalog__info">
                    <div className="catalog__name">
                        {name}
                    </div>
                    <div className="catalog__description">
                        {description.length > 40 ?  description.substring(0, 40) + '...' : description}
                    </div>
                    {product && 
                        <div className="catalog__price">
                            {price}
                        </div>
                    }
                </div>
            </div>
            {product && fastbuy && <BuyButton />}
            {product && !fastbuy && <Link to = {`/proseller/item/${id}`}><BuyButton /></Link>}
        </div>
    );
}
 
export default CatalogItem;