import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Item, Button } from "semantic-ui-react";
import moment from "moment";

import { connect } from "react-redux";
import { getPost, deleteComment } from "../../action/postAction";

import Loading from "../Loading";
import CreateComment from "../Form/CreateComment";

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.postId);
	}

	render() {
		const { post, loading } = this.props.post;
		const { currentUser } = this.props.user;
		const { postId } = this.props.match.params;
		let postContent;

		if (post === null || Object.keys(post).length === 0 || loading) {
			postContent = <Loading />;
		} else {
			postContent = (
				<Item.Group>
					<Item>
						<Item.Image size="tiny" src={post.avatar} />
						<Item.Content>
							<Item.Header as="a">{post.name}</Item.Header>
							<Item.Description>{post.text}</Item.Description>
							<Item.Extra>{moment(post.date).fromNow()}</Item.Extra>
						</Item.Content>
					</Item>
					<CreateComment postId={postId} />

					{post.comments.map((comment, i) => (
						<Item key={i}>
							<Item.Image size="tiny" src={comment.avatar} />
							<Item.Content>
								<Item.Header as="a">{comment.name}</Item.Header>
								<Item.Description>{comment.text}</Item.Description>
								<Item.Extra>{moment(comment.date).fromNow()}</Item.Extra>
							</Item.Content>
							{currentUser._id === comment.author ? (
								<Button
									basic
									icon="delete"
									onClick={() => this.props.deleteComment(postId, comment._id)}
								/>
							) : null}
						</Item>
					))}
				</Item.Group>
			);
		}

		return (
			<Container text>
				<h1>POST</h1>
				{postContent}
			</Container>
		);
	}
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.post,
		user: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ getPost, deleteComment }
)(Post);
