import React, { Component } from "react";
import YouTubeModule from "react-youtube";

class YouTube extends Component {
  _onReady(e) {
    // access to player in all event handlers via event.target
    e.target.stopVideo();
  }

  render() {
    const opts = {
      height: "360",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">
          {this.props.data.label}
        </label>
        <div className="col-sm-10">
          <YouTubeModule
            videoId={this.props.data.value}
            opts={opts}
            onReady={this._onReady}
          />
        </div>
      </div>
    );
  }
}

export default YouTube;
