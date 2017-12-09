/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : DynamicComponentLoading.js
 *******************************************/
import React, { Component } from "react";

import Text from "./field_view/Text";
import Number from "./field_view/Number";
//import CheckBox from "./field_view/CheckBox";
import ImageView from "./field_view/ImageView";
import Link from "./field_view/Link";
import DateDisplay from "./field_view/DateDisplay";
import YouTube from "./field_view/YouTube";

class DynamicComponentLoading extends Component {
  constructor(props) {
    super(props);
  }
  dynamicMagic(field) {
    switch (field.type) {
      case "small-text-input":
        return <Text data={field} />;
      case "number-input":
        return <Number data={field} />;
      // case "checkbox":
      // return (
      //     <CheckBox data={field} />
      // )
      case "text-area":
        return <Text data={field} />;
      case "image-uploader":
        return <ImageView data={field} />;
      case "link":
        return <Link data={field} />;
      // case "wysiwyg-editor":
      // return (
      //   <WysiwygEditor component={component} />
      // )
      case "datepicker":
        return <DateDisplay data={field} />;
      // case "embeddable-youtube":
      // return (
      //         <YouTube component={component} />
      // )
      default:
        break;
    }
  }

  render() {
    let body = "";
    if (this.props.fields.length !== 0) {
      const integratefields = this.props.fields.map(field => {
        return this.dynamicMagic(field);
      });
      body = { integratefields };
    }
    return body;
  }
}

export default DynamicComponentLoading;
