//  This file puts carousel of sliding images on log in page.

import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./style.css";

const content = [
  {
    title: "GoT Swag",
    description: "Love Game of Thrones. Need more Game of Thrones in your life. Get it here. ",
    image: "images/throne.jpg"

  },
  {
    title: "Got Swag",
    description: "Figurines, Gear, Games, Art, and so much more. ",
    image: "images/dragon.jpg"
  },
  {
    title: "Got Swag",
    description: "Sign in or Sign up to buy swag",
    image: "images/thrones1.jpg"

  }
];

//  maps through content object for each slider
const Slide = () => (
  <div>
    <Slider className="slider-wrapper" autoplay={3500}>
      {content.map((item, index) => (
        <div
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1 className="slider-title">{item.title}</h1>
            <p className="slider-p">{item.description}</p>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);

class DynamicSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [1, 2, 3], lastItem: 3 };
  }

  render() {
    return (
      <div className="slider-div">
        {this.state.items.join(", ")}
        <Slider className="slider-wrapper">
          {this.state.items.map(item => (
            <div key={item} style={{ "text-align": "center" }}>
              {item}
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Slide;
