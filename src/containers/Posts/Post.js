import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router'

import { readPost, readComments, createComment, readMoreComments } from './../../actions';

import { PostDetail, Comment } from './../../components';

class Post extends React.Component {
  state = {
    disabled: false
  };

  componentWillMount() {
    this.props.readPost(this.props.params.id);
    this.props.readComments(this.props.params.id);
  };

  onSubmit = (props) => {
    this.setState({ 'disabled' : true });
    props.postId = this.props.params.id;
    this.props.createComment(props)
      .then(() => this.props.readMoreComments({'_start' : this.props.comments.length, 'postId' : this.props.params.id}))
      .then(() => this.setState({ 'disabled' : false }));
  };

  render() {
    return (
      <div>
        <Helmet title={`posts/${this.props.post.id}`} />

        <Row style={{ marginBottom: `20px` }}>
          <Col md={2}>
            <Link to={`/posts`}>
              <RaisedButton label="BACK" fullWidth={true} primary={true} />
            </Link>
          </Col>
          <Col md={2} />
          <Col md={4}>
            <div className="text-title"> {window.location.pathname} </div>
          </Col>
          <Col md={2}>
            <Link to={`/posts/${this.props.params.id}/edit`}>
              <RaisedButton label="EDIT POST" fullWidth={true} secondary={true} />
            </Link>
          </Col>
          <Col md={2}>
            <Link to={`/posts/new`}>
              <RaisedButton label="WRITE POST" fullWidth={true} primary={true} />
            </Link>
          </Col>
        </Row>

        <Card>
          <CardHeader title={window.location.pathname}/>
          <CardText>
            <PostDetail {...this.props.post} />
          </CardText>
        </Card>

        <Card>
          <CardHeader title={`${window.location.pathname}/comments`}/>
          { this.props.comments.map((comment) =>
            <Comment key={comment.id} {...comment} />
          )}
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.post.detail,
    comments: state.comment.list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readPost, readComments, readMoreComments, createComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
