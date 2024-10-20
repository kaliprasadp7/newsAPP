import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a6901b943dba4084a0996c5696511f28";
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles);
    this.setState({articles: parsedData.articles});
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        <div className="row mt-4">
          {
            this.state.articles.map((element) => {
              return <div className="col-md-3" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):null} description={element.description?element.description.slice(0, 88):null} imageUrl={element.urlToImage ? element.urlToImage : "https://static.feber.se/article_images/60/22/27/602227.jpg"} newsUrl={element.url} />
            </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default News
