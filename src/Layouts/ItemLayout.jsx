import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import BuyButton from '../Components/CatalogBuyButton/BuyButton';
import Header from '../Components/Header/Header';
import PhotoCarousel from '../Components/PhotoCarousel/PhotoCarousel';
import CartLink from '../Components/CartLink/CartLink';

const ItemLayout = () => {

    const [serverData, setServerData] = React.useState(null);
    const { id } = useParams();

    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        axios.get(`https://proseller.pro/api/product/${id}`)
            .then((res) => {
                setServerData(res.data.results);
                if (!res.data.results.familiarization) {
                    setActive(true);
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCheckboxChange = (e) => {
        if (e.currentTarget.checked) {
            setActive(true);
            return
        }
        setActive(false);
    }

    return (
        <>
            <Header title={serverData ? serverData.name?.length > 18 ? serverData.name.substring(0, 18) + '...' : serverData.name : 'Loading...'} back={true} />
            {serverData && 
                <div className='catalog__container' style={{ paddingTop : 'calc(min(3vh, 95px))', paddingBottom: '50px' }}>
                    <PhotoCarousel imgArr={serverData?.images} />
                    <div style={{width: '80%', display: 'grid', placeItems: 'center', fontSize: '30px', padding: '0 10%'}}>{serverData.name}</div>
                    <div style={{ padding: '0 12px',  display: 'grid', placeItems: 'center', marginTop: '20px'}}>{serverData.description}</div>
                    <div style={{width: '100%', display: 'grid', placeItems: 'center', marginTop: '10px'}}>Max amount: {serverData.quantity === -1 ? 'unlimited' : serverData.quantity}  <div className='catalog__price'>{serverData.price}</div></div>
                    {serverData?.familiarization && <div className="familize" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'}}>
                        
                        <input onChange={onCheckboxChange} type={'checkbox'} />
                        {"I'm familiarized with this product"}
                    </div>}
                    <div className="btn-container" style={{width: '95%', marginLeft: '2.5%', height: '38px', marginBottom: '5%'}}>
                        <BuyButton active={active} id={Number(id)} max={serverData.quantity === -1 ? 99999 : serverData.quantity}/>
                    </div>
                    <div className="link-container clickable" style={{position: 'fixed', marginLeft: '1px', bottom: '10px', width: '100%', display: 'grid', placeItems: 'center'}}>
                        <CartLink text={'To cart'} to='/proseller/cart'/>
                    </div>
                </div>
            }
        </>
    );
}
 
export default ItemLayout;