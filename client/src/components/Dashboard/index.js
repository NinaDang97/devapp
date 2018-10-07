import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Divider, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { getCurrentProfile, deleteAccount } from "../../action/profileAction";
import { connect } from "react-redux";

import Loader from "../Loading";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const { profile, loading } = this.props.profile;
		const { currentUser } = this.props.currentUser;
		let dashboardContent;

		if (profile === null || loading) {
			dashboardContent = <Loader />;
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<ProfileActions handle={profile.handle} />
						<Experience {...profile} />
						<Education {...profile} />
					</div>
				);
			} else {
				dashboardContent = (
					<Segment>
						<Link to="/create-profile">
							<Button floated="left" primary>
								Create Profile
							</Button>
						</Link>
						<Divider clearing />
						<h3>Welcome {currentUser.name}</h3>
						No profile setup yet
					</Segment>
				);
			}
		}
		return (
			<div>
				<Header className="myHeader" as="h1" icon>
					Dashboard
				</Header>
				{dashboardContent}

				<Button onClick={this.props.deleteAccount} inverted color="red">
					Delete Account
				</Button>
			</div>
		);
	}
}

Dashboard.propTypes = {
	currentUser: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		currentUser: state.auth,
		profile: state.profile
	};
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
