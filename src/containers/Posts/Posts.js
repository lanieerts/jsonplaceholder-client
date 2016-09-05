import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import { Row, Col, Button, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { readInitialPosts, readMorePosts } from './../../actions';

import { PostItem } from './../../components';

class Posts extends React.Component {
  static defaultProps = {
    posts: {},
    initialized: false,
    _start: 0,
    _end: 0
  };

  static propTypes = {
    posts: React.PropTypes.array.isRequired,
    initialized: React.PropTypes.bool.isRequired,
    _start: React.PropTypes.number.isRequired,
    _end: React.PropTypes.number.isRequired,
  };

  componentWillMount() {
    if(this.props.initialized) return;
    this.props.readInitialPosts();
  };

  onReadMorePosts = (query) => this.props.readMorePosts(query);

  render() {
    return (
      <div>
        <Helmet title={`posts`} />

        <Row style={{ marginBottom: `20px` }}>
          <Col mdOffset={2} md={8}>
            <p className="text-center text-title"> {window.location.pathname} </p>
          </Col>
          <Col md={2}>
            <LinkContainer to={{pathname: '/posts/new'}}>
              <Button bsStyle="primary" style={{width: `100%`}}>WRITE POST</Button>
            </LinkContainer>
          </Col>
        </Row>

        <Row>
        { this.props.posts.map((post) =>
          <Link to={`/posts/${post.id}`} key={post.id} >
            <PostItem {...post} />
          </Link>
        )}
        </Row>

        <Row style={{ marginBottom: `20px` }}>
          <Col md={12}>
            <Button bsStyle="primary" block onClick={() => this.onReadMorePosts({'_start': this.props._end})}>
              MORE POSTS
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.post.list,
    initialized: state.post.initialized,
    _start: state.post._start,
    _end: state.post._end
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readInitialPosts, readMorePosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
