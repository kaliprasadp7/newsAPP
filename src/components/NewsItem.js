import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div className="card mb-4">
        <img src={imageUrl} className="card-img-top" alt="newsbanner" style={{height : "160px"}} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} className="btn btn-primary">Read more</a>
        </div>
      </div>
    )
  }
}

export default NewsItem
