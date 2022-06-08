import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CartLink from '../Components/CartLink/CartLink';
import Catalog from '../Components/Catalog/Catalog';
import CatalogItem from '../Components/CatalogItem/CatalogItem';
import Header from '../Components/Header/Header';
import { InitDataContext } from '../InitDataProvider';

const fakeServerCategoriesResponse = {
    name: 'Napas',
    image: 'https://sun9-41.userapi.com/s/v1/ig2/bgppkepmNndEH11WiV1v2X4vqrfdQoEHGOcCSWCY34UHCtJW7F0ZOVu-X99ynvc55FVUzzSkvQS64c-RkDwbCuIa.jpg?size=1080x1055&quality=96&type=album',
    description: 'Lavandos. Pachka papiros, prish na zhope volosney obros, ya ne obsos, poluchi v ebasos otvet skoree na moy glavniy vopros',
    root_category: 0,
    sub_category: [
        {
            id: 1,
            name: 'sub-category 1',
            image: 'https://sun9-41.userapi.com/s/v1/ig2/bgppkepmNndEH11WiV1v2X4vqrfdQoEHGOcCSWCY34UHCtJW7F0ZOVu-X99ynvc55FVUzzSkvQS64c-RkDwbCuIa.jpg?size=1080x1055&quality=96&type=album',
            description: 'sub-category child num.1'
        },
        {
            id: 1,
            name: 'sub-category 1',
            image: 'https://sun9-41.userapi.com/s/v1/ig2/bgppkepmNndEH11WiV1v2X4vqrfdQoEHGOcCSWCY34UHCtJW7F0ZOVu-X99ynvc55FVUzzSkvQS64c-RkDwbCuIa.jpg?size=1080x1055&quality=96&type=album',
            description: 'sub-category child num.1'
        },
        {
            id: 1,
            name: 'sub-category 1',
            image: 'https://sun9-41.userapi.com/s/v1/ig2/bgppkepmNndEH11WiV1v2X4vqrfdQoEHGOcCSWCY34UHCtJW7F0ZOVu-X99ynvc55FVUzzSkvQS64c-RkDwbCuIa.jpg?size=1080x1055&quality=96&type=album',
            description: 'sub-category child num.1'
        },
        {
            id: 1,
            name: 'sub-category 1',
            image: 'https://sun9-41.userapi.com/s/v1/ig2/bgppkepmNndEH11WiV1v2X4vqrfdQoEHGOcCSWCY34UHCtJW7F0ZOVu-X99ynvc55FVUzzSkvQS64c-RkDwbCuIa.jpg?size=1080x1055&quality=96&type=album',
            description: 'sub-category child num.1'
        }
    ],
    products: [
        {
            id: 1,
            name: 'child-product 1',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini descriptionsome mini descriptionsome mini description',
            quantity: 0,
            price: 1488,
            fast_buy: false
        },
        {
            id: 2,
            name: 'child-product 2',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 228,
            fast_buy: true
        },
        {
            id: 1,
            name: 'child-product 1',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 1488,
            fast_buy: false
        },
        {
            id: 2,
            name: 'child-product 2',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 228,
            fast_buy: false
        },
        {
            id: 1,
            name: 'child-product 1',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 1488,
            fast_buy: false
        },
        {
            id: 2,
            name: 'child-product 2',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 228,
            fast_buy: true
        },
        {
            id: 1,
            name: 'child-product 1',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 1488,
            fast_buy: false
        },
        {
            id: 2,
            name: 'child-product 2',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 228,
            fast_buy: true
        },
        {
            id: 1,
            name: 'child-product 1',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 1488,
            fast_buy: false
        },
        {
            id: 2,
            name: 'child-product 2',
            image: 'https://sun9-6.userapi.com/s/v1/ig2/Xzl86p1V3BkL0JWRS3exVXrB5UPDTNsRHbI8hd_uCPL5YpagB-MW2nNpz3kwcc8w1sZ-2KXNxpQXi8zGfSj3dTrr.jpg?size=1290x970&quality=96&type=album',
            mini_desc: 'some mini description',
            quantity: 0,
            price: 228,
            fast_buy: true
        }
    ]
}


