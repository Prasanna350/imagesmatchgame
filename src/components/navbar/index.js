import {Component} from 'react'
import './index.css'

class NavBar extends Component {
  constructor(props) {
    super(props)
    const {time} = this.props
    this.state = {time}
  }

  

  
  stopFun = () => {
    const {EndGame} = this.props
    clearInterval(this.timeId)
    EndGame()
  }

  render() {
    const {time} = this.state
    const {score, isGameProgress} = this.props
    return (
      
    )
  }
}

export default NavBar
