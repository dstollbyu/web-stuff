import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'

// Importing components
import MainPage from './components/MainPage.js';
import MarkdownPreview from './components/MarkdownPreview.js';
import PomodoroClock from './components/PomodoroClock.js';
import SearchPage from './components/SearchPage.js';
import ScrollToTop from './components/ScrollToTop.js';


/* APPLICATION START */
function App() {
  
  // Use react-router-dom to control links to different components
  return (
    <Switch>
      <ScrollToTop>
        <Route exact path="/" component={MainPage} />
        <Route path="/MarkdownPreview" component={MarkdownPreview} />
        <Route path="/PomodoroClock" component={PomodoroClock} />
        <Route path="/SearchPage" component={SearchPage} />
      </ScrollToTop>
    </Switch>
  );
}
/* APPLICATION END */

export default App;
