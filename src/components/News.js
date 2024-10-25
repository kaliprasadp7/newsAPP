import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - newsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNext = async () => {
    this.setState({ page: ++this.state.page })
    this.updateNews();
  }

  handlePrevious = async () => {
    this.setState({ page: --this.state.page })
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: ++this.state.page})
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
      // loading: false
    });
  }

  render() {
    return (
      <>
        <h1 className='text-center mt-5 pt-3'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className='container my-3'>
          <div className="row mt-4">
            {
              //the news will not show when the spinner is running
              this.state.articles.map((element) => {
                return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 42) : null} description={element.description ? element.description.slice(0, 88) : null} imageUrl={element.urlToImage ? element.urlToImage : "https://static.feber.se/article_images/60/22/27/602227.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name ? element.source.name : "Unknown"} />
                </div>
              })
            }

            {/* <div className="d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
            </div> */}
          </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
