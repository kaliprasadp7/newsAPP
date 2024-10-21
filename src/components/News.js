import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6901b943dba4084a0996c5696511f28&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData.articles);
    this.setState({
      articles: parsedData.articles,
      totalResults : parsedData.totalResults,
      loading:false
    });
  }

  handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6901b943dba4084a0996c5696511f28&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page + 1, 
      articles : parsedData.articles,
      loading:false
    });
  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6901b943dba4084a0996c5696511f28&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page - 1, 
      articles : parsedData.articles,
      loading:false});
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row mt-4">
          {
            //the news will not show when the spinner is running
            !this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-3" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 42):null} description={element.description?element.description.slice(0, 88):null} imageUrl={element.urlToImage ? element.urlToImage : "https://static.feber.se/article_images/60/22/27/602227.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
            })
          }

          <div className="d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News
