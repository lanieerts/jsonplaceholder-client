import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { readPost, updatePost } from './../../actions';

class PostEdit extends React.Component {
  static defaultProps = {
    post: {}
  }

  static propTypes = {
    post: React.PropTypes.object.isRequired
  };

  state = {
    disabled: false
  };

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.readPost(this.props.params.id);
  };

  onSubmit = (props) => {
    this.setState({ 'disabled' : true });
    props.userId = this.props.post.userId;
    this.props.updatePost(this.props.post.id, props).then(() => {
      this.context.router.push(`/posts/${this.props.post.id}`);
    });
  };

  render() {
    const { fields: { title, body }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h1>Post Edit Test Page</h1>
        <p> Please input title and body </p>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" type="text" {...title} />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea className="form-control" type="text" {...body} />
        </div>
        <Button bsStyle="primary" type="submit" disabled={this.state.disabled}>Submit</Button>
        <Link to="/posts">
          <Button bsStyle="danger">Cancel</Button>
        </Link>
      </form>
    )
  }
}

PostEdit = reduxForm({
  form: 'PostEditForm',
  fields: ['title', 'body']
}, null, { readPost, updatePost })(PostEdit);

function mapStateToProps(state) {
  return {
    initialValues: state.post.detail,
    post: state.post.detail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readPost, updatePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);


