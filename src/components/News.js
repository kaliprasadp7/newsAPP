import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a6901b943dba4084a0996c5696511f28&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles);
    this.setState({
      articles: parsedData.articles,
      totalResults : parsedData.totalResults
    });
  }

  handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a6901b943dba4084a0996c5696511f28&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page + 1, 
      articles : parsedData.articles});
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a6901b943dba4084a0996c5696511f28&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page - 1, 
      articles : parsedData.articles});
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        <div className="row mt-4">
          {
            this.state.articles.map((element) => {
              return <div className="col-md-3" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 42):null} description={element.description?element.description.slice(0, 88):null} imageUrl={element.urlToImage ? element.urlToImage : "https://static.feber.se/article_images/60/22/27/602227.jpg"} newsUrl={element.url} />
            </div>
            })
          }

          <div className="d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevious}>Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News
