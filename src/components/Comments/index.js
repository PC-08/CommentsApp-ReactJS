import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

let count = 0

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {userName: '', userComment: '', commentsArray: []}

  onNameEnters = event => {
    this.setState({userName: event.target.value})
  }

  onCommentEnters = event => {
    this.setState({userComment: event.target.value})
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {userName, userComment} = this.state

    if (userName.length !== 0 && userComment.length !== 0) {
      if (count > 6) {
        count = 0
      }

      const id = uuidv4()

      const newComment = {
        id,
        userName,
        userComment,
        date: new Date(),
        isLiked: false,
        className: initialContainerBackgroundClassNames[count],
      }

      count += 1

      this.setState(prevState => ({
        commentsArray: [...prevState.commentsArray, newComment],
        userName: '',
        userComment: '',
      }))
    }
  }

  onClickDelete = uid => {
    const {commentsArray} = this.state
    const filteredResults = commentsArray.filter(
      eachComment => eachComment.id !== uid,
    )

    this.setState({commentsArray: [...filteredResults]})
  }

  onClickLike = uid => {
    this.setState(prevState => ({
      commentsArray: prevState.commentsArray.map(eachComment => {
        if (uid === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {userName, userComment, commentsArray} = this.state
    return (
      <div className="bg">
        <div className="comment-head-container">
          <div>
            <h1 className="head">Comments</h1>
            <p className="label">Say something about 4.0 Technologies</p>
            <form className="comments-input-container">
              <input
                onChange={this.onNameEnters}
                value={userName}
                id="name"
                className="name"
                placeholder="Your Name"
              />
              <textarea
                value={userComment}
                onChange={this.onCommentEnters}
                className="comment"
                placeholder="Your Comment"
              />
              <button
                onClick={this.onClickSubmit}
                type="submit"
                className="submtbtn"
              >
                Add Comment
              </button>
            </form>
          </div>
          <img
            className="img"
            alt="comments"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
          />
        </div>
        <hr className="line" />
        <div className="com-sec">
          <p className="cnumber">
            <span className="count">{commentsArray.length}</span> Comments
          </p>

          <ul className="ulist">
            {commentsArray.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                uid={eachComment.id}
                userName={eachComment.userName}
                userComment={eachComment.userComment}
                date={eachComment.date}
                isLiked={eachComment.isLiked}
                className={eachComment.className}
                onClickDelete={this.onClickDelete}
                onClickLike={this.onClickLike}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
