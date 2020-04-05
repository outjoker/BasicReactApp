import React from "react"
import BackgroundImg from "../travel.jpg"

class Landing extends React.Component{
  constructor(){
    super()
    this.state = {

    }
  }


  render(){
    return(
      <div style={{backgroundImage:`url(${BackgroundImg})`}}>

      </div>
    )
  }


}


export default Landing;