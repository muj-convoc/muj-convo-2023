// import React, { Suspense, lazy } from 'react';
import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/HeaderComponent';
// import HomePage from './components/HomeComponent';
import LoginForm from './components/LoginForm';
import Footer from './components/FooterComponent';
import Alert from './components/Alert/Alert';
import './App.css';
import RegisterForm from './components/RegisterForm';
import {
  DASHBOARD,
  DEPARTMENT_DASHBOARD,
  // HOME,
  LOGIN,
  CONTACT,
  REGISTER,
  STUDENT_DASHBOARD,
  // DEPARTMENT_FORM,
  ADMIN_DAHSBOARD,
  EDIT_DETAILS,
  FEEDBACK_FORM,
} from './constants/routes';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard/StudentDashboard';
// import DepartmentDashboard from './components/Dashboard/DepartmentDashboard/DepartmentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard/AdminDashboard';
import DepartmentForm from './components/Dashboard/DepartmentDashboard/DepartmentForm';
import Contact from './components/Contact';
import EditDetails from './components/Dashboard/StudentDashboard/EditDetails';
import Feedback from './components/Dashboard/Feedback/Feedback';

const Success = () => {
  return <h1>Payment Successful</h1>;
};
const Fail = () => {
  return <h1>Payment failed</h1>;
};
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Alert />

          <Header />
          <Switch>
            {/* <Route exact path={HOME}>
							<HomePage />
						</Route> */}
            <Route exact path={LOGIN}>
              <LoginForm />
              {/* <Feedback/> */}
            </Route>

            <Route exact path={CONTACT}>
              <Contact />
            </Route>
            <Route exact path={REGISTER}>
              <RegisterForm />
            </Route>
            <PrivateRoute exact path={DASHBOARD}>
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute exact path={FEEDBACK_FORM}>
              <Feedback />
            </PrivateRoute>
            <PrivateRoute exact path={LOGIN}>
              <Feedback />
            </PrivateRoute>
            <PrivateRoute exact path={STUDENT_DASHBOARD}>
              <StudentDashboard />
            </PrivateRoute>
            <PrivateRoute exact path={EDIT_DETAILS}>
              <EditDetails />
            </PrivateRoute>
            <PrivateRoute exact path={DEPARTMENT_DASHBOARD}>
              <DepartmentForm />
            </PrivateRoute>
            {/* <Route exact path={DEPARTMENT_FORM}></Route> */}
            <PrivateRoute exact path={ADMIN_DAHSBOARD}>
              <AdminDashboard />
            </PrivateRoute>
            <PrivateRoute exact path={'/success'}>
              <Success />
            </PrivateRoute>
            <PrivateRoute exact path={'/fail'}>
              <Fail />
            </PrivateRoute>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
