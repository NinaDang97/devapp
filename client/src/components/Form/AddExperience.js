import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Header,
	Button,
	Form,
	Input,
	Checkbox,
	TextArea
} from "semantic-ui-react";

import { connect } from "react-redux";

import Error from "../Error";
import { addExperience } from "../../action/profileAction";

class AddExperience extends Component {
	state = {
		current: false,
		disabled: false,
		errors: {}
	};

	componentDidUpdate(prevProps) {
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
		}
	}

	handleChange = (e, data) => {
		this.setState({
			[data.name]: data.value
		});
	};

	handleCheck = (e, data) => {
		if (data.checked) {
			this.setState({ current: true, disabled: true });
		} else {
			this.setState({ current: false, disabled: false });
		}
	};

	handleSubmit = e => {
		e.preventDefault();

		const newExp = {
			title: this.state.title,
			company: this.state.company,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addExperience(newExp, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="form form-profile">
				<Header as="h2" className="header">
					Add Experience
				</Header>
				<Form>
					<Form.Field>
						<label>Title*</label>
						<Input
							type="text"
							name="title"
							onChange={this.handleChange}
							placeholder="Title"
						/>
						{errors.title ? <Error error={errors.title} /> : null}
					</Form.Field>
					<Form.Field>
						<label>Company*</label>
						<Input
							type="text"
							name="company"
							onChange={this.handleChange}
							placeholder="Company"
						/>
						{errors.company ? <Error error={errors.company} /> : null}
					</Form.Field>
					<Form.Field>
						<label>Location</label>
						<Input
							type="text"
							name="location"
							onChange={this.handleChange}
							placeholder="Location"
						/>
					</Form.Field>
					<Form.Field>
						<label>From Date*</label>
						<Input
							type="date"
							name="from"
							onChange={this.handleChange}
							placeholder="MM/DD/YYYY"
						/>
						{errors.from ? <Error error={errors.from} /> : null}
					</Form.Field>
					<Form.Field>
						<label>To Date</label>
						<Input
							type="date"
							name="to"
							onChange={this.handleChange}
							disabled={this.state.disabled}
							placeholder="MM/DD/YYYY"
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							label="Current Job"
							name="current"
							onChange={this.handleCheck}
						/>
					</Form.Field>
					<Form.Field>
						<TextArea
							placeholder="Description"
							name="description"
							onChange={this.handleChange}
						/>
					</Form.Field>

					<Button type="submit" onClick={this.handleSubmit}>
						Add
					</Button>
				</Form>
			</div>
		);
	}
}

AddExperience.propTypes = {
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		errors: state.error
	};
};

export default connect(
	mapStateToProps,
	{ addExperience }
)(AddExperience);
