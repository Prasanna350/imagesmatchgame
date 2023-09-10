import './index.css'

const ThumbnailItem = props => {
  const {thumbnailObj, checkAnswerFun} = props
  const {thumbnailUrl, imageUrl} = thumbnailObj

  const onCheckAnswer = () => {
    checkAnswerFun(imageUrl)
  }

  return (
    <li className="thumbnail-list-item">
      <button type="button" onClick={onCheckAnswer}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img-ele" />
      </button>
    </li>
  )
}

export default ThumbnailItem
