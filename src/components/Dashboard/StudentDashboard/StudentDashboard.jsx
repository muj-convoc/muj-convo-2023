// import React, { Component } from 'react';
import React from 'react';
import {
  Card,
  Form,
  FormGroup,
  Input,
  Button,
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import Helmet from 'react-helmet';
import {
  addCommunicationDetails,
  loadUser,
  setLoading,
} from '../../../slices/authSlice';
import randomize from 'randomatic';
import API from '../../../api/api';
import { setAlert } from '../../../slices/alertSlice';
import { PAYU_MERCHANT_KEY } from '../../../constants/config';
import { updateStudentFeeStatus } from '../../../api/studentRequest';
import { Link } from 'react-router-dom';
import { EDIT_DETAILS } from '../../../constants/routes';
import { sendConfirmationEmail } from '../../../api/authRequests';
function StudentDashboard() {
  const dispatch = useDispatch();
  const img = require('../../../assets/images/graduationNew.png');
  const [formData, setFormData] = useState({
    country: 'India',
    phone: '',
    state: 'Andhra Pradesh',
    city: '',
    district: '',
    address: '',
    pincode: '',
    checked: false,
    checked2: false,
    checked3: false,
    account_holder_name: '',
    bank_address: '',
    account_number: '',
    bank_name: '',
    branch_name: '',
    ifsc_code: '',
    aadhar_front_picture: '',
    aadhar_back_picture: '',
    cancel_check: '',
  });

  const [inPersonDetails, setInPersonDetails] = useState({
    day: '',
    companions: '0',
  });
  // handle change function is here

  const [isCourierSelected, setIsCourierSelected] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange_onlytext = (e) => {
    const result = e.target.value.replace(/[^a-z]/gi, '');
    setFormData({ ...formData, [e.target.name]: result });
  };

  const handleInPersonDetailsChange = (e) => {
    setInPersonDetails({ ...inPersonDetails, [e.target.name]: e.target.value });
  };

  // const showConfirm = () => {
  //   document.getElementById('confirmBtn').style.display = 'block';
  // };

  // const [state, setState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState(true);

    const error = Object.values(formData).some((data) => {
      return !data.length === 0;
    });
    // const error = false;
    if (error) {
      dispatch(setAlert('Please fill all the fields of the form', 'error'));
    } else {
      dispatch(addCommunicationDetails(formData));
      dispatch(loadUser());
      // setFormData({
      //   country: 'India',
      //   phone: '',
      //   state: '',
      //   city: '',
      //   district: '',
      //   address: '',
      //   pincode: '',
      //   checked: false,
      //   checked2: false,
      //   checked3: false,
      //   account_holder_name: '',
      //   bank_address: '',
      //   account_number: '',
      //   bank_name: '',
      //   branch_name: '',
      //   ifsc_code: '',
      //   aadhar_front_picture: '',
      //   aadhar_back_picture: '',
      //   cancel_check: '',
      //   day: ''
      // });
    }
  };
  const {
    auth: { user, loading },
  } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);
  const rows = [];
  // if (loading) return <Loader />;

  for (let key in user) {
    rows.push(`${key}:${user[key]}`);
  }
  const newRows = rows.filter((row) => {
    const data = row.split(':');
    if (
      data[0] === 'is_paid' ||
      data[0] === '_id' ||
      data[0] === '__v' ||
      data[0] === 'createdAt' ||
      data[0] === 'updatedAt' ||
      data[0] === 'password' ||
      data[0] === 'role' ||
      data[0] === 'aadhar_front_picture' ||
      data[0] === 'feedbackGiven' ||
      data[0] === 'aadhar_back_picture' ||
      data[0] === 'specialization' ||
      data[0] === 'cancel_check'
    )
      return false;
    return true;
  });

  const [state, setState] = useState(user.country);
  const [hasAgreed, setHasAgreed] = useState(false);

  const openCloudWidget = (value) => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'dldnrcfwz',
          uploadPreset: 'neautqvj',
          resourceType: 'image',
          maxFiles: 1,
          maxImageFileSize: 1500000,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            if (value === 'aadhar_front_picture')
              setFormData({
                ...formData,
                aadhar_front_picture: result.info.secure_url,
              });
            else if (value === 'aadhar_back_picture')
              setFormData({
                ...formData,
                aadhar_back_picture: result.info.secure_url,
              });
            else if (value === 'cancel_check')
              setFormData({
                ...formData,
                cancel_check: result.info.secure_url,
              });
            // setFieldValue("photo", result.info.secure_url);
          }
        }
      )
      .open();
  };

  const pd_in = {
    key: PAYU_MERCHANT_KEY,
    txnid: randomize('A0', 8),
    amount: 1,
    firstname: user.student_name,
    email: user.email,
    phone: user.phone,
    productinfo: 'Convocation Fees',
    surl: 'http://localhost:3000/success',
    furl: 'http://localhost:3000/fail',
    hash: '',
  };

  const pd_out = {
    key: PAYU_MERCHANT_KEY,
    txnid: randomize('A0', 8),
    amount: 2,
    firstname: user.student_name,
    email: user.email,
    phone: user.phone,
    productinfo: 'Convocation Fees',
    surl: 'http://localhost:3000/success',
    furl: 'http://localhost:3000/fail',
    hash: '',
  };

  // Data to be Sent to API to generate hash.
  let paymentData_out = {
    txnid: pd_out.txnid,
    email: pd_out.email,
    amount: pd_out.amount,
    productinfo: pd_out.productinfo,
    firstname: pd_out.firstname,
  };

  let paymentData_in = {
    txnid: pd_in.txnid,
    email: pd_in.email,
    amount: pd_in.amount,
    productinfo: pd_in.productinfo,
    firstname: pd_in.firstname,
  };

  const handlePaymentClick = () => {
    if (isCourierSelected) {
      handleClick_out();
    } else {
      handleClick_in();
    }
  };

  const handleClick_out = async () => {
    if (isCourierSelected == null) {
      dispatch(setAlert('Please select an option', 'danger'));
      return;
    }

    try {
      const res = await API.post('/student/payment/payumoney', {
        ...paymentData_out,
      });
      const data = res.data;
      pd_out.hash = data.hash;
      redirectToPayU(pd_out);
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
    }
  };

  const handleClick_in = async () => {
    if (isCourierSelected == null) {
      dispatch(setAlert('Please select an option', 'danger'));
      return;
    }

    const day = inPersonDetails.day;
    if (isCourierSelected === false) {
      if (day.length === 0) {
        dispatch(setAlert('Please select a day', 'danger'));
        return;
      }
    }
    try {
      const dayCheck = await API.post('/student/check-day', {
        day,
      });
    } catch (err) {
      dispatch(
        setAlert('Maximum limit for that day has been reached', 'danger')
      );
      return;
    }

    try {
      const res = await API.post('/student/payment/payumoney', {
        ...paymentData_in,
      });
      const data = res.data;
      pd_in.hash = data.hash;
      redirectToPayU(pd_in);
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
    }
  };

  let disCon = false;
  const disableConfirm = () => {
    disCon = true;
  };
  const handleClick2 = async () => {
    try {
      dispatch(setLoading());
      const data = await sendConfirmationEmail();
      const { success } = data;
      if (success) {
        dispatch(loadUser());
        dispatch(
          setAlert(
            'Thank you for confiming your details. You have been sent an email confirming the same.',
            'success'
          )
        ).then(disableConfirm());
      }
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
    }
  };

  const outPersonDetails = {
    day: '',
    companions: '',
  };

  const redirectToPayU = (pd) => {
    console.log(pd);
    //use window.bolt.launch if you face an error in bolt.launch
    window.bolt.launch(pd, {
      responseHandler: async function (response) {
        try {
          console.log(response);
          const body = JSON.stringify(response.response);
          // your payment response Code goes here

          const res = await API.post('/student/paymentResponse', body);
          const data = res.data;
          console.log(data);
          const { success, status } = data;
          if (status === 'success') {
            try {
              dispatch(setLoading());
              let data;
              if (isCourierSelected) {
                data = await updateStudentFeeStatus(
                  user.reg_no,
                  response.response.payuMoneyId,
                  outPersonDetails.day,
                  outPersonDetails.companions
                );
              } else {
                data = await updateStudentFeeStatus(
                  user.reg_no,
                  response.response.payuMoneyId,
                  inPersonDetails.day,
                  inPersonDetails.companions
                );
              }
              dispatch(loadUser());
              dispatch(setAlert('Payment Successful', 'success'));
              dispatch(setLoading());
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
          dispatch(setAlert('Error', 'danger'));
        }
      },

      catchException: function (response) {
        console.log(response);
        // dispatch(setAlert(response.response));
        // the code you use to handle the integration errors goes here
        // Make any UI changes to convey the error to the user
      },
    });
  };

  return (
    <>
      <Helmet>
        <script
          src='https://widget.cloudinary.com/v2.0/global/all.js'
          type='text/javascript'
        ></script>
      </Helmet>
      <div className='container'>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5)',
          }}
        >
          <div className='row'>
            <div className='col-12 justify-content-center form-outer'>
              <Card
                body
                style={{ backgroundColor: 'white' }}
                className='card-admin'
              >
                <div className='row' style={{ display: 'flex' }}>
                  <div
                    className='col-12 col-md-7 text-center'
                    style={{ paddingTop: 0 }}
                  >
                    <img src={img} alt='admin-img' style={{ width: 150 }} />
                    {/* <h1>9th Convocation</h1> */}
                    {/* <h2>2022</h2> */}
                    <h1 className='admin-login'>Student Details</h1>

                    <div className='row  form-outer-2'>
                      <div className='col-12 justify-content-center '>
                        <Table>
                          <thead>
                            <tr>
                              <th>Field</th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {newRows.slice(0, 11).map((row, i) => {
                              const data = row.split(':');
                              if (data[0] === 'cgpa') {
                                data[1] = Number(data[1]).toFixed(2);
                              }
                              return (
                                <tr key={i}>
                                  <th scope='row'>
                                    {data[0].replace(/_/g, ' ').toUpperCase()}
                                  </th>
                                  <td style={{ wordBreak: 'break-word' }}>
                                    {data[1]}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <br />
                        {!isCourierSelected && (
                          <>
                            <div style={{ display: 'flex', marginLeft: '3em' }}>
                              <h2 className='admin-login-new'>
                                Choose a date for <br></br>
                                attending Convocation
                              </h2>
                              <select
                                type='select'
                                style={{
                                  outline: 'none',
                                  height: '2em',
                                  width: '8em',
                                  padding: '2px !important',
                                  background: 'white !important',
                                  marginLeft: '8.7em',
                                }}
                                value={inPersonDetails.day}
                                className='inputs-new'
                                name='day'
                                onChange={handleInPersonDetailsChange}
                              >
                                <option className='inputs-new' value=''>
                                  Not Selected
                                </option>
                                <option className='inputs-new' value='1'>
                                  4th November (Day 1)
                                </option>
                                <option className='inputs-new' value='2'>
                                  5th November (Day 2)
                                </option>
                                <option className='inputs-new' value='3'>
                                  6th November (Day 3)
                                </option>
                              </select>
                            </div>

                            <br />
                            <br />
                            <div style={{ display: 'flex' }}>
                              <h2 className='admin-login-new'>
                                Choose number of companions <br></br>
                                attending Convocation with you
                              </h2>
                              <select
                                type='select'
                                style={{
                                  outline: 'none',
                                  height: '2em',
                                  width: '8em',
                                  padding: '2px !important',
                                  background: 'white !important',
                                  marginLeft: '4.5em',
                                }}
                                value={inPersonDetails.companions}
                                className='inputs-new'
                                name='companions'
                                onChange={handleInPersonDetailsChange}
                              >
                                <option className='inputs-new' value='0'>
                                  0
                                </option>
                                <option className='inputs-new' value='1'>
                                  1
                                </option>
                                <option className='inputs-new' value='2'>
                                  2
                                </option>
                              </select>
                            </div>
                          </>
                        )}

                        <br></br>
                        <br />
                        {/* <br />
                        <br />
                        <br /> */}

                        {!user.country ? (
                          <>
                            {' '}
                            {/* <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br /> */}
                          </>
                        ) : (
                          <></>
                        )}
                        {!user.is_paid ? (
                          <div style={{ padding: '1rem' }}>
                            <InputGroup>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <Input
                                  id='checked'
                                  value={!isCourierSelected}
                                  name='checked'
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      checked3: !formData.checked3,
                                    });
                                    setIsCourierSelected(false);
                                  }}
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    padding: '5px',
                                  }}
                                  type='radio'
                                  aria-label='Checkbox for following text input'
                                />
                                <div>
                                  <h5
                                    style={{
                                      lineHeight: '2rem',
                                      textAlign: 'center',
                                      marginLeft: '1rem',
                                    }}
                                  >
                                    <b>
                                      I will collect degree certificates in
                                      person.
                                      <br />
                                    </b>
                                  </h5>
                                </div>
                              </div>
                            </InputGroup>
                            <hr />
                            <InputGroup>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <Input
                                  id='checked'
                                  value={isCourierSelected}
                                  name='checked'
                                  // prevent check box from being unchecked
                                  onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      checked2: !formData.checked2,
                                    });
                                    setIsCourierSelected(true);
                                  }}
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    padding: '5px',
                                  }}
                                  type='radio'
                                  aria-label='Checkbox for following text input'
                                />
                                <div>
                                  <h5
                                    style={{
                                      lineHeight: '2rem',
                                      textAlign: 'center',
                                      marginLeft: '1rem',
                                    }}
                                  >
                                    <b>
                                      I want degree certificates through courier
                                      sevices
                                      <br />
                                    </b>
                                  </h5>
                                </div>
                              </div>
                            </InputGroup>
                            {/* {formData.checked3 && !formData.checked2 && (
                              <>
                                <hr />
                                <InputGroup>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                    }}
                                  >
                                    <Input
                                      id='checked'
                                      value={formData.checked}
                                      name='checked'
                                      onChange={(e) =>
                                        // setFormData({
                                        //   ...formData,
                                        //   checked: !formData.checked,
                                        // })
                                        setHasAgreed(!hasAgreed)
                                      }
                                      style={{
                                        width: '30px',
                                        height: '30px',
                                        padding: '5px',
                                      }}
                                      type='checkbox'
                                      aria-label='Checkbox for following text input'
                                    />
                                    <div>
                                      <h5
                                        style={{
                                          lineHeight: '2rem',
                                          textAlign: 'center',
                                        }}
                                      >
                                        <b>
                                          I do hereby declare that the above
                                          information stated are true,
                                          <br />
                                          correct and complete to the best of{' '}
                                          <br />
                                          my belief and knowledge
                                        </b>
                                      </h5>
                                    </div>
                                  </div>
                                </InputGroup>
                                <br />
                                <Button
                                  id='confirmBtn'
                                  // style={{
                                  //   display: 'none',
                                  //   marginLeft: '13.5em',
                                  // }}
                                  disabled={
                                    // !formData.checked ||
                                    // // !user.country ||
                                    // !formData.checked3
                                    !hasAgreed || !state
                                  }
                                  // type="submit"
                                  onClick={handleClick_in}
                                  color='success'
                                >
                                  Confirm and Pay
                                </Button>
                              </>
                            )} */}
                            {/* {formData.checked2 && !formData.checked3 && ( */}
                            <>
                              <hr />
                              <InputGroup>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <Input
                                    id='checked'
                                    value={formData.checked}
                                    name='checked'
                                    onChange={(e) =>
                                      // setFormData({
                                      //   ...formData,
                                      //   checked: !formData.checked,
                                      // })
                                      setHasAgreed(!hasAgreed)
                                    }
                                    style={{
                                      width: '30px',
                                      height: '30px',
                                      padding: '5px',
                                    }}
                                    type='checkbox'
                                    aria-label='Checkbox for following text input'
                                  />
                                  <div>
                                    <h5
                                      style={{
                                        lineHeight: '2rem',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <b>
                                        I do hereby declare that the above
                                        information stated are true,
                                        <br />
                                        correct and complete to the best of{' '}
                                        <br />
                                        my belief and knowledge
                                      </b>
                                    </h5>
                                  </div>
                                </div>
                              </InputGroup>
                              <br />
                              <Button
                                disabled={
                                  // !formData.checked ||
                                  // !user.country ||
                                  // !formData.checked2
                                  !hasAgreed || !state
                                }
                                // type="submit"
                                onClick={handlePaymentClick}
                                color='success'
                              >
                                Confirm and pay
                              </Button>
                            </>
                            {/* )} */}
                          </div>
                        ) : (
                          <div>
                            <h5
                              style={{
                                lineHeight: '2rem',
                                textAlign: 'center',
                              }}
                            >
                              <b>
                                Congratulations! You have successfully
                                registered for
                                <br />
                                9th MUJ convocation
                                <br />
                              </b>
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-md-5 text-center d-sm-block d-md-block'>
                    {!user.country ? (
                      <>
                        <h2
                          className='admin-login'
                          style={{ color: 'black', marginTop: '1rem' }}
                        >
                          Communication Details
                        </h2>
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Input
                              onChange={handleChange}
                              className='inputs'
                              type='number'
                              required={true}
                              value={formData.phone}
                              placeholder='Your phone number'
                              name='phone'
                            />
                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              value={formData.address}
                              type='text'
                              placeholder='address'
                              name='address'
                            />
                            <br />
                            <Input
                              required={true}
                              onChange={handleChange_onlytext}
                              className='inputs'
                              value={formData.city}
                              type='text'
                              placeholder='City'
                              name='city'
                            />
                            <br />
                            <Input
                              required={true}
                              onChange={handleChange_onlytext}
                              className='inputs'
                              value={formData.district}
                              type='text'
                              placeholder='District'
                              name='district'
                            />
                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              value={formData.pincode}
                              className='inputs'
                              type='number'
                              placeholder='Pincode'
                              name='pincode'
                            />
                            <br />
                            <select
                              // type="select"
                              required={true}
                              style={{
                                marginTop: '1rem',
                                marginBottom: '1rem',
                              }}
                              value={formData.country}
                              onChange={handleChange}
                              className='inputs'
                              placeholder='Enter your country'
                              name='country'
                            >
                              <option value='India'>India</option>
                              <option value='Afganistan'>Afghanistan</option>
                              <option value='Albania'>Albania</option>
                              <option value='Algeria'>Algeria</option>
                              <option value='American Samoa'>
                                American Samoa
                              </option>
                              <option value='Andorra'>Andorra</option>
                              <option value='Angola'>Angola</option>
                              <option value='Anguilla'>Anguilla</option>
                              <option value='Antigua & Barbuda'>
                                Antigua & Barbuda
                              </option>
                              <option value='Argentina'>Argentina</option>
                              <option value='Armenia'>Armenia</option>
                              <option value='Aruba'>Aruba</option>
                              <option value='Australia'>Australia</option>
                              <option value='Austria'>Austria</option>
                              <option value='Azerbaijan'>Azerbaijan</option>
                              <option value='Bahamas'>Bahamas</option>
                              <option value='Bahrain'>Bahrain</option>
                              <option value='Bangladesh'>Bangladesh</option>
                              <option value='Barbados'>Barbados</option>
                              <option value='Belarus'>Belarus</option>
                              <option value='Belgium'>Belgium</option>
                              <option value='Belize'>Belize</option>
                              <option value='Benin'>Benin</option>
                              <option value='Bermuda'>Bermuda</option>
                              <option value='Bhutan'>Bhutan</option>
                              <option value='Bolivia'>Bolivia</option>
                              <option value='Bonaire'>Bonaire</option>
                              <option value='Bosnia & Herzegovina'>
                                Bosnia & Herzegovina
                              </option>
                              <option value='Botswana'>Botswana</option>
                              <option value='Brazil'>Brazil</option>
                              <option value='British Indian Ocean Ter'>
                                British Indian Ocean Ter
                              </option>
                              <option value='Brunei'>Brunei</option>
                              <option value='Bulgaria'>Bulgaria</option>
                              <option value='Burkina Faso'>Burkina Faso</option>
                              <option value='Burundi'>Burundi</option>
                              <option value='Cambodia'>Cambodia</option>
                              <option value='Cameroon'>Cameroon</option>
                              <option value='Canada'>Canada</option>
                              <option value='Canary Islands'>
                                Canary Islands
                              </option>
                              <option value='Cape Verde'>Cape Verde</option>
                              <option value='Cayman Islands'>
                                Cayman Islands
                              </option>
                              <option value='Central African Republic'>
                                Central African Republic
                              </option>
                              <option value='Chad'>Chad</option>
                              <option value='Channel Islands'>
                                Channel Islands
                              </option>
                              <option value='Chile'>Chile</option>
                              <option value='China'>China</option>
                              <option value='Christmas Island'>
                                Christmas Island
                              </option>
                              <option value='Cocos Island'>Cocos Island</option>
                              <option value='Colombia'>Colombia</option>
                              <option value='Comoros'>Comoros</option>
                              <option value='Congo'>Congo</option>
                              <option value='Cook Islands'>Cook Islands</option>
                              <option value='Costa Rica'>Costa Rica</option>
                              <option value='Cote DIvoire'>Cote DIvoire</option>
                              <option value='Croatia'>Croatia</option>
                              <option value='Cuba'>Cuba</option>
                              <option value='Curaco'>Curacao</option>
                              <option value='Cyprus'>Cyprus</option>
                              <option value='Czech Republic'>
                                Czech Republic
                              </option>
                              <option value='Denmark'>Denmark</option>
                              <option value='Djibouti'>Djibouti</option>
                              <option value='Dominica'>Dominica</option>
                              <option value='Dominican Republic'>
                                Dominican Republic
                              </option>
                              <option value='East Timor'>East Timor</option>
                              <option value='Ecuador'>Ecuador</option>
                              <option value='Egypt'>Egypt</option>
                              <option value='El Salvador'>El Salvador</option>
                              <option value='Equatorial Guinea'>
                                Equatorial Guinea
                              </option>
                              <option value='Eritrea'>Eritrea</option>
                              <option value='Estonia'>Estonia</option>
                              <option value='Ethiopia'>Ethiopia</option>
                              <option value='Falkland Islands'>
                                Falkland Islands
                              </option>
                              <option value='Faroe Islands'>
                                Faroe Islands
                              </option>
                              <option value='Fiji'>Fiji</option>
                              <option value='Finland'>Finland</option>
                              <option value='France'>France</option>
                              <option value='French Guiana'>
                                French Guiana
                              </option>
                              <option value='French Polynesia'>
                                French Polynesia
                              </option>
                              <option value='French Southern Ter'>
                                French Southern Ter
                              </option>
                              <option value='Gabon'>Gabon</option>
                              <option value='Gambia'>Gambia</option>
                              <option value='Georgia'>Georgia</option>
                              <option value='Germany'>Germany</option>
                              <option value='Ghana'>Ghana</option>
                              <option value='Gibraltar'>Gibraltar</option>
                              <option value='Great Britain'>
                                Great Britain
                              </option>
                              <option value='Greece'>Greece</option>
                              <option value='Greenland'>Greenland</option>
                              <option value='Grenada'>Grenada</option>
                              <option value='Guadeloupe'>Guadeloupe</option>
                              <option value='Guam'>Guam</option>
                              <option value='Guatemala'>Guatemala</option>
                              <option value='Guinea'>Guinea</option>
                              <option value='Guyana'>Guyana</option>
                              <option value='Haiti'>Haiti</option>
                              <option value='Hawaii'>Hawaii</option>
                              <option value='Honduras'>Honduras</option>
                              <option value='Hong Kong'>Hong Kong</option>
                              <option value='Hungary'>Hungary</option>
                              <option value='Iceland'>Iceland</option>
                              <option value='Indonesia'>Indonesia</option>

                              <option value='Iran'>Iran</option>
                              <option value='Iraq'>Iraq</option>
                              <option value='Ireland'>Ireland</option>
                              <option value='Isle of Man'>Isle of Man</option>
                              <option value='Israel'>Israel</option>
                              <option value='Italy'>Italy</option>
                              <option value='Jamaica'>Jamaica</option>
                              <option value='Japan'>Japan</option>
                              <option value='Jordan'>Jordan</option>
                              <option value='Kazakhstan'>Kazakhstan</option>
                              <option value='Kenya'>Kenya</option>
                              <option value='Kiribati'>Kiribati</option>
                              <option value='Korea North'>Korea North</option>
                              <option value='Korea Sout'>Korea South</option>
                              <option value='Kuwait'>Kuwait</option>
                              <option value='Kyrgyzstan'>Kyrgyzstan</option>
                              <option value='Laos'>Laos</option>
                              <option value='Latvia'>Latvia</option>
                              <option value='Lebanon'>Lebanon</option>
                              <option value='Lesotho'>Lesotho</option>
                              <option value='Liberia'>Liberia</option>
                              <option value='Libya'>Libya</option>
                              <option value='Liechtenstein'>
                                Liechtenstein
                              </option>
                              <option value='Lithuania'>Lithuania</option>
                              <option value='Luxembourg'>Luxembourg</option>
                              <option value='Macau'>Macau</option>
                              <option value='Macedonia'>Macedonia</option>
                              <option value='Madagascar'>Madagascar</option>
                              <option value='Malaysia'>Malaysia</option>
                              <option value='Malawi'>Malawi</option>
                              <option value='Maldives'>Maldives</option>
                              <option value='Mali'>Mali</option>
                              <option value='Malta'>Malta</option>
                              <option value='Marshall Islands'>
                                Marshall Islands
                              </option>
                              <option value='Martinique'>Martinique</option>
                              <option value='Mauritania'>Mauritania</option>
                              <option value='Mauritius'>Mauritius</option>
                              <option value='Mayotte'>Mayotte</option>
                              <option value='Mexico'>Mexico</option>
                              <option value='Midway Islands'>
                                Midway Islands
                              </option>
                              <option value='Moldova'>Moldova</option>
                              <option value='Monaco'>Monaco</option>
                              <option value='Mongolia'>Mongolia</option>
                              <option value='Montserrat'>Montserrat</option>
                              <option value='Morocco'>Morocco</option>
                              <option value='Mozambique'>Mozambique</option>
                              <option value='Myanmar'>Myanmar</option>
                              <option value='Nambia'>Nambia</option>
                              <option value='Nauru'>Nauru</option>
                              <option value='Nepal'>Nepal</option>
                              <option value='Netherland Antilles'>
                                Netherland Antilles
                              </option>
                              <option value='Netherlands'>
                                Netherlands (Holland, Europe)
                              </option>
                              <option value='Nevis'>Nevis</option>
                              <option value='New Caledonia'>
                                New Caledonia
                              </option>
                              <option value='New Zealand'>New Zealand</option>
                              <option value='Nicaragua'>Nicaragua</option>
                              <option value='Niger'>Niger</option>
                              <option value='Nigeria'>Nigeria</option>
                              <option value='Niue'>Niue</option>
                              <option value='Norfolk Island'>
                                Norfolk Island
                              </option>
                              <option value='Norway'>Norway</option>
                              <option value='Oman'>Oman</option>
                              <option value='Pakistan'>Pakistan</option>
                              <option value='Palau Island'>Palau Island</option>
                              <option value='Palestine'>Palestine</option>
                              <option value='Panama'>Panama</option>
                              <option value='Papua New Guinea'>
                                Papua New Guinea
                              </option>
                              <option value='Paraguay'>Paraguay</option>
                              <option value='Peru'>Peru</option>
                              <option value='Phillipines'>Philippines</option>
                              <option value='Pitcairn Island'>
                                Pitcairn Island
                              </option>
                              <option value='Poland'>Poland</option>
                              <option value='Portugal'>Portugal</option>
                              <option value='Puerto Rico'>Puerto Rico</option>
                              <option value='Qatar'>Qatar</option>
                              <option value='Republic of Montenegro'>
                                Republic of Montenegro
                              </option>
                              <option value='Republic of Serbia'>
                                Republic of Serbia
                              </option>
                              <option value='Reunion'>Reunion</option>
                              <option value='Romania'>Romania</option>
                              <option value='Russia'>Russia</option>
                              <option value='Rwanda'>Rwanda</option>
                              <option value='St Barthelemy'>
                                St Barthelemy
                              </option>
                              <option value='St Eustatius'>St Eustatius</option>
                              <option value='St Helena'>St Helena</option>
                              <option value='St Kitts-Nevis'>
                                St Kitts-Nevis
                              </option>
                              <option value='St Lucia'>St Lucia</option>
                              <option value='St Maarten'>St Maarten</option>
                              <option value='St Pierre & Miquelon'>
                                St Pierre & Miquelon
                              </option>
                              <option value='St Vincent & Grenadines'>
                                St Vincent & Grenadines
                              </option>
                              <option value='Saipan'>Saipan</option>
                              <option value='Samoa'>Samoa</option>
                              <option value='Samoa American'>
                                Samoa American
                              </option>
                              <option value='San Marino'>San Marino</option>
                              <option value='Sao Tome & Principe'>
                                Sao Tome & Principe
                              </option>
                              <option value='Saudi Arabia'>Saudi Arabia</option>
                              <option value='Senegal'>Senegal</option>
                              <option value='Seychelles'>Seychelles</option>
                              <option value='Sierra Leone'>Sierra Leone</option>
                              <option value='Singapore'>Singapore</option>
                              <option value='Slovakia'>Slovakia</option>
                              <option value='Slovenia'>Slovenia</option>
                              <option value='Solomon Islands'>
                                Solomon Islands
                              </option>
                              <option value='Somalia'>Somalia</option>
                              <option value='South Africa'>South Africa</option>
                              <option value='Spain'>Spain</option>
                              <option value='Sri Lanka'>Sri Lanka</option>
                              <option value='Sudan'>Sudan</option>
                              <option value='Suriname'>Suriname</option>
                              <option value='Swaziland'>Swaziland</option>
                              <option value='Sweden'>Sweden</option>
                              <option value='Switzerland'>Switzerland</option>
                              <option value='Syria'>Syria</option>
                              <option value='Tahiti'>Tahiti</option>
                              <option value='Taiwan'>Taiwan</option>
                              <option value='Tajikistan'>Tajikistan</option>
                              <option value='Tanzania'>Tanzania</option>
                              <option value='Thailand'>Thailand</option>
                              <option value='Togo'>Togo</option>
                              <option value='Tokelau'>Tokelau</option>
                              <option value='Tonga'>Tonga</option>
                              <option value='Trinidad & Tobago'>
                                Trinidad & Tobago
                              </option>
                              <option value='Tunisia'>Tunisia</option>
                              <option value='Turkey'>Turkey</option>
                              <option value='Turkmenistan'>Turkmenistan</option>
                              <option value='Turks & Caicos Is'>
                                Turks & Caicos Is
                              </option>
                              <option value='Tuvalu'>Tuvalu</option>
                              <option value='Uganda'>Uganda</option>
                              <option value='United Kingdom'>
                                United Kingdom
                              </option>
                              <option value='Ukraine'>Ukraine</option>
                              <option value='United Arab Erimates'>
                                United Arab Emirates
                              </option>
                              <option value='United States of America'>
                                United States of America
                              </option>
                              <option value='Uraguay'>Uruguay</option>
                              <option value='Uzbekistan'>Uzbekistan</option>
                              <option value='Vanuatu'>Vanuatu</option>
                              <option value='Vatican City State'>
                                Vatican City State
                              </option>
                              <option value='Venezuela'>Venezuela</option>
                              <option value='Vietnam'>Vietnam</option>
                              <option value='Virgin Islands (Brit)'>
                                Virgin Islands (Brit)
                              </option>
                              <option value='Virgin Islands (USA)'>
                                Virgin Islands (USA)
                              </option>
                              <option value='Wake Island'>Wake Island</option>
                              <option value='Wallis & Futana Is'>
                                Wallis & Futana Is
                              </option>
                              <option value='Yemen'>Yemen</option>
                              <option value='Zaire'>Zaire</option>
                              <option value='Zambia'>Zambia</option>
                              <option value='Zimbabwe'>Zimbabwe</option>
                            </select>
                            <br />
                            {formData.country.toLowerCase() === 'india' ? (
                              <>
                                <select
                                  required={true}
                                  style={{ marginTop: '1rem' }}
                                  value={formData.state}
                                  name='state'
                                  onChange={handleChange}
                                  // type="select"
                                  className='inputs'
                                  placeholder='State'
                                >
                                  <option value='Andhra Pradesh'>
                                    Andhra Pradesh
                                  </option>
                                  <option value='Andaman and Nicobar Islands'>
                                    Andaman and Nicobar Islands
                                  </option>
                                  <option value='Arunachal Pradesh'>
                                    Arunachal Pradesh
                                  </option>
                                  <option value='Assam'>Assam</option>
                                  <option value='Bihar'>Bihar</option>
                                  <option value='Chandigarh'>Chandigarh</option>
                                  <option value='Chhattisgarh'>
                                    Chhattisgarh
                                  </option>
                                  <option value='Dadar and Nagar Haveli'>
                                    Dadar and Nagar Haveli
                                  </option>
                                  <option value='Daman and Diu'>
                                    Daman and Diu
                                  </option>
                                  <option value='Delhi'>Delhi</option>
                                  <option value='Lakshadweep'>
                                    Lakshadweep
                                  </option>
                                  <option value='Puducherry'>Puducherry</option>
                                  <option value='Goa'>Goa</option>
                                  <option value='Gujarat'>Gujarat</option>
                                  <option value='Haryana'>Haryana</option>
                                  <option value='Himachal Pradesh'>
                                    Himachal Pradesh
                                  </option>
                                  <option value='Jammu and Kashmir'>
                                    Jammu and Kashmir
                                  </option>
                                  <option value='Jharkhand'>Jharkhand</option>
                                  <option value='Karnataka'>Karnataka</option>
                                  <option value='Kerala'>Kerala</option>
                                  <option value='Madhya Pradesh'>
                                    Madhya Pradesh
                                  </option>
                                  <option value='Maharashtra'>
                                    Maharashtra
                                  </option>
                                  <option value='Manipur'>Manipur</option>
                                  <option value='Meghalaya'>Meghalaya</option>
                                  <option value='Mizoram'>Mizoram</option>
                                  <option value='Nagaland'>Nagaland</option>
                                  <option value='Odisha'>Odisha</option>
                                  <option value='Punjab'>Punjab</option>
                                  <option value='Rajasthan'>Rajasthan</option>
                                  <option value='Sikkim'>Sikkim</option>
                                  <option value='Tamil Nadu'>Tamil Nadu</option>
                                  <option value='Telangana'>Telangana</option>
                                  <option value='Tripura'>Tripura</option>
                                  <option value='Uttar Pradesh'>
                                    Uttar Pradesh
                                  </option>
                                  <option value='Uttarakhand'>
                                    Uttarakhand
                                  </option>
                                  <option value='West Bengal'>
                                    West Bengal
                                  </option>
                                </select>
                              </>
                            ) : (
                              <>
                                {' '}
                                <Input
                                  onChange={handleChange}
                                  className='inputs'
                                  type='text'
                                  placeholder='State'
                                  name='state'
                                  value={formData.state}
                                  required={true}
                                />
                              </>
                            )}

                            <br />

                            <h2
                              className='admin-login'
                              style={{ color: 'black', marginTop: '1rem' }}
                            >
                              Refund Details
                            </h2>
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              type='text'
                              placeholder='Account Holder Name'
                              name='account_holder_name'
                              value={formData.account_holder_name}
                            />

                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              type='number'
                              placeholder='Account Number'
                              name='account_number'
                              value={formData.account_number}
                            />

                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              type='text'
                              placeholder='Bank Name'
                              name='bank_name'
                              value={formData.bank_name}
                            />

                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              type='text'
                              placeholder='Bank Branch Name'
                              name='branch_name'
                              value={formData.branch_name}
                            />

                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              type='text'
                              placeholder='Bank Address'
                              name='bank_address'
                              value={formData.bank_address}
                            />

                            <br />
                            <Input
                              required={true}
                              onChange={handleChange}
                              className='inputs'
                              type='text'
                              placeholder='IFSC Code'
                              name='ifsc_code'
                              value={formData.ifsc_code}
                            />

                            <br />
                            <InputGroup>
                              <Input
                                name='aadhar_front_picture'
                                value={formData.aadhar_front_picture}
                                onChange={handleChange}
                                className='inputs-2'
                                placeholder='aadhar front picture'
                                readOnly
                                required={true}
                              />

                              <InputGroupAddon addonType='append'>
                                <InputGroupText>
                                  <Button
                                    onClick={() =>
                                      openCloudWidget('aadhar_front_picture')
                                    }
                                  >
                                    Select
                                  </Button>
                                </InputGroupText>
                              </InputGroupAddon>
                              <p style={{ color: 'red' }}>
                                *Max size 1.5mb is allowed *jpg file only
                              </p>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <Input
                                name='aadhar_back_picture'
                                value={formData.aadhar_back_picture}
                                onChange={handleChange}
                                className='inputs-2'
                                placeholder='aadhar back picture'
                                readOnly
                                required={true}
                              />

                              <InputGroupAddon addonType='append'>
                                <InputGroupText>
                                  <Button
                                    onClick={() =>
                                      openCloudWidget('aadhar_back_picture')
                                    }
                                  >
                                    Select
                                  </Button>
                                </InputGroupText>
                              </InputGroupAddon>
                              <p style={{ color: 'red' }}>
                                *Max size 1.5mb is allowed *jpg file only
                              </p>
                            </InputGroup>
                            <br />
                            <InputGroup>
                              <Input
                                name='cancel_check'
                                value={formData.cancel_check}
                                onChange={handleChange}
                                className='inputs-2'
                                placeholder='Cancel Cheque or Passbook picture'
                                readOnly
                                required={true}
                              />

                              <InputGroupAddon addonType='append'>
                                <InputGroupText>
                                  <Button
                                    onClick={() =>
                                      openCloudWidget('cancel_check')
                                    }
                                  >
                                    Select
                                  </Button>
                                </InputGroupText>
                              </InputGroupAddon>
                              <p style={{ color: 'red' }}>
                                *Max size 1.5mb is allowed *jpg file only
                              </p>
                            </InputGroup>
                            <br />
                            <br />
                            <Button
                              disabled={user.country}
                              type='submit'
                              color='success'
                              // block
                            >
                              Save Details
                            </Button>
                          </FormGroup>
                        </Form>
                      </>
                    ) : (
                      <>
                        <h2 className='admin-login' style={{ color: 'black' }}>
                          Communication & Refund Details
                        </h2>
                        <div className='row row-content'>
                          <div className='col-12'>
                            <Table>
                              <thead>
                                <tr>
                                  <th>Field</th>
                                  <th>Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {newRows.slice(12).map((row, i) => {
                                  const data = row.split(':');

                                  return (
                                    <tr key={i}>
                                      <th scope='row'>
                                        {data[0]
                                          .replace(/_/g, ' ')
                                          .toUpperCase()}
                                      </th>
                                      <td>{data[1]}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                            <Button
                              color='success'
                              // block
                            >
                              <Link
                                to={EDIT_DETAILS}
                                style={{
                                  textDecoration: 'none',
                                  color: 'white',
                                }}
                              >
                                Edit Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
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

export default StudentDashboard;
