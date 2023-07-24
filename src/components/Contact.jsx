// import React, { Component } from 'react';
import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardTitle, CardText, Button } from 'reactstrap';
import { Card, CardTitle, CardText } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
// import { LOGIN, REGISTER } from '../constants/routes';
// import { useEffect } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
// import { AiTwotonePhone } from 'react-icons/ai';

function Contact() {
  return (
    <>
      <div className='container'>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5)',
          }}
        >
          <div className='row row-content align-items-center'>
            <div className='col-12 '>
              <Card body inverse className='card-home'>
                <CardTitle>
                  <h2 className='welcome-msg' style={{ color: '#000' }}>
                    Contact
                  </h2>
                </CardTitle>
                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Email-ID related issues: IT Infra
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:it.support@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      it.support@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText>

                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Library Dues: Mr Om Prakash Verma (9828543435)
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:omprakash.verma@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      omprakash.verma@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText>

                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Finance Dues: Ms Deepthi Rajeev
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:deepthi.rajeev@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      deepthi.rajeev@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText>

                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Mess Dues: 
                </p>
                <CardText style={{ padding: '10px' }}>
                <p>Will be Updated Soon</p>

                  {/* <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:monika.agrawal@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      monika.agrawal@jaipur.manipal.edu
                    </a>
                  </span> */}
                  <br></br>
                </CardText>

                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Hostel Dues: Mr. Ashish Dosaya (9413749923 / 8976751015)
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:ashish.dosaya@goodhostspaces.com'
                      style={{ color: '#000' }}
                    >
                      ashish.dosaya@goodhostspaces.com
                    </a>
                  </span>
                  <br></br>
                </CardText>

                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For AMS/Academics Dues: Dr. Kusum Lata Jain (9828133885)
                </p>
                <CardText style={{ padding: '10px' }}>
                  {/* <p>Will be Updated Soon</p> */}
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:yunus.aslam@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      kusumlata.jain@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText>

                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Sports Dues: Mr. Sanjeev Sharma (9993308598)
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:sanjeev.sharma@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      sanjeev.sharma@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText>
                <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Exam cell related queries: Mr. Bijendra Singh
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:sanjeev.sharma@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      office.controller@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText>

                {/* <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Medicare Dues: Mr. Ravi Yadav
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:ravi.yadav@manipalglobal.com'
                      style={{ color: '#000' }}
                    >
                      ravi.yadav@manipalglobal.com
                    </a>
                  </span>
                  <br></br>
                </CardText> */}
                {/* <p
                  style={{
                    fontSize: '20px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid white',
                    color: 'black',
                  }}
                >
                  For Registration related Technical issues: Mr Ankit Mundra
                </p>
                <CardText style={{ padding: '10px' }}>
                  <span style={{ color: '#000' }}>
                    <HiOutlineMail /> Email:{' '}
                    <a
                      href='mailto:ankit.mundra@jaipur.manipal.edu'
                      style={{ color: '#000' }}
                    >
                      ankit.mundra@jaipur.manipal.edu
                    </a>
                  </span>
                  <br></br>
                </CardText> */}
              </Card>
            </div>
          </div>
        </FadeTransform>
      </div>
    </>
  );
}

export default Contact;
