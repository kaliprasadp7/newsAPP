import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.showProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.showProgress(30);
    let parsedData = await data.json();
    props.showProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.showProgress(100);
    document.title = `${capitalizeFirstLetter(props.category)} - newsMonkey`;
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  },[]);

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  return (
    <>
      <h1 className={`text-center text-${props.mode === 'light' ? 'dark' : 'light'} mt-5 pt-3`}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className='container my-3'>
          <div className="row mt-4">
            {
              //the news will not show when the spinner is running
              articles.map((element) => {
                return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 42) : null} description={element.description ? element.description.slice(0, 88) : null} imageUrl={element.urlToImage ? element.urlToImage : "https://static.feber.se/article_images/60/22/27/602227.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name ? element.source.name : "Unknown"} mode={props.mode} />
                </div>
              })
            }
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.propTypes = {
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired
}

// News.defaultProps = {
//   country : 'us',
//   category : 'general',
//   pageSize : 8
// }

export default News;
