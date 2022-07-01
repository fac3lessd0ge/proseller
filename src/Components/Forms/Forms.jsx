import React from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { InitDataContext } from '../../InitDataProvider';
import { OutOfStockContext } from '../../OutOfStockProvider';
import './Forms.css';

const Forms = ({ initialValues }) => {
    const validationSchema = yup.object().shape({
        name: yup.string().typeError('Must be a string').required('This is a required field'),
        login: yup.string().typeError('Must be a string').required('This is a required field'),
        password: yup.string().typeError('Must be a string').required('This is a required field'),
        type: yup.string().typeError('Choose type').required('This is a required field').not(['false'], 'Choose correct type'),
        email: yup.string().email('Please type a correct Email').required('This is a required field')
    });

    const navigate = useNavigate();

    const store = React.useContext(InitDataContext);

    const stock = React.useContext(OutOfStockContext);


    return (
        <div style={{width: '100%', display: 'grid', placeItems: 'center', paddingBottom: '70px'}}>
            
            <Formik
                initialValues={{
                    name: initialValues?.name || '',
                    email: initialValues?.mail || '',
                    login: initialValues?.login || '',
                    password: initialValues?.password || '',
                    type: initialValues?.device_type || ''
                }}
                validateOnBlur
                onSubmit={(values) => {
                    axios.post('https://proseller.pro/api/cart/', {
                        name: values.name,
                        email: values.email,
                        login: values.login,
                        password: values.password,
                        type: values.type,
                        _auth: store.initData,
                        basket_id: store.cartID
                    }).then((res) => {
                        if (res.data.status === 'error') {
                            stock.setOutOfStock(...res.data.results);
                            return 
                        }
                        store.success = true;
                    }).then(() => {
                        navigate('/proseller/reload', { replace: true });
                    })
                }}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => 
                    <div className={'form-field'}>
                        <div className="form">
                            <p>
                                <label htmlFor='name'>Name</label><br/>
                                <input
                                    placeholder='Your name'
                                    type={'text'}
                                    name='name' 
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(`https://proseller.pro/api/update_user_info`, {
                                            _auth: store.initData,
                                            basket_id: store.cartID,
                                            name: values.name
                                        })
                                    }}
                                    value={values.name} 
                                />
                            </p>
                            { touched.name && errors.name && <p className='error'>{errors.name}</p>}
                        </div>

                        <div className="form">
                            <p>
                                <label htmlFor='login'>Device type</label><br/>
                                <select 
                                    onChange={handleChange}
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(`https://proseller.pro/api/update_user_info`, {
                                            _auth: store.initData,
                                            basket_id: store.cartID,
                                            device_type: values.type
                                        })
                                    }}
                                    value={values.type}
                                    name='type'
                                >
                                    <option value={false}>--Choose your type--</option>
                                    <option value='android'>Android</option>
                                    <option value='ios'>IOS</option>
                                </select>
                            </p>
                            { touched.type && errors.type && <p className='error'>{errors.type}</p>}
                        </div>

                        <div className="form">
                            <p>
                                <label htmlFor='email'>Email</label><br/>
                                <input
                                    placeholder='Your Email'
                                    type={'text'}
                                    name='email' 
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(`https://proseller.pro/api/update_user_info`, {
                                            _auth: store.initData,
                                            basket_id: store.cartID,
                                            mail: values.email
                                        })
                                    }}
                                    value={values.email} 
                                />
                            </p>
                            { touched.email && errors.email && <p className='error'>{errors.email}</p>}
                        </div>

                        <div className="form">
                            <p>
                                <label htmlFor='login'>Login WB ID/Facebook/Google/GameCenter</label><br/>
                                <input 
                                    placeholder='Your in-game login'
                                    type={'text'}
                                    name='login' 
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(`https://proseller.pro/api/update_user_info`, {
                                            _auth: store.initData,
                                            basket_id: store.cartID,
                                            login: values.login
                                        })
                                    }}
                                    value={values.login} 
                                />
                            </p>
                            { touched.login && errors.login && <p className='error'>{errors.login}</p>}
                        </div>
                        <div className="form">
                            <p>
                                <label htmlFor='password'>Password WB ID/Facebook/Google/GameCenter</label><br/>
                                <input
                                    placeholder='Your in-game password'
                                    type={'password'}
                                    name='password' 
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(`https://proseller.pro/api/update_user_info`, {
                                            _auth: store.initData,
                                            basket_id: store.cartID,
                                            password: values.password
                                        })
                                    }}
                                    value={values.password} 
                                />
                            </p>
                            { touched.password && errors.password && <p className='error'>{errors.password}</p>}
                        </div>
                        <button 
                            disabled={!isValid && !dirty}
                            type='submit'
                            onClick={handleSubmit} 
                            className='subBtn'
                        > 
                            Submit
                        </button>
                    </div>
                }
            </Formik>
        </div>
    );
}
 
export default Forms;