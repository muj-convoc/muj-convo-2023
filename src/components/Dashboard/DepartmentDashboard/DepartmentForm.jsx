import React, { useState, useEffect } from 'react';
import { Card, Form, FormGroup, Input, Button, Table } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import Axios from 'axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  addDue,
  getAllDues,
  getStudentByRegNo,
  deleteDue,
} from '../../../slices/studentSlice';
import { setAlert } from '../../../slices/alertSlice';
import API from '../../../api/api';
import Loader from '../../Loader/Loader';

function DepartmentForm(props) {
  const [reg_no, setRegNo] = useState('');
  const [amount_due, setAmountDue] = useState('');
  const [details, setDetails] = useState('');
  // const [department, setDepartment] = useState("Library");
  const img = require('../../../assets/images/graduationNew.png');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const student = useSelector((state) => state.student.student);
  const {
    student: { student, allDues, addedDue, deletedDue, loading },
  } = useSelector((state) => {
    return {
      student: state.student,
    };
  }, shallowEqual);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addDue({
        reg_no: student.reg_no,
        amount_due,
        details,
        department: user.department,
      })
    );
    setAmountDue('');
    setDetails('');
  };

  useEffect(() => {
    if (student !== null) {
      dispatch(getAllDues(student.reg_no));
    }
  }, [addedDue, deletedDue]);
  // const disabledHandler =() => {
  //     return reg_no&&department&&details&&amount_due;
  // }

  const handleRegNoSubmit = (e) => {
    e.preventDefault();
    dispatch(getStudentByRegNo(reg_no));
    // if (student !== null) {
    dispatch(getAllDues(reg_no));

    setRegNo('');
    // }
  };
  if (loading) return <Loader />;
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
                <h1 style={{ textAlign: 'center' }}>
                  {user.department.toUpperCase()}
                </h1>
                <div
                  className='row '
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className='col-md-5 text-center d-none d-md-block'>
                    <img src={img} alt='admin-img' style={{ width: 300 }} /> 
                    {/* <h1>9th Convocation</h1>
                    <h2>2022</h2> */}
                    {student != null && (
                      <div style={{ marginTop: 20 }}>
                        <h5 style={{ color: 'CaptionText' }}>
                          Student Details
                        </h5>
                        <h6>{student.student_name}</h6>
                        <h6>{student.school}</h6>
                        <h6>{student.specialization}</h6>
                        <h6></h6>
                        <br />
                      </div>
                    )}
                  </div>
                  <div className='col-12 col-md-7 text-center'>
                    <h2
                      className='admin-login'
                      style={{ color: 'black', marginTop: '1rem' }}
                    >
                      Register/Clear Student Due
                    </h2>
                    <br />
                    <div className='row row-content'>
                      <div className='col-12'>
                        <Form onSubmit={handleRegNoSubmit}>
                          <FormGroup>
                            <Input
                              className='inputs'
                              type='number'
                              placeholder='Enter Student Registration Number'
                              name='reg_no'
                              onChange={(event) => setRegNo(event.target.value)}
                            />
                            <br />
                            <Button type='submit' style={{ marginBottom: 10 }}>
                              Search Student
                            </Button>
                          </FormGroup>
                        </Form>
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            {student && (
                              <>
                                <Input
                                  className='inputs'
                                  type='text'
                                  placeholder='Enter Student Due Amount'
                                  name='amount_due'
                                  onChange={(event) => {
                                    setAmountDue(event.target.value);
                                  }}
                                />
                                <br />
                                <textarea
                                  className='inputs'
                                  placeholder='Enter Student Due Details'
                                  name='details'
                                  onChange={(event) => {
                                    setDetails(event.target.value);
                                  }}
                                />
                                <br />
                                <Button
                                  type='submit'
                                  color='success success-btn'
                                  block
                                >
                                  REGISTER STUDENT DUE
                                </Button>
                              </>
                            )}
                          </FormGroup>
                        </Form>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-md-12 text-center'>
                    <h1 className='admin-login'>All Dues</h1>
                    <br />
                    <div className='row row-content'>
                      <div className='col-12'>
                        <Table>
                          <thead>
                            <tr>
                              <th>Amount</th>
                              <th>Details</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allDues !== null &&
                              student !== null &&
                              allDues.length > 0 &&
                              allDues[0].reg_no === student.reg_no &&
                              allDues[0].department === user.department &&
                              allDues.map((due) => {
                                return (
                                  <tr key={due._id}>
                                    <th scope='row'>{due.amount_due}</th>
                                    <td>{due.details}</td>
                                    <td>
                                      {!due.is_clear ? (
                                        <Button
                                          onClick={() =>
                                            dispatch(deleteDue(due._id))
                                          }
                                        >
                                          Clear Due
                                        </Button>
                                      ) : (
                                        <span style={{ color: 'green' }}>
                                          Cleared
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
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

export default DepartmentForm;
