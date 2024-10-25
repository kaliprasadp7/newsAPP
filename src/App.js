import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {

  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress:progress})
  }

  render() {
    let pageSize = 7, country = "us", apikey=process.env.REACT_APP_NEWS_API;
    return (
      <>
      <Router>
      <Navbar/>
      {/* Loadingbar added to show top loading bar */}
      <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />

      <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={pageSize} country={country} category="general" apikey={apikey} />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={pageSize} country={country} category="business" apikey={apikey} />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={pageSize} country={country} category="entertainment" apikey={apikey} />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={pageSize} country={country} category="health" apikey={apikey} />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={pageSize} country={country} category="science" apikey={apikey} />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={pageSize} country={country} category="sports" apikey={apikey} />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={pageSize} country={country} category="technology" apikey={apikey} />} />
      </Routes>
      </Router>
      </>
    )
  }
}

export default App
