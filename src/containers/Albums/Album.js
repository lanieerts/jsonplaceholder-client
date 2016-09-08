import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { readInitialPhotos, readMorePhotos } from './../../actions';

import { PhotoItem } from './../../components';

class Album extends React.Component {
  static defaultProps = {
    photos: {},
    _start: 0,
    _end: 0,
  };

  static propTypes = {
    photos: React.PropTypes.array.isRequired,
    _start: React.PropTypes.number.isRequired,
    _end: React.PropTypes.number.isRequired,
  };

  state = {
    loading: false,
    initialized: false
  };

  componentWillMount() {
    this.props.readInitialPhotos({'albumId': this.props.params.id})
      .then(() => this.setState({initialized: true}));
  }

  onReadMorePhotos = (query) => {
    this.setState({loading: true});
    this.props.readMorePhotos(query)
      .then(() => this.setState({loading: false}));
  };

  render() {
    const progress = (<CircularProgress style={{textAlign:`center`, width:`100%`}} />);
    if(!this.state.initialized) return (progress);
    return (
      <div>
        <Row style={{ marginBottom: `20px` }}>
          <Col md={2}>
            <Link to={`/albums`}>
              <RaisedButton label="BACK" fullWidth={true} primary={true} />
            </Link>
          </Col>
          <Col md={8}>
            <div className="text-title"> {window.location.pathname} </div>
          </Col>
          <Col md={2} />
        </Row>

        <Row>
          { this.props.photos.map((photo) =>
            <Link to={`/photos/${photo.id}`} key={photo.id} >
              <Col md={3}>
                <PhotoItem {...photo} />
              </Col>
            </Link>
          )}
        </Row>

        {(this.state.loading) ? progress :
          <RaisedButton label="MORE PHOTOS" fullWidth={true} primary={true}
                        onClick={() => this.onReadMorePhotos({'albumId': this.props.params.id, '_start': this.props._end})} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photos: state.photo.list,
    _start: state.photo._start,
    _end: state.photo._end
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readInitialPhotos, readMorePhotos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
