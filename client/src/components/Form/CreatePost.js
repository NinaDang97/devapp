import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Form, Button, Header } from "semantic-ui-react";

import { connect } from "react-redux";
import { createPost } from "../../action/postAction";

import Error from "../Error";

class CreatePost extends Component {
	state = {
		errors: {},
		text: ""
	};

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

	submitPost = e => {
		e.preventDefault();

		const { currentUser } = this.props.user;

		const newPost = {
			text: this.state.text,
			name: currentUser.name,
			avatar: currentUser.avatar
		};
		this.props.createPost(newPost);
		this.setState({ text: "" });
	};

	render() {
		const { errors } = this.state;
		return (
			<Segment inverted>
				<Form inverted>
					<Header color="teal" as="h2">
						Post questions on our group
					</Header>
					<Form.TextArea
						name="text"
						autoHeight
						placeholder="Post limit between 10 and 300 characters"
						onChange={this.handleChange}
					/>
					{errors.text ? <Error error={errors.text} /> : null}
					<Button type="submit" color="blue" onClick={this.submitPost}>
						Post
					</Button>
				</Form>
			</Segment>
		);
	}
}

CreatePost.propTypes = {
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		user: state.auth,
		errors: state.error
	};
};

export default connect(
	mapStateToProps,
	{ createPost }
)(CreatePost);
