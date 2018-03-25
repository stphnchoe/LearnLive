import React, { Component } from 'react';
import StreamWindow from './streamwindow';
import axios from 'axios';

import sampleUsers from '../../sampleData/users';

class Livestream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streaming: false,
      userRole: null
    }
  }

  componentWillMount() {
    this.checkRole();
  }

  startClass() {
    this.setState({ streaming: true });
  }

  endClass() {
    this.setState({ streaming: false });
  }

  checkRole() {
    axios.get(`/.netlify/functions/userRoles?user=${this.props.user}`)
      .then(response => {
        this.setState({userRole: response.data.role})
      });
  }

  viewerSwitch() {
    if (this.state.streaming === false) {
      if (this.state.userRole === 'publisher') {
        return <button onClick={this.startClass.bind(this)}>Start Class</button>
      } else {
        return <div>Sorry, class is currently not in session!</div>
      }
    } else if (this.state.streaming === true && this.state.userRole === 'subscriber') {
        return <button onClick={this.startClass.bind(this)}>Join Class</button>
    } else {
      return <StreamWindow
                user={ this.props.user }
                userRole={ this.state.userRole }
                endClass={ this.endClass.bind(this) }
              />
    }
  }

  render() {
    return (
      <div>
        {console.log(this.state.userRole)}
        { this.viewerSwitch() }
      </div>
    )
  }
}

export default Livestream;