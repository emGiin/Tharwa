import React, { Component } from "react";

class RoundedImage extends Component{
  
  
  
  render(){
    const style={
    borderRadius: "50%",
    height: this.props.height,
  };
    return(
      <img style={style} src={this.props.uri} alt=''/>
    );
  };
}

export default RoundedImage;