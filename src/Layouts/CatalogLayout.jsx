import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CartLink from '../Components/CartLink/CartLink';
import CatalogItem from '../Components/CatalogItem/CatalogItem';
import Header from '../Components/Header/Header';
import { InitDataContext } from '../InitDataProvider';

const CatalogLayout = ({ headerTitle, type }) => {
    const [serverData, setServerData] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(true);

    const store = React.useContext(InitDataContext);

    let { id } = useParams();
     
    React.useEffect(() => {
        axios.get(`https://proseller.pro/api/category/${id}`).then((res) => {
            setServerData(res.data.results)
        }).then((res) => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    React.useEffect(() => {
        if (!store.cartID) {
            axios.post('https://proseller.pro/api/basket/', {
                _auth: store.initData
            }).then((res) => {
                store.cartID = res.data?.results?.basket_id
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <Header title={headerTitle} back={Number(id) === 0 ? false : true } />
            <div className="catalog__container" style={{ paddingTop : 'calc(min(9vh, 95px))', paddingBottom: '50px' }}>
                {!isLoading && Array.isArray(serverData) && serverData?.map((element, index) => {
                    return (<>
                        <Link to={`/proseller/cats/${element.id}`}>
                                <CatalogItem
                                    id={element.id}
                                    name={element.name}
                                    description={element.mini_desc}
                                    imgUrl={element.image}
                                    key={id}
                                />
                        </Link>
                        
                        {/* {element?.products?.map((element, id) => 
                            <CatalogItem 
                                product={true}
                                id={element.id}
                                name={element.name}
                                description={element.mini_desc}
                                fastbuy={element.fast_buy}
                                price={element.price}
                                imgUrl={element.image}
                                key={id}
                            />
                        )} */}

                        {/* {element?.sub_category?.map((element, id) => 
                            <Link to={`/proseller/cats/${element.id}`}>
                                <CatalogItem
                                    id={element.id}
                                    name={element.name}
                                    description={element.mini_desc}
                                    imgUrl={element.image}
                                    key={id}
                                />
                            </Link>
                        )} */}

                        
                    </>
                )}
                )}

                {!isLoading && !Array.isArray(serverData) && serverData?.sub_category?.map((element, index) => {
                    return <>
                        <Link to={`/proseller/cats/${element.id}`}>
                                <CatalogItem
                                    id={element.id}
                                    name={element.name}
                                    description={element.mini_desc}
                                    imgUrl={element.image}
                                    key={id}
                                />
                        </Link>
                    </>
                    }
                )}

                {!isLoading && !Array.isArray(serverData) && serverData?.products?.map((element, index) => {
                    return <>
                        { element.quantity !== 0 && <CatalogItem
                        key={index}
                        name={element.name}
                        description={element.description}
                        imgUrl={element.image}
                        product={true}
                        price={element.price}
                        fastbuy={element.fast_buy}
                        id={element.id}
                        max={element.quantity}
                        />} 
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
                <div className="link-container clickable" style={{position: 'fixed', bottom: '10px', width: '100%', display: 'grid', placeItems: 'center', zIndex: '100'}}>
                    <CartLink text={'To Cart'} to='/proseller/cart' />
                </div>
            </div>
        </>
    );
}
 
export default CatalogLayout;