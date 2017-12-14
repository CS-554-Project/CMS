/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : ImageView.js
 *******************************************/
import React, { Component } from "react";

class ImageView extends Component {
  render() {
    let index = 0;
    let imageIndex = 0;
    let indicators = this.props.data.value.map(image => {
      if (index === 0) {
        return (
          <li data-target="#imageCarousel" data-slide-to="0" class="active" />
        );
      } else {
        return <li data-target="#imageCarousel" data-slide-to={index} />;
      }
      index++;
    });
    let images = this.props.data.value.map(image => {
      let body = null;
      let imageSrc = "%PUBLIC_URL%/images/" + image;
      if (imageIndex === 0) {
        body = (
          <div className="carousel-item active">
            <img className="d-block img-fluid" src={imageSrc} alt={image} />
          </div>
        );
      } else {
        body = (
          <div className="carousel-item">
            <img className="d-block img-fluid" src={imageSrc} alt={image} />
          </div>
        );
      }
      imageIndex++;
      return body;
    });
    return (
      <div className="row">
        <div className="col-md-2">{this.props.data.label}</div>
        <div className="col-md-10">
          <div id="imageCarousel" class="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">{indicators}</ol>
            <div className="carousel-inner" role="listbox">
              {images}
            </div>
            <a
              className="carousel-control-prev"
              href="#imageCarousel"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#imageCarousel"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageView;
