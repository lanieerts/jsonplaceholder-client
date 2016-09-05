import React from 'react';
import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import Sidebar from 'react-sidebar';


class About extends React.Component {
  render() {
    let sidebarStyle = {
      root: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        height: window.innerHeight
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
        <h1 className="text-center"> ABOUT PAGE </h1>
        <Sidebar sidebar={<b> <Link to="/about/issues"> Sidebar Content </Link> </b>}
                 docked={true} shadow={false} styles={sidebarStyle}>
          <Col md={10}>
          TESTINGGGGGGGGGGGGGGG
          {this.props.children}
          </Col>
        </Sidebar>
      </div>
    )
  }
}

export default About;
