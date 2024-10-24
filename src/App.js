import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

export class App extends Component {
  render() {
    let pageSize = 7, country = "us", apikey=process.env.REACT_APP_NEWS_API;
    return (
      <>
      <Router>
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} country={country} category="general" apikey={apikey} />} />
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} country={country} category="business" apikey={apikey} />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country={country} category="entertainment" apikey={apikey} />} />
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} country={country} category="health" apikey={apikey} />} />
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} country={country} category="science" apikey={apikey} />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country={country} category="sports" apikey={apikey} />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country={country} category="technology" apikey={apikey} />} />
      </Routes>
      </Router>
      </>
    )
  }
}

export default App
