import { withFormik } from 'formik';
import { connect } from 'react-redux';
// import AddVisitorRequestForm from './AddVisitorRequestForm';
// import { addVisitor } from 'slices/visitorSlice';
import { submitFeedback } from '../../../slices/feedbackSlice';
// import FeebackForm from './FeedbackForm';
import * as Yup from 'yup';
// import moment from 'moment';
import FeedbackForm from './FeedbackForm';

const EnhancedFeedbackForm = withFormik({
  mapPropsToValues: ({ user, feedback }) => ({
    student: user._id,
    details: feedback.map((f) => {
      return {
        ...f,
        ans: f.notEditable
          ? f.ques === 'Name'
            ? user.student_name
            : f.ques === 'Degree'
            ? user.programme
            : f.ques === 'Branch'
            ? user.programme
            : f.ques === 'Graduate Year'
            ? '2022'
            : ''
          : f.type === 'date'
          ? new Date().toISOString().slice(0, 10)
          : f.type === 'radio'
          ? f.enum[2]
          : '',
      };
    }),
  }),
  validationSchema: Yup.object().shape({
    student: Yup.string().required('Student ID is required!'),
    details: Yup.array().of(
      Yup.object().shape({
        ques: Yup.string().required('Question is required!'),
        ans: Yup.string().required('Answer is required!'),
        type: Yup.string().required('Answer Type is required!'),
        enum: Yup.array()
          .of(Yup.string().required('Enum string is required!'))
          .notRequired(),
        notEditable: Yup.bool().notRequired(),
      })
    ),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { submitFeedback, history } = props;
    submitFeedback(values, history);
    setSubmitting(false);
  },
  displayName: 'AddVisitorRequestForm',
})(FeedbackForm);

const mapStateToProps = (state) => ({
  user: state.auth.user,
  feedback: state.feedback.feedbackArray,
});

export default connect(mapStateToProps, { submitFeedback })(
  EnhancedFeedbackForm
);
