import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";

import { getAllProfiles } from "../../action/profileAction";

import Loading from "../Loading";
import ProfileItem from "./ProfileItem";

class Developers extends Component {
	componentDidMount() {
		this.props.getAllProfiles();
	}

	render() {
		const { allProfiles, loading } = this.props.profile;
		let profileDisplay;

		if (allProfiles === null || loading) {
			profileDisplay = <Loading />;
		} else {
			if (allProfiles.length === 0) {
				profileDisplay = <h3>No Profiles Yet</h3>;
			} else {
				profileDisplay = allProfiles.map(profile => (
					<ProfileItem key={profile._id} {...profile} />
				));
			}
		}
		return (
			<div>
				<Header className="myHeader" as="h1" icon>
					All Developers
					<Header.Subheader>
						Browse and connect with other developers
					</Header.Subheader>
				</Header>
				<div className="developer-list">{profileDisplay}</div>
			</div>
		);
	}
}

Developers.propTypes = {
	profile: PropTypes.object.isRequired,
	getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

export default connect(
	mapStateToProps,
	{ getAllProfiles }
)(Developers);
