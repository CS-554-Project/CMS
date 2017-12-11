import React, { Component } from "react";
//import YouTube from "react-youtube";

class YouTube extends Component {

  // _onReady(e) {
  //   // access to player in all event handlers via event.target
  //   e.target.pauseVideo();
  // }

  // render() {
  //   const opts = {
  //     height: "390",
  //     width: "640",
  //     playerVars: {
  //       // https://developers.google.com/youtube/player_parameters
  //       autoplay: 1
  //     }
  //   };
  //   return (
  //     <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
  //   );
  // }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{this.props.data.label}</label>
        <div className="col-sm-10">
          <input type="text" id={this.props.data.label} className="form-control" placeholder="YouTube URL" onChange={this.props.handleInputChange} />
        </div>
      </div>
    );
  }
}

export default YouTube;
