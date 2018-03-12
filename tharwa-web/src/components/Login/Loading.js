import React, {Component}from 'react';

import LoadingSpinner from '../Reusable Components/LoadingSpinner';

class Loading extends Component{
  render(){
    return(
      <div className="loginForm">
        <LoadingSpinner/>
      </div>
    )
  }
}

export default Loading;