const fakeServerProductResponse = {
    name: 'product 1',
    image: [
        'https://sun9-19.userapi.com/s/v1/ig2/Z8pn6o4MC3di4o2v4TY9JEmFtL0Rj8wZamS-IymBi1p65L9SSI_Gr6-I69m3utfp4cnsOrJgiweh1EkTGPXWvCgY.jpg?size=1080x1073&quality=96&type=album',
        'https://sun9-11.userapi.com/s/v1/ig2/bHOG7_VwK8Q2NtUbsDmQvuEadp6FJ8SVG6nC7_Y-AR9QDzYBbxNTi_lNHLl81SoLh23CFvTAJTSxm0H4iYPmVhVT.jpg?size=1028x1159&quality=96&type=album',
        'https://sun9-32.userapi.com/s/v1/ig2/brGBJUUkjh2bQYyemP0zXtRF0bAhL9U0cHMNkD4EhJk3q_d6nBgcgRj_FS74DQVQvpnA7k89ewra-yllZyx7HBda.jpg?size=790x859&quality=96&type=album',
        'https://sun9-49.userapi.com/s/v1/ig2/rKbDa1Fo2rdGPLXx61_UqSkTjqs6d54qZ2NQQPh8YW8dv8ts7B4CRcIMp8HH4kaJieZhBfm_2_kY35tO7NXnSz1F.jpg?size=700x700&quality=96&type=album',
        'https://sun9-7.userapi.com/s/v1/ig2/EUZ38ZHnzOK2LC5kDowCOlW_riadA2FCOZ59DK-DKT1yLlU8UVAsTRB0QYgD1XIoEgMEpk7KERnLrZaUIJKEV08k.jpg?size=275x183&quality=96&type=album'
    ],
    description: "Full product's description",
    quantity: 1,
    price: 69,
    root_category: 5,
    familiarization: false
}

const CatalogLayout = ({ headerTitle, type }) => {
    const [serverData, setServerData] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);

    const store = React.useContext(InitDataContext);

    let { id } = useParams();
     
    React.useEffect(() => {
        axios.get(`https://proseller.pro/api/category/${id}`).then((res) => {
            console.log(res.data.results);
            setServerData(res.data.results)
        }).then((res) => {setIsLoading(false);});
        console.log(store);
    }, [id])
    
    return (
        <>
            <Header title={headerTitle} back={Number(id) === 0 ? false : true } />
            <div className="catalog__container" style={{ paddingTop : 'calc(min(9vh, 95px))', paddingBottom: '50px' }}>
                {!isLoading && Array.isArray(serverData) && serverData?.map((element, index) => {
                    return (<>
                        <CatalogItem
                        key={index} 
                        name={element.name}
                        description={element.description}
                        imgUrl={element.image}
                        product={false}
                        id={element.id}
                        /> 
                        
                        {element?.sub_category?.map((element, id) => 
                            <CatalogItem
                                id={element.id}
                                name={element.name}
                                description={element.mini_desc}
                                imgUrl={element.image}
                                key={id}
                            />
                        )}

                        {element?.products?.map((element, id) => 
                            <CatalogItem 
                                product={true}
                                name={element.name}
                                description={element.mini_desc}
                                fastbuy={element.fast_buy}
                                price={element.price}
                                imgUrl={element.image}
                                key={id}
                            />
                        )}
                    </>
                )}
                )}

                {!isLoading && !Array.isArray(serverData) && serverData?.sub_category?.map((element, index) => {
                    return <>
                        <CatalogItem
                        key={index} 
                        name={element.name}
                        description={element.description}
                        imgUrl={element.image}
                        product={false}
                        id={element.id}
                        /> 
                    </>
                    }
                )}
                {!isLoading && !Array.isArray(serverData) && serverData?.products?.map((element, index) => {
                    return <>
                        <CatalogItem
                        key={index}
                        name={element.name}
                        description={element.description}
                        imgUrl={element.image}
                        product={true}
                        price={element.price}
                        fastbuy={element.fast_buy}
                        id={element.id}
                        /> 
                    </>
                    }
                )}
                {/* {serverData?.sub_category?.length !== 0 && serverData?.map((element, index) => 
                    <CatalogItem 
                        key={index}
                        name={element.name}
                        imgUrl={element.image}
                        description={element.description}
                        id={element.id}
                        product={false}
                    />
                )} */}
                <div className="link-container" style={{position: 'fixed', bottom: '10px', width: '100%', display: 'grid', placeItems: 'center'}}>
                    <CartLink text={'В корзину'} />
                </div>
            </div>
        </>
    );
}
 
export default CatalogLayout;