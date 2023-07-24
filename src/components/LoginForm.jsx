// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  FormGroup,
  Input,
  Button,
  CardTitle,
  CardText,
} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { DASHBOARD, LOGIN, REGISTER } from '../constants/routes';
import { DASHBOARD, REGISTER } from '../constants/routes';
// import Loader from './Loader/Loader';
// import MyAlert from './Alert/Alert';
import Blink from 'react-blink-text';

function LoginForm() {
  const dispatch = useDispatch();
  // const text = 'Registrations are closed now. Please check back later.';
  const text = `Your password will be sent to you on your official email Id. For email related queries contact IT support it.support@jaipur.manipal.edu`;
  const img = require('../assets/images/graduationNewWithDateNoBg.png');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    reg_no: '',
    password: '',
    email: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(login(formData));
      setLoading(false);
      setFormData({
        reg_no: '',
        password: '',
        role: 'student',
        email: '',
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const {
    auth: { isAuthenticated },
  } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);

  useEffect(() => {
    if (isAuthenticated) {
      history.push(DASHBOARD);
    }
  }, [isAuthenticated]);
  const [blink1, setBlink1] = useState(true);
  const [blink2, setBlink2] = useState(true);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <>
      <br />
      <h4
        style={{
          textAlign: 'center',
          color: 'red',
          fontWeight: 'bold',
          marginRight: '4em',
          backgroundColor: 'white',
          opacity: '80%'
        }}
      >
        {/* Registrations are now open */}
        Registrations are now open
      </h4>

      <div className='container'>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5)',
          }}
        >
          <div className='row'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.5rem',
                fontSize: '1.1rem',
              }}
              className='col-12 justify-content-center'
            >
              <div style={{backgroundColor: 'white', opacity: '80%' }}>
              <Blink color='red' text={text} fontSize='25' fontWeight='700' opacity='100%'>
                <b>
                  <span style={{ textTransform: 'capitalize' }}>{text}</span>
                </b>
              </Blink>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: width > 700 ? 'row' : 'column',
                width: '100%',
              }}
              className='col-12 justify-content-center'
            >
              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1rem',

                  fontSize: '1rem',
                  margin: '1rem',
                }}
                onMouseEnter={() => setBlink1(false)}
                onMouseLeave={() => setBlink1(true)}
                className='col-12 col-md-6 card-home justify-content-center'
              >
                {blink1 ? (
                  <Blink
                    color='black'
                    text={'Click here to watch the event live'}
                    fontSize='25'
                  >
                    <a
                      href='https://youtu.be/5kkHl8ogj9Q'
                      target='_blank'
                      rel='noreferrer noopener'
                      style={{
                        textTransform: 'capitalize',
                        '&:hover': {
                          color: 'red',
                        },
                      }}
                    >
                      Click here to watch the event live
                    </a>
                  </Blink>
                ) : (
                  <a
                    href='https://youtu.be/5kkHl8ogj9Q'
                    target='_blank'
                    rel='noreferrer noopener'
                    // onMouseEnter={() => setBlink(false)}
                    // onMouseLeave={() => setBlink(true)}
                    style={{
                      textTransform: 'capitalize',
                      '&:hover': {
                        color: 'red',
                      },
                    }}
                  >
                    Click here to watch the event live
                  </a>
                )}
              </div> */}
              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1rem',
                  fontSize: '1rem',
                  margin: '1rem',
                }}
                onMouseEnter={() => setBlink2(false)}
                onMouseLeave={() => setBlink2(true)}
                className='col-12 col-md-6 card-home justify-content-center'
              >
                {blink2 ? (
                  <Blink
                    color='black'
                    text={'Click here to download the invitation'}
                    fontSize='25'
                  >
                    <a
                      href='https://drive.google.com/file/d/1FppCwhc1Jy7CFleUPIG4tPEJjviHCxki/view?usp=sharing'
                      target='_blank'
                      rel='noreferrer noopener'
                      style={{
                        textTransform: 'capitalize',
                        '&:hover': {
                          color: 'red',
                        },
                      }}
                    >
                      Click here to download the invitation
                    </a>
                  </Blink>
                ) : (
                  <a
                    href='https://drive.google.com/file/d/1FppCwhc1Jy7CFleUPIG4tPEJjviHCxki/view?usp=sharing'
                    target='_blank'
                    rel='noreferrer noopener'
                    // onMouseEnter={() => setBlink(false)}
                    // onMouseLeave={() => setBlink(true)}
                    style={{
                      textTransform: 'capitalize',
                      '&:hover': {
                        color: 'red',
                      },
                    }}
                  >
                    Click here to download the invitation
                  </a>
                )}
              </div> */}
            </div>
            <div
              className='col-12 col-md-6 justify-content-center'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FadeTransform
                in
                transformProps={{
                  exitTransform: 'scale(0.5)',
                }}
              >
                <center>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  width: '24em',
                  marginRight: '0em'
                }}>
                
                        <img src={img} alt="logo" style={{ width: 400, height: 400}} />
                        
                        </div>
                        </center>
                <div className='row row-content align-items-center'>
                  <div className='col-12'>
                    <Card body inverse className='card-home'>
                      <CardTitle>
                        {/* add logo here */}
                      </CardTitle>
                      <p
                        style={{
                          fontSize: '20px',
                          paddingBottom: '5px',
                          borderBottom: '1px solid white',
                          color: '#000000',
                        }}
                      >
                        Manipal University Jaipur
                      </p>
                      <CardText style={{ padding: '10px', color: '#000000' }}>
                        “Chase your dreams, Burst out at seams, 
