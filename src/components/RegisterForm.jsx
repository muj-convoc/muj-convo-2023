// import React, { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  FormGroup,
  Input,
  ButtonFormGroup,
  Button,
  CardTitle,
  CardText,
} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../slices/authSlice';
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../constants/routes';
import Blink from 'react-blink-text';

function RegisterForm() {
  const [reg_no, setReg_no] = useState('');
  const text = `Your password will be sent to you on your official email Id. For email related queries contact IT support it.support@jaipur.manipal.edu`;
  const text2 = 'Registrations are closed now. Please check back later.';
  // 'Registrations are now open';
  const dispatch = useDispatch();
  const img = require('../assets/images/graduationNew.png');
  const history = useHistory();
  const [blink1, setBlink1] = useState(true);
  const [blink2, setBlink2] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setReg_no(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(register({ reg_no, role: 'student' }));
      setLoading(false);
      history.push(LOGIN);
      setReg_no('');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return (
    <>
      <br />
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
                padding: '2rem',

                // textDecoration: "bold",
                fontSize: '1.1rem',
              }}
              className='col-12 justify-content-center'
            >
              {/* <Blink color='red' text={text2} fontSize='25'> */}
              <b>
                <span style={{ color: 'red', fontSize: '1.6rem' }}>
                  {text2}
                </span>
              </b>
              {/* </Blink> */}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',

                // textDecoration: "bold",
                fontSize: '1.1rem',
              }}
              className='col-12 justify-content-center'
            >
              <Blink color='blue' text={text} fontSize='30'>
                <b>
                  <span style={{ textTransform: 'capitalize' }}>{text}</span>
                </b>
              </Blink>
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

                  // textDecoration: "bold",
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

                  // textDecoration: "bold",
                  fontSize: '1rem',
                  // width: "3rem",
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
                width: '100%',
              }}
            >
              <FadeTransform
                in
                transformProps={{
                  exitTransform: 'scale(0.5)',
                }}
              >
                <center>
                    <img src={img} alt='admin-img' style={{ width: 150 }} />
                    </center>
                <div className='row row-content align-items-center'>
                  <div className='col-12'>
                    <Card body inverse className='card-home'>
                      <CardTitle>
                        {/* <h2
                          className='welcome-msg'
                          style={{ color: '#000000' }}
                        >
                          Welcome to 9th Annual Convocation
                        </h2> */}
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
                        “You are educated. Your certification is in your degree.
                        You may think of it as the ticket to the good life. Let
                        me ask you to think of an alternative. Think of it as
                        your ticket to change the world.” —Tom Brokaw
                      </CardText>
                    </Card>
                  </div>
                </div>
              </FadeTransform>
            </div>
            <div className='col-12 col-md-6 justify-content-center form-outer ml-auto'>
              <Card
                body
                style={{ backgroundColor: 'white' }}
                className='card-admin'
              >
                <div
                  className='row'
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  {/* <div className="col-md-5 text-center d-none d-md-block">
										<img src={img} alt="admin-img" style={{ width: 300 }} />
									</div> */}
                  <div className='col-12 col-md-12 text-center'>
                    <h1 className='admin-login' style={{ color: 'black' }}>
                      Register
                    </h1>
                    <br />
                    <div className='row row-content'>
                      <div className='col-12'>
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Input
                              value={reg_no}
                              onChange={handleChange}
                              className='inputs'
                              type='number'
                              // style={{ webkitAppearance: "textfield" }}
                              placeholder='Registration Number'
                              name='reg_no'
                            />
                            <br />

                            <Button
                              type='submit'
                              // disabled={true}
                              // disabled={true}
                              style={{ width: '50%', borderRadius: '12px' }}
                              color='success'
                              // block
                            >
                              {loading ? 'Loading...' : 'Register'}
                            </Button>
                          </FormGroup>
                        </Form>
                        <br />
                        <Link to={LOGIN} style={{ textDecoration: 'none' }}>
                          <span style={{ color: 'black' }}>
                            Already have an account?
                          </span>{' '}
                          <Button
                            type='submit'
                            style={{ width: '30%', borderRadius: '12px' }}
                            color='success'
                            // block
                          >
                            Login
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

export default RegisterForm;
