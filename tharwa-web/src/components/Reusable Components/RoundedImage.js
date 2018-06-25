import React, { Component } from "react";

class RoundedImage extends Component {
  render() {
    const style = {
      borderRadius: "50%",
      height: this.props.height,
      maxHeight: this.props.height,
      width: this.props.height,
      maxWidth: this.props.height
    };
    return <img style={style} src={this.props.uri} alt="circular" />;
  }
}

export default RoundedImage;
