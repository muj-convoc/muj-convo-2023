import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  ADMIN_DAHSBOARD,
  DEPARTMENT_DASHBOARD,
  FEEDBACK_FORM,
  STUDENT_DASHBOARD,
} from '../../constants/routes';
import Loader from '../Loader/Loader';

const Dashboard = (props) => {
  const {
    auth: { user },
  } = useSelector((state) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);

  if (user === null) return <Loader />;
  if (user.role === 'student' && user.feedbackGiven) {
    return <Redirect to={STUDENT_DASHBOARD} />;
  } else if (user.role === 'student' && !user.feedbackGiven)
    return <Redirect to={FEEDBACK_FORM} />;
  else if (user.role === 'department') {
    return <Redirect to={DEPARTMENT_DASHBOARD} />;
  } else if (user.role === 'admin') {
    return <Redirect to={ADMIN_DAHSBOARD} />;
  }
};

Dashboard.propTypes = {};

export default Dashboard;
