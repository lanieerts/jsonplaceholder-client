import React from 'react';
import { Link } from 'react-router';
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
      },
      sidebar: {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        bottom: 0,
        transition: 'transform .3s ease-out',
        WebkitTransition: '-webkit-transform .3s ease-out',
        willChange: 'transform',
        overflowY: 'hidden',
        marginRight: 50,
      },
      content: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        transition: 'left .3s ease-out, right .3s ease-out',
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
        transition: 'opacity .3s ease-out',
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
          TESTINGGGGGGGGGGGG
          {this.props.children}
        </Sidebar>
      </div>
    )
  }
}

export default About;
