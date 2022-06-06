import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import BuyButton from '../Components/CatalogBuyButton/BuyButton';
import Header from '../Components/Header/Header';
import PhotoCarousel from '../Components/PhotoCarousel/PhotoCarousel';

import './ItemLayout.css';

const fakeServerItemResponse = {
    id: 1,
    name: '300 алмазов',
    description: '300 алмазов на ваш аккаунт. Вот вы представьте: играете вы в вашу любимую игру, и вроде бы всё славно, вы делаете в ней успехи - жизнь хороша. Но в один поистине ужасный момент с вами выйдет на контакт какой нибудь условный василий, которому 12 лет, и одарит вас крайне грубым и унизительным словом за то, что у вас нет новенького красивого предмета, а у него есть. А нет у вас его потому, что у вас не хватило на него всего каких то 300 алмазов. И вы вроде бы человек взрослый, и необдуманные слова ребёнка вас не сильно ранят, но всё же его обзывательства неуловимым шлейфом тянутся за вами, и удовольствие от игры уже словно не то. Но ведь это не проблема, ведь на нашем сервисе вы можете приобрести те самые 300 алмазов, и показать этому мелкому опездалу кто тут блять папочка.',
    quantity: 3,
    price: 300,
    familiarization: false,
    image: [
        'https://sun9-19.userapi.com/s/v1/ig2/Z8pn6o4MC3di4o2v4TY9JEmFtL0Rj8wZamS-IymBi1p65L9SSI_Gr6-I69m3utfp4cnsOrJgiweh1EkTGPXWvCgY.jpg?size=1080x1073&quality=96&type=album',
        'https://sun9-11.userapi.com/s/v1/ig2/bHOG7_VwK8Q2NtUbsDmQvuEadp6FJ8SVG6nC7_Y-AR9QDzYBbxNTi_lNHLl81SoLh23CFvTAJTSxm0H4iYPmVhVT.jpg?size=1028x1159&quality=96&type=album',
        'https://sun9-32.userapi.com/s/v1/ig2/brGBJUUkjh2bQYyemP0zXtRF0bAhL9U0cHMNkD4EhJk3q_d6nBgcgRj_FS74DQVQvpnA7k89ewra-yllZyx7HBda.jpg?size=790x859&quality=96&type=album',
        'https://sun9-49.userapi.com/s/v1/ig2/rKbDa1Fo2rdGPLXx61_UqSkTjqs6d54qZ2NQQPh8YW8dv8ts7B4CRcIMp8HH4kaJieZhBfm_2_kY35tO7NXnSz1F.jpg?size=700x700&quality=96&type=album',
        'https://sun9-7.userapi.com/s/v1/ig2/EUZ38ZHnzOK2LC5kDowCOlW_riadA2FCOZ59DK-DKT1yLlU8UVAsTRB0QYgD1XIoEgMEpk7KERnLrZaUIJKEV08k.jpg?size=275x183&quality=96&type=album'
    ],
    root_category: 1
}

const ItemLayout = () => {

    const [serverData, setServerData] = React.useState(null);
    const { id } = useParams();

    React.useEffect(() => {
        axios.get(`https://proseller.pro/api/item/${id}`)
            .then((res) => {
                setServerData(res.data);
            })
            .catch((error) => {
                console.log('не вышло');
                setServerData(fakeServerItemResponse);
            })
    }, [])

    return (
        <>
            <Header title={serverData ? serverData.name : 'Loading...'} back={true} />
            {serverData && 
                <div className='catalog__container' style={{ paddingTop : 'calc(min(3vh, 95px))' }}>
                    <PhotoCarousel imgArr={serverData?.image} />
                    <div style={{width: '100%', display: 'grid', placeItems: 'center', fontSize: '30px'}}>{serverData.name}</div>
                    <div style={{ padding: '0 12px',  display: 'grid', placeItems: 'center', marginTop: '20px'}}>{serverData.description}</div>
                    <div style={{width: '100%', display: 'grid', placeItems: 'center', marginTop: '10px'}}>Максимальное количество: {serverData.quantity}</div>
                    <div className="btn-container" style={{width: '95%', marginLeft: '2.5%', height: '38px', marginBottom: '5%'}}>
                        <BuyButton max={serverData.quantity}/>
                    </div>
                </div>
            }
        </>
    );
}
 
export default ItemLayout;