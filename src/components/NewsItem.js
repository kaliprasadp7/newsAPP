import React from 'react'

function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div className={`card mb-4 text-bg-${props.mode} border-secondary`}>
        <img src={imageUrl} className="card-img-top" alt="newsbanner" style={{height : "160px"}} />
        <div className="card-body">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{marginLeft: "80%", zIndex:"99"}}>{source}</span>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className={`text-body-${props.mode === 'light' ? 'secondary' : 'muted'}`}>By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} className="btn btn-primary">Read more</a>
        </div>
      </div>
    )
}

export default NewsItem;
