import React, { Component } from "react";

import "./Styles/LoadingSpinner.css";

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="ball ball-1" />
        <div className="ball ball-2" />
        <div className="ball ball-3" />
        <div className="ball ball-4" />
      </div>
    );
  }
}
