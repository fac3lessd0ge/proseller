import React from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { InitDataContext } from '../../InitDataProvider';
import { OutOfStockContext } from '../../OutOfStockProvider';
import './Forms.css';
import { BASE_API_URL } from '../../URLS';

const Forms = ({ initialValues }) => {
    const validationSchema = yup.object().shape({
        name: yup.string().typeError('Must be a string').required('This is a required field'),
        login: yup.string().typeError('Must be a string').required('This is a required field'),
        password: yup.string().typeError('Must be a string').required('This is a required field'),
        type: yup.string().typeError('Choose type').required('This is a required field').not(['false'], 'Choose correct type'),
        email: yup.string().email('Please type a correct Email').required('This is a required field'),
    });

    const navigate = useNavigate();

    const [agreeWithPolicy, setAgreeWithPolicy] = React.useState(false);
    const [externalLink, setExternalLink] = React.useState('');

    const nameRef = React.useRef(null);
    const typeRef = React.useRef(null);
    const mailRef = React.useRef(null);
    const loginRef = React.useRef(null);
    const passwordRef = React.useRef(null);

    const store = React.useContext(InitDataContext);

    const stock = React.useContext(OutOfStockContext);

    React.useEffect(() => {
        if (externalLink) {
            window.location.replace(externalLink);
        }
    }, [externalLink])

    React.useEffect(() => {
        console.log(agreeWithPolicy);
    }, [agreeWithPolicy])


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
                    if (agreeWithPolicy) {
                        axios.post(BASE_API_URL + '/cart', {
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
                            setExternalLink(res.data.link)
                        }).then((res) => {
                            
                        })
                    }
                    
                    
                }}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty  }) => 
                    <div className={'form-field'}>
                        <div className="form">
                            <p>
                                <label htmlFor='name'>Name</label><br/>
                                <input
                                    placeholder='Your name'
                                    type={'text'}
                                    name='name'
                                    ref={nameRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.target.blur()
                                            typeRef.current.focus();
                                        }
                                    }}
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(BASE_API_URL + `/update_user_info`, {
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
                                    onChange={(e) => {handleChange(e); mailRef.current.focus()}}
                                    ref={typeRef}
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(BASE_API_URL + `/update_user_info`, {
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
                                    ref={mailRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.target.blur()
                                            loginRef.current.focus()
                                        }
                                    }}
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(BASE_API_URL + `/update_user_info`, {
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
                                    ref={loginRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.target.blur()
                                            passwordRef.current.focus()
                                        }
                                    }}
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(BASE_API_URL + `/update_user_info`, {
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
                                    ref={passwordRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.target.blur()
                                        }
                                    }}
                                    onChange={handleChange} 
                                    onBlur={async (e) => {
                                        handleBlur(e); 
                                        await axios.post(BASE_API_URL + `/update_user_info`, {
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
                            className={"subBtn " + (agreeWithPolicy ? '' : 'disabled')}
                        > 
                            Submit
                        </button>
                    </div>
                }
            </Formik>
            <div style={{fontSize: '12px', display: 'flex', alignItems: 'center'}} >
                <input type={'checkbox'} onChange={(e) => {setAgreeWithPolicy(e.target.checked)}} style={{aspectRatio: '1', width: '20px'}} />
                <span style={{marginLeft: '5px'}}> I have read and agreed with the <Link style={{ textDecoration: 'underline' }} to='/proseller/offer'>public offer</Link> and <br /> <Link style={{ textDecoration: 'underline' }} to='/proseller/privacy'>confidentiality </Link> of the bot </span>
            </div>
        </div>
    );
}
 
export default Forms;