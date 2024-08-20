// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {
    uid,
    userName,
    userComment,
    date,
    isLiked,
    className,
    onClickDelete,
    onClickLike,
  } = props

  const firstLeter = userName.slice(0, 1)

  const onDelteReq = () => {
    onClickDelete(uid)
  }

  const onLikeReq = () => {
    onClickLike(uid)
  }

  const likeImf = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeClass = isLiked ? 'Liked' : ''

  return (
    <li className="li-con">
      <div className="top-sec">
        <p className={`profile ${className}`}>{firstLeter}</p>
        <h1 className="li-name">{userName}</h1>
        <p className="time-indi">{formatDistanceToNow(date)}</p>
      </div>

      <p className="li-comment">{userComment}</p>

      <div className="bottom-sec">
        <button
          onClick={onLikeReq}
          type="button"
          className={`like-btn ${likeClass}`}
          alt="like"
        >
          <img className="like-img" src={likeImf} alt="like" /> Like
        </button>
        <button
          onClick={onDelteReq}
          className="del-btn"
          type="button"
          data-testid="delete"
        >
          <img
            className="del-icon"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
      <hr className="li-line" />
    </li>
  )
}

export default CommentItem
