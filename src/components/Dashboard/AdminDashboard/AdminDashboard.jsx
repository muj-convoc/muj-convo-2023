// import React, { Component } from 'react';
import React from 'react';
import { Card, Form, FormGroup, Input, Button } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { login } from '../../../slices/authSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DASHBOARD } from '../../../constants/routes';
import Loader from '../..//Loader/Loader';
import { register } from '../../../slices/authSlice';

function AdminDashboard() {
  const dispatch = useDispatch();
  const img = require('../../../assets/images/graduationNew.png');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    department: '',
    password: '',
    email: '',
    role: 'department',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(register(formData));
      setLoading(false);
      setFormData({
        department: '',
        password: '',
        email: '',
        role: 'department',
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

  return (
    <>
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
                <div
                  className='row'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className='col-md-5 text-center d-none d-md-block'>
                    <img src={img} alt='admin-img' style={{ width: 300 }} />
              
                  </div>
                  <div className='col-12 col-md-7 text-center'>
                    <h1 className='admin-login ' style={{ color: 'black' }}>
                      Register Department
                    </h1>
                    <br />
                    <div className='row row-content'>
                      <div className='col-12'>
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <select
                              // type="select"
                              style={{ marging: '1rem' }}
                              value={formData.department}
                              className='inputs'
                              name='department'
                              onChange={handleChange}
                            >
                              <option value='Select Department'>
                                Select Department
                              </option>
                              <option value='Library'>Library</option>
                              {/* <option value='AMS'>AMS</option> */}
                              <option value='Sports'>Sports</option>
                              <option value='IT Department'>
                                IT Department
                              </option>
                              <option value='Hostel'>Hostel</option>
                              <option value='Mess'>Mess</option>
                              <option value='Finance'>Finance</option>
                              <option value='In-charge Academics'>
                                Academics
                              </option>
                              {/* <option value="Department of Computer Science and Engineering">
																Department of Computer Science and Engineering
															</option>
															<option value="Department of Computer and Communication Engineering">
																Department of Computer and Communication Engineering
															</option>
															<option value="Department of Information Technology">
																Department of Information Technology
															</option>
															<option value="Department of Civil Engineering">
																Department of Civil Engineering
															</option>
															<option value="Department of Chemical Engineering">
																Department of Chemical Engineering
															</option>
															<option value="Department of Automobile Engineering">
																Department of Automobile Engineering
															</option>
															<option value="Department of Mechanical Engineering">
																Department of Mechanical Engineering
															</option>
															<option value="Department of Mechatronics Engineering">
																Department of Mechatronics Engineering
															</option>
															<option value="Department of Electrical Engineering">
																Department of Electrical Engineering
															</option>
															<option value="Department of Electronics and Communication Engineering">
																Department of Electronics and Communication Engineering
															</option>
															<option value="Department of Journalism and Mass Communication">
																Department of Journalism and Mass Communication
															</option>
															<option value="Department of Language">Department of Language</option>
															<option value="Department of Arts">Department of Arts</option>
															<option value="Department of Economics">
																Department of Economics
															</option>
															<option value="Department of Psychology">
																Department of Psychology
															</option>
															<option value="Department of Law">Department of Law</option>
															<option value="Department of Mathematics & Statistics">
																Department of Mathematics & Statistics
															</option>
															<option value="Department of Computer Application">
																Department of Computer Application
															</option>
															<option value="Department of Biosciences">
																Department of Biosciences
															</option>
															<option value="Department of Physics">Department of Physics</option>
															<option value="Department of Chemistry">
																Department of Chemistry
															</option>
															<option value="Department of Planning">Department of Planning</option>
															<option value="Department of Interior Design">
																Department of Interior Design
															</option>
															<option value="Department of Fine Arts">
																Department of Fine Arts
															</option>
															<option value="Department of Fashion Design">
																Department of Fashion Design
															</option>
															<option value="Department  of Architecture & Design">
																Department of Architecture & Design
															</option>
															<option value="Department of Hotel Management">
																Department of Hotel Management
															</option>
															<option value="Department of Business Administration">
																Department of Business Administration
															</option>
															<option value="Department of Commerce">Department of Commerce</option> */}
                            </select>
                            <br></br>
                            <br />
                            <Input
                              onChange={handleChange}
                              className='inputs'
                              type='text'
                              value={formData.email}
                              placeholder='Email'
                              name='email'
                            />

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

                            <Button type='submit' color='success success-btn'>
                              {loading ? 'Loading...' : 'Send Mail'}
                            </Button>
                          </FormGroup>
                        </Form>
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

export default AdminDashboard;
