import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SignUpForm from '../../components/SignUpForm/SignUpForm';
import {signUpRequest} from '../../AuthActions';


class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
  /*  const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password); */
    const name = this.state.user.name;
      const email = this.state.user.email;
      const password = this.state.user.password;


    const formData = {
      name: name,
      email: email,
      password: password
    };

    this.props.dispatch(signUpRequest(formData));

      //localStorage.setItem('successMessage', xhr.response.message);
        this.context.router.replace('/login');

    }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {};
}

SignUpPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(SignUpPage);
