import React from 'react';
import {
  TextField,
  FormLabel,
  RadioGroup,
  Radio as MuiRadio,
  FormControlLabel,
  Button,
  withStyles,
} from '@material-ui/core';
// @material-ui/icons components
import { Field, FieldArray, Form } from 'formik';
import { shallowEqual, useSelector } from 'react-redux';

const Radio = withStyles({
  root: {
    color: '#e81',
    '&$checked': {
      color: '#e81',
    },
  },
  checked: {},
})((props) => <MuiRadio color='default' {...props} />);

const FeedbackForm = (props) => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;
  const {
    feedback: { loading },
  } = useSelector((state) => {
    return {
      feedback: state.feedback,
    };
  }, shallowEqual);
  return (
    <>
      <Form>
        <h2 style={{ textAlign: 'center' }}>Feedback Form</h2>

        <FieldArray
          name='details'
          render={(arrayHelpers) => {
            const questions = values.details;
            return (
              <div>
                {questions && questions.length > 0
                  ? questions.map((ques, index) => (
                      <div key={index}>
                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                          {index + 1}
                          {'. '}
                          {ques.ques}
                        </p>
                        <Field name={`details.${index}.ans`}>
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              {ques.type === 'radio' ? (
                                <>
                                  <FormLabel component='legend'>
                                    Answer
                                  </FormLabel>
                                  <RadioGroup
                                    aria-label='gender'
                                    style={{ flexDirection: 'row' }}
                                    {...field}
                                  >
                                    {ques.enum.map((opt, i) => (
                                      <FormControlLabel
                                        key={i}
                                        value={opt}
                                        control={<Radio />}
                                        label={opt}
                                      />
                                    ))}
                                  </RadioGroup>{' '}
                                </>
                              ) : (
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  type={ques.type}
                                  placeholder='Answer'
                                  {...field}
                                  error={meta.error && meta.touched}
                                  helperText={
                                    meta.touched && meta.error && meta.error
                                  }
                                  InputProps={{
                                    readOnly: ques.notEditable ?? false,
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </Field>

                        <br />
                      </div>
                    ))
                  : null}

                <br />
                <div>
                  <Button
                    style={{
                      backgroundColor: '#e81',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                    variant='contained'
                    fullWidth
                    type='submit'
                  >
                    <span style={{ fontSize: '1.1rem' }}>
                      {loading ? 'Loading...' : 'Submit'}
                    </span>
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </Form>
    </>
  );
};

export default FeedbackForm;
