import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { readInitialAlbums, readMoreAlbums } from './../../actions';

import { AlbumItem } from './../../components';
import { DEFAULT_ALBUM_LIMIT } from './../../actions';

class Albums extends React.Component {
  static defaultProps = {
    initialized: false,
    _limit: DEFAULT_ALBUM_LIMIT
  };

  static propTypes = {
    albums: React.PropTypes.array,
    initialized: React.PropTypes.bool.isRequired,
    _start: React.PropTypes.number,
    _end: React.PropTypes.number,
    _limit: React.PropTypes.number.isRequired
  };

  state = {
    initialized: this.props.initialized,
    _limit: this.props._limit,
    loading: false
  };

  componentWillMount() {
    if(this.props.initialized) return;
    this.props.readInitialAlbums();
  };

  onReadMoreAlbums = (query) => {
    this.setState({loading: true});
    this.props.readMoreAlbums(query)
      .then(() => this.setState({loading: false}));
  };

  render() {
    const progress = (<CircularProgress style={{textAlign:`center`, width:`100%`}} />);
    if(!this.props.initialized) return (progress);
    return (
      <div>
        <Row style={{ marginBottom: `20px` }}>
          <Col md={2}>
            <Link to={`/`}>
              <RaisedButton label="BACK" fullWidth={true} primary={true} />
            </Link>
          </Col>
          <Col md={8}>
            <div className="text-title"> {window.location.pathname} </div>
          </Col>
          <Col md={2} />
        </Row>

        <Row>
        { this.props.albums.map((album) =>
          <Link to={`/albums/${album.id}`} key={album.id} >
            <Col md={3}>
              <AlbumItem {...album} />
            </Col>
          </Link>
        )}
        </Row>

        {(this.state.loading) ? progress :
          <RaisedButton label="MORE ALBUMS" fullWidth={true} primary={true} onClick={() => this.onReadMoreAlbums({'_start': this.props._end})} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    albums: state.album.list,
    initialized: state.album.initialized,
    _start: state.album._start,
    _end: state.album._end
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readInitialAlbums, readMoreAlbums }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
