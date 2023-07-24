import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from '@material-ui/core';
import { FadeTransform } from 'react-animation-components';
import EnhancedFeedbackForm from './EnhancedFeedbackForm';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { getQuestions } from '../../../slices/feedbackSlice';
import { useHistory } from 'react-router-dom';

const Feedback = (props) => {
  const {
    feedback: { feedbackArray, loading },
  } = useSelector((state) => {
    return {
      feedback: state.feedback,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  if (feedbackArray === null || loading) return <Loader />;
  return (
    <div className='container'>
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5)',
        }}
      >
        <Card
          style={{
            padding: '1rem',
            margin: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8.5px)',
            borderRadius: '20px',
          }}
          elevation={3}
        >
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            // direction='column'
          >
            <Grid
              item
              xs={12}
              md={8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                margin: '1rem',
              }}
            >
              <EnhancedFeedbackForm history={history} />
            </Grid>
          </Grid>
        </Card>
      </FadeTransform>
    </div>
  );
};

Feedback.propTypes = {};

export default Feedback;
