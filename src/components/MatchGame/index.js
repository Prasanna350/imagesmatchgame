import {Component} from 'react'
import './index.css'
import TabItem from '../TabItem/index'
import ThumbnailItem from '../ThumbnailItem/index'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList} = this.props
    this.state = {
      activeTabItem: tabsList[0].tabId,
      randomImage: this.createRandomImg(),
      isGameProgress: true,
      score: 0,
      time: 60,
      intervalId: null,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTheInterval()
  }

  startTimer = () => {
    this.timeId = setInterval(this.decrementTime, 1000)
    this.setState({intervalId: this.timeId})
  }

  clearTheInterval = () => {
    const {intervalId} = this.state
    if (intervalId) {
      clearInterval(intervalId)
      this.setState({intervalId: null})
    }
  }

  decrementTime = () => {
    this.setState(prevState => {
      if (prevState.time > 0) {
        return {
          time: prevState.time - 1,
        }
      }
      return this.EndGame()
    })
  }

  createRandomImg = () => {
    const {imagesList} = this.props
    const randomValue = Math.floor(Math.random() * imagesList.length)
    const newRandomImg = imagesList[randomValue].imageUrl
    return newRandomImg
  }

  ActivateTabFun = id => {
    this.setState({activeTabItem: id})
  }

  checkAnswerFun = clickedImg => {
    const {randomImage} = this.state
    const isRight = clickedImg === randomImage
    if (isRight) {
      const newRandomImg = this.createRandomImg()
      this.setState(prevState => ({
        randomImage: newRandomImg,
        score: prevState.score + 1,
      }))
    } else {
      this.EndGame()
    }
  }

  EndGame = () => {
    this.setState({isGameProgress: false})
    this.clearTheInterval()
  }

  onResetGame = () => {
    const {tabsList} = this.props
    this.setState({
      activeTabItem: tabsList[0].tabId,
      randomImage: this.createRandomImg(),
      isGameProgress: true,
      score: 0,
      time: 60,
    })
    this.startTimer()
  }

  MainGameCard = () => {
    const {tabsList, imagesList} = this.props
    const {activeTabItem, randomImage} = this.state
    const filteredList = imagesList.filter(
      eachObj => activeTabItem === eachObj.category,
    )
    return (
      <div className="main-game-card">
        <img src={randomImage} alt="match" className="random-image" />
        <ul className="tabs-items-container">
          {tabsList.map(tabsObj => (
            <TabItem
              tabsObj={tabsObj}
              key={tabsObj.tabId}
              isActive={activeTabItem === tabsObj.tabId}
              ActivateTabFun={this.ActivateTabFun}
            />
          ))}
        </ul>
        <ul className="thumbnail-items-container">
          {filteredList.map(thumbnailObj => (
            <ThumbnailItem
              thumbnailObj={thumbnailObj}
              key={thumbnailObj.id}
              checkAnswerFun={this.checkAnswerFun}
            />
          ))}
        </ul>
      </div>
    )
  }

  ScoreCard = () => {
    const {score} = this.state
    return (
      <div className="score-card-bg">
        <div className="div-in-score-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="trophy-image"
          />
          <p className="your-score-text">Your Score</p>
          <p className="score-card-score">{score}</p>
          <button
            type="button"
            className="play-again-btn"
            onClick={this.onResetGame}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
              className="reset-btn-image"
            />
            <p className="reset-btn-text">Play Again</p>
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {score, isGameProgress, time} = this.state
    return (
      <div>
        <nav className="navbar-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="app-logo"
          />
          <div className="navbar-description-div">
            <p className="navbar-score-para">
              Score: <span className="navbar-timer-para">{score}</span>
            </p>
            <div className="navbar-timer-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="navbar-timer-clock"
              />
              <p className="navbar-timer-para">{time} sec</p>
            </div>
          </div>
        </nav>
        <div className="bg-container">
          {isGameProgress ? this.MainGameCard() : this.ScoreCard()}
        </div>
      </div>
    )
  }
}

export default MatchGame
