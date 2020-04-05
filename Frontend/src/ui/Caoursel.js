import React from "react"

import '../App.css';
import { Carousel } from "react-bootstrap"
import BackgroundImg3 from "../ui/travel.jpg"
import backimg4 from "../ui/bookjourney.png"
import img5 from "./taxi.jpg"


class CarouselRender extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }


  render(){
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              width="1300" height="720"
              src={BackgroundImg3}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3><b>You take care of your bags, We will take care of you :-)</b></h3>
  
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
  
              width="1300" height="720"
              src={BackgroundImg3}
              alt="Second slide"
            />
  
            <Carousel.Caption>
              <h3 style={{ color: "black" }}><b>Come stroll the earth with us.</b></h3>
  
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
  
              width="1300" height="720"
              src={backimg4}
              alt="Third slide"
            />
  
            <Carousel.Caption>
              <h3 style={{ color: "black" }}><b>We will help you book tickets to your destination.</b></h3>
  
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
  
              width="1300" height="750"
              src={img5}
              alt="Fourth slide"
            />
  
            <Carousel.Caption>
              <h3 style={{ color: "white" }}><b>We will provide commute facilities from source and destination.</b></h3>
  
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )

  }
}


export default CarouselRender;