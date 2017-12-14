/******************************************
 *  Author : Harsh Jagdishbhai Kevadia
 *  Created On : Fri Dec 08 2017
 *  File : DynamicComponentLoading.js
 *******************************************/
import React, { Component } from "react";

import Text from "./field_view/Text";
import WysiwygEditor from "./field_view/WysiwygEditor";
import Number from "./field_view/Number";
//import CheckBox from "./field_view/CheckBox";
import ImageView from "./field_view/ImageView";
import Link from "./field_view/Link";
import Download from "./field_view/Download";
import DateView from "./field_view/DateView";
import YouTubeVideoEmbedded from "./field_view/YouTubeVideoEmbedded";
//import ReferenceEntry from "./field_view/ReferenceEntry";

class DynamicComponentLoading extends Component {
  dynamicMagic(field) {
    switch (field.type) {
      case "small-text-input":
        return <Text data={field} />;
      case "number-input":
        return <Number data={field} />;
      //   case "checkbox":
      //     return <CheckBox data={field} />;
      case "text-area":
        return <Text data={field} />;
      case "image-uploader":
        return <ImageView data={field} />;
      case "link":
        return <Link data={field} />;
      case "wysiwyg-editor":
        return <WysiwygEditor data={field} />;
      case "datepicker":
        return <DateView data={field} />;
      case "embeddable-youtube":
        return <YouTubeVideoEmbedded data={field} />;
      case "file-uploader":
        return <Download data={field} />;
      // case "reference-entry":
      //   return <ReferenceEntry data={field} />;
      default:
        break;
    }
  }

  render() {
    let body = "";
    if (this.props.fields.length !== 0) {
      body = this.props.fields.map(field => {
        //console.log(field);
        return this.dynamicMagic(field);

        // <div>field.type</div>
        // <div>{field.lable}</div>
        // <div>{field.value}</div>
      });
      //body = { integratefields };
      //console.log(JSON.stringify(body));
    }
    return body;
  }
}

export default DynamicComponentLoading;
