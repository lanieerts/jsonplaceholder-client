import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { readLanguages } from './../../actions';
import { Panel, Col, Row } from 'react-bootstrap';
import Sidebar from 'react-sidebar';
import Inspector from 'react-inspector';


class About extends React.Component {

  componentWillMount() {
    this.props.readLanguages();
  }

  render() {
    let sidebarStyle = {
      root: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      },
      sidebar: {
        zIndex: 0,
        position: 'absolute',
        top: 0,
        bottom: 0,
        transition: 'transform .3s ease-out',
        WebkitTransition: '-webkit-transform ease-out',
        willChange: 'transform',
        marginRight: 50,
        height: 500
      },
      content: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'left ease-out , right ease-out',
      },
      overlay: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity ease-out',
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      dragHandle: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
      }
    };

    return (
      <div>
        <Row>
          <h1> ABOUT PAGE </h1>
          <h2> USING LANGUAGES </h2>
          <Inspector data={this.props.languages} />
          { Object.keys(this.props.languages).map((language) =>
            <Col key={language} md={3}>
              <Panel bsStyle="danger" header={language}> {this.props.languages[language]} </Panel>
            </Col>
          )}
        </Row>
        <Sidebar sidebar={
          <div>
            <p> <Link to="/about/issues"> Issues </Link> </p>
            <p> <Link to="/about/pulls"> Full Request </Link> </p>
          </div>} docked={true} shadow={false} styles={sidebarStyle}>
          <Col md={10}>
            ↓CHILDREN CONTENT↓
          {this.props.children}
          </Col>
        </Sidebar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    languages: state.github.languages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readLanguages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
