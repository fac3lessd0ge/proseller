import React from 'react';
import { Link } from 'react-router-dom';
import BuyButton from '../CatalogBuyButton/BuyButton';

import './CatalogItem.css';

const CatalogItem = ({ id, product, name, imgUrl, description, price = undefined, fastbuy = true }) => {
    const [linkTo, setLinkTo] = React.useState('');

    React.useEffect(() => {
        if (product && !fastbuy) { 
            setLinkTo(`/proseller/item/${id}`);
        }
        else if (!product) {
            setLinkTo(`/proseller/cats/${id}`)
        }
    }, [])
    
    return (
        <div className={`item-wrapper ${product ? '': 'm10'}`}>
            <div className="catalog__item">
                <div className="catalog__avatar">
                    <img src={"https://proseller.pro" + imgUrl.slice(12)} alt="product avatar" />
                </div>
                <div className="catalog__info">
                    <div className="catalog__name">
                    {linkTo ? <Link to = {linkTo}>{name}</Link> : <>{name}</>}
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
            {product && fastbuy && <BuyButton id = {id}/>}
            {product && !fastbuy && <Link to = {`/proseller/item/${id}`}><BuyButton /></Link>}
        </div>
    );
}
 
export default CatalogItem;