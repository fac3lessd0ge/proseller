import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CartLink from '../Components/CartLink/CartLink';
import CatalogItem from '../Components/CatalogItem/CatalogItem';
import Header from '../Components/Header/Header';
import { InitDataContext } from '../InitDataProvider';
import { BASE_API_URL } from '../URLS';

const CatalogLayout = ({ headerTitle, type }) => {
  const [serverData, setServerData] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);

  const store = React.useContext(InitDataContext);

  let { id } = useParams();
  console.log(BASE_API_URL + `/category/${id}`);
  React.useEffect(() => {
    axios
      .get(BASE_API_URL + `/category/${id}`, {
        headers: {
          initdata: store.initData,
        },
      })
      .then((res) => {
        setServerData(res.data.results);
      })
      .then((res) => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    if (!store.cartID) {
      axios
        .post(
          BASE_API_URL + '/basket/',
          {
            _auth: store.initData,
          },
          {
            headers: {
              initdata: store.initData,
            },
          }
        )
        .then((res) => {
          store.cartID = res.data?.results?.basket_id;
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title={headerTitle} back={Number(id) === 0 ? false : true} />
      <div
        className="catalog__container"
        style={{ paddingTop: 'min(10vh, 95px)', paddingBottom: '50px' }}
      >
        {!isLoading &&
          Array.isArray(serverData) &&
          serverData?.map((element, index) => {
            return (
              <>
                <Link to={`/our-bot/cats/${element.id}`}>
                  <CatalogItem
                    id={element.id}
                    name={element.name}
                    description={element.mini_desc}
                    imgUrl={element.image}
                    key={element.id}
                  />
                </Link>
              </>
            );
          })}

        {!isLoading &&
          !Array.isArray(serverData) &&
          serverData?.sub_category?.map((element, index) => {
            return (
              <>
                <Link to={`/our-bot/cats/${element.id}`}>
                  <CatalogItem
                    id={element.id}
                    name={element.name}
                    description={element.mini_desc}
                    imgUrl={element.image}
                    key={id}
                  />
                </Link>
              </>
            );
          })}

        {!isLoading &&
          !Array.isArray(serverData) &&
          serverData?.products?.map((element, index) => {
            return (
              <>
                {element.quantity !== 0 && (
                  <CatalogItem
                    key={index}
                    name={element.name}
                    description={element.mini_desc}
                    imgUrl={element.image}
                    product={true}
                    price={element.price}
                    fastbuy={element.fast_buy}
                    id={element.id}
                    max={element.quantity}
                  />
                )}
              </>
            );
          })}

        {id === '0' && (
          <div
            style={{
              display: 'flex',
              paddingTop: '3%',
              paddingLeft: '2%',
              paddingRight: '2%',
              justifyContent: 'space-around',
              paddingBottom: '30px',
              textDecoration: 'underline',
              fontSize: '16px',
            }}
          >
            <Link style={{ color: '#968787' }} to={'/our-bot/offer'}>
              {' '}
              Public offer{' '}
            </Link>
            <Link style={{ color: '#968787' }} to={'/our-bot/faq'}>
              {' '}
              FAQ{' '}
            </Link>
            <Link style={{ color: '#968787' }} to={'/our-bot/contacts'}>
              {' '}
              Contacts{' '}
            </Link>
            <Link style={{ color: '#908585' }} to={'/our-bot/privacy'}>
              {' '}
              Privacy policy{' '}
            </Link>
          </div>
        )}

        <div
          className="link-container clickable"
          style={{
            position: 'fixed',
            bottom: '10px',
            width: '100%',
            display: 'grid',
            placeItems: 'center',
            zIndex: '100',
          }}
        >
          <CartLink text={'To Cart'} to="/our-bot/cart" />
        </div>
      </div>
    </>
  );
};

export default CatalogLayout;
