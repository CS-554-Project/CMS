/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Wed Dec 13 2017
 *  File : YouTubeVideoEmbedded.js
 *******************************************/
import React, { Component } from "react";
import YouTube from "react-youtube";

class YouTubeVideoEmbedded extends Component {
  render() {
    let opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <div className="row">
        <div className="col-md-2">
          <h5>{this.props.data.label}</h5>
        </div>
        <div className="col-md-10">
          <YouTube
            videoId={this.props.data.value}
            opts={opts}
            onReady={this._onReady}
          />
        </div>
      </div>
    );
  }
}

export default YouTubeVideoEmbedded;
