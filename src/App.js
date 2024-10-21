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
    return (
      <>
      <Router>
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<News key="general" pageSize={20} country="us" category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={20} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={20} country="us" category="entertainment" />} />
          <Route exact path="/health" element={<News key="health" pageSize={20} country="us" category="health" />} />
          <Route exact path="/science" element={<News key="science" pageSize={20} country="us" category="science" />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={20} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={20} country="us" category="technology" />} />
      </Routes>
      </Router>
      </>
    )
  }
}

export default App