Never stop trying, Never stop learning, 
Live life to the fullest, Give it nothing but your best,
 and most importantly, don’t forget to enjoy the journey.”
                      </CardText>
                    </Card>
                  </div>
                </div>
              </FadeTransform>
            </div>
            <div
              className='col-12 col-md-6 form-outer ml-auto '
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <Card
                body
                style={{ backgroundColor: 'white' }}
                className='card-admin '
              >
                <div
                  className='row '
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className='col-12 col-md-12 text-center'>
                    <h1 className='admin-login' style={{ color: 'black' }}>
                      Login
                    </h1>

                    <br />
                    <div className='row row-content'>
                      <div className='col-12'>
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <select
                              type='select'
                              style={{ outline: 'none' }}
                              value={formData.role}
                              className='inputs'
                              name='role'
                              onChange={handleChange}
                            >
                              <option value='student'>Student</option>
                              {/* <option value="admin">Admin</option> */}
                              <option value='depaertment'>Department</option>
                            </select>
                            <br></br>
                            <br />
                            {formData.role === 'student' ? (
                              <Input
                                onChange={handleChange}
                                className='inputs'
                                type='number'
                                // style={{ WebkitAppearance: "textfield" }}
                                value={formData.reg_no}
                                placeholder='Registration Number'
                                name='reg_no'
                              />
                            ) : (
                              <Input
                                onChange={handleChange}
                                className='inputs'
                                type='text'
                                value={formData.email}
                                placeholder='Email'
                                name='email'
                              />
                            )}
                            <br />
                            <Input
                              onChange={handleChange}
                              className='inputs'
                              type='password'
                              value={formData.password}
                              placeholder='Password'
                              name='password'
                            />
                            <br />

                            <br />
                            <Button
                              type='submit'
                              // disabled={true}
                              style={{ width: '50%', borderRadius: '12px' }}
                              color='success'
                            >
                              {loading ? 'Loading...' : 'Login'}
                            </Button>
                          </FormGroup>
                        </Form>
                        <Link to={REGISTER} style={{ textDecoration: 'none' }}>
                          <span style={{ color: 'black' }}>
                            Don't have an account?
                          </span>{' '}
                          <Button
                            type='submit'
                            style={{ width: '30%', borderRadius: '12px' }}
                            color='success'
                          >
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <br />
          <br />
        </FadeTransform>
      </div>
    </>
  );
}

export default LoginForm;
