import React, { Component } from "react";
import {skills} from './data';

import "./App.css";

const createList = () => Array.from(skills);

const totalNumberOfCards = 9;
const min = 0;
const max = (totalNumberOfCards, numberOfDisplayedCards) =>
  -((totalNumberOfCards / numberOfDisplayedCards) * 990) + 330;

export default class App extends Component {
  state = {
    offset: 0,
    min,
    max: max(createList(totalNumberOfCards).length, 3)
  };

  moveCarousel = offset => {
    this.carousel.style.transform = `translateX(${offset}px)`;
  };

  handleCarouselMotion = distance => {
    this.setState(
      prevState => ({ offset: prevState.offset + distance }),
      () => {
        this.moveCarousel(this.state.offset);
      }
    );
  };

  handleClick = direction => {
    switch (direction) {
      case "left":
        if (Number(this.state.offset) === this.state.min) return;
        return this.handleCarouselMotion(330);
      case "right":
        if (Number(this.state.offset) === this.state.max) return;
        return this.handleCarouselMotion(-330);
      default:
        return;
    }
  };

  render() {
    return (
      <div className="skills">
        <div className="skills__wrapper">
          <ul className="skills__carousel" ref={value => (this.carousel = value)}>
            {createList(totalNumberOfCards).map(skill =>
              <li className="skills__content" key={skill.id}>
                <img className="skills__content-image" src={skill.image} alt={skill.alt}></img>
                <p className="skills__content-text">{skill.text}</p>
              </li>
            )}
          </ul>
          <div className="skills__button-wrapper">
            <button className="skills__button" onClick={() => this.handleClick("left")}><img className="skills__button-left" src="https://img.icons8.com/ios-filled/512/chevron-left.png"/></button>
            <button className="skills__button" onClick={() => this.handleClick("right")}><img className="skills__button-right" src="https://img.icons8.com/ios-filled/512/chevron-right.png"/></button>
          </div>
        </div>
      </div>
    );
  }
}
