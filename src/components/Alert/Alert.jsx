// import React from "react";
// import { useSelector, shallowEqual } from "react-redux";
// import { Alert, Fade } from "reactstrap";

// const MyAlert = () => {
// 	const { alerts } = useSelector((state) => {
// 		return {
// 			alerts: state.alert,
// 		};
// 	}, shallowEqual);

// 	return (
// 		alerts !== null &&
// 		alerts.length > 0 &&
// 		alerts.map((alert) => (
// 			<div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
// 				<Alert
// 					style={{ width: "50%" }}
// 					isOpen={alert.msg.length > 0 ? true : false}
// 					transition={Fade}
// 					color={alert.alertType}
// 				>
// 					{alert.msg}
// 				</Alert>
// 			</div>
// 		))
// 	);
// };

// export default MyAlert;

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core';
// import { Alert, AlertTitle } from '@material-ui/lab';
// import AlertStyles from '../../assets/jss/Alert/Alert';
// @material-ui/icons
import Check from '@material-ui/icons/Check';
import Warning from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '../Snackbar/SnackbarContent';

// const useStyles = makeStyles(AlertStyles);

const MyAlert = (props) => {
  const { alerts } = useSelector((state) => {
    return {
      alerts: state.alert,
    };
  }, shallowEqual);
  // const classes = useStyles();

  const getIcon = (alert) => {
    console.log(alert.alertType);

    switch (alert.alertType) {
      case 'success':
        return Check;
      case 'danger':
        return ErrorIcon;
      case 'error':
        return ErrorIcon;
      case 'info':
        return 'info_outline';
      case 'warning':
        return Warning;
      default:
        return 'info_outline';
    }
  };

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        <SnackbarContent
          // className={classes.root}
          key={alert.id}
          open={alert.msg.length > 0 ? true : false}
          message={
            <span>
              <b>{alert.msg}</b>
            </span>
          }
          close
          color={alert.alertType === 'error' ? 'danger' : alert.alertType}
          icon={getIcon(alert)}
        />
      );
    })
  );
};

export default MyAlert;
