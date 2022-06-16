import React from 'react';
import Forms from '../Components/Forms/Forms';
import Header from '../Components/Header/Header';

const OrderLayout = () => {
    return (<>
        <Header title={'Order'} back={true}/>
        <div className='catalog__container' style={{ paddingTop : 'calc(min(10vh, 95px))', height: 'calc(100vh - calc(min(10vh, 95px)))', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Forms />
        </div>
    </>);
}
 
export default OrderLayout;