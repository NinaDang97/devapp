import React, { Component } from "react";
import { Header, Button, Form, Input } from "semantic-ui-react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Error from "../Error";
import { signUpUser } from "../../action/authAction";

class Signup extends Component {
	state = {
		errors: {}
	};

	componentDidMount() {
		if (this.props.currentUser.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		const { name, email, password } = this.state;
		const newUser = {
			name,
			email,
			password
		};

		this.props.signUpUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="form">
				<Header as="h2" className="header">
					Sign Up Form
					<Header.Subheader>
						Create your own account to get interacted with other members.
					</Header.Subheader>
				</Header>
				<Form>
					<Form.Field>
						<label>Name</label>
						<Input
							type="text"
							name="name"
							onChange={this.handleChange}
							placeholder="Name"
						/>
						{errors.name ? <Error error={errors.name} /> : null}
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<Input
							type="text"
							name="email"
							onChange={this.handleChange}
							placeholder="Email"
						/>
						{errors.email ? <Error error={errors.email} /> : null}
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<Input
							type="password"
							name="password"
							onChange={this.handleChange}
							placeholder="Password"
						/>
						{errors.password ? <Error error={errors.password} /> : null}
					</Form.Field>

					<Button type="submit" onClick={this.handleSubmit}>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

Signup.propTypes = {
	signUpUser: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		errors: state.error,
		currentUser: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ signUpUser }
)(Signup);
