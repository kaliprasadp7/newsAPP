import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App() {

  const [progress, setProgress] = useState(0);
  
  const showProgress = (progress) => {
    setProgress(progress);
  }
  
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#18182d';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  let pageSize = 7, country = "us", apikey = process.env.REACT_APP_NEWS_API;
  return (
    <>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode}/>
        {/* Loadingbar added to show top loading bar */}
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />

        <Routes>
          <Route exact path="/" element={<News showProgress={showProgress} key="general" pageSize={pageSize} country={country} category="general" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
          <Route exact path="/business" element={<News showProgress={showProgress} key="business" pageSize={pageSize} country={country} category="business" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
          <Route exact path="/entertainment" element={<News showProgress={showProgress} key="entertainment" pageSize={pageSize} country={country} category="entertainment" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
          <Route exact path="/health" element={<News showProgress={showProgress} key="health" pageSize={pageSize} country={country} category="health" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
          <Route exact path="/science" element={<News showProgress={showProgress} key="science" pageSize={pageSize} country={country} category="science" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
          <Route exact path="/sports" element={<News showProgress={showProgress} key="sports" pageSize={pageSize} country={country} category="sports" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
          <Route exact path="/technology" element={<News showProgress={showProgress} key="technology" pageSize={pageSize} country={country} category="technology" apikey={apikey} mode={mode} toggleMode={toggleMode} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
