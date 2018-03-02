import React, { Component } from "react";

import "./Styles/LoadingSpinner.css";

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div class="spinner">
        <div class="ball ball-1" />
        <div class="ball ball-2" />
        <div class="ball ball-3" />
        <div class="ball ball-4" />
      </div>
    );
  }
}
