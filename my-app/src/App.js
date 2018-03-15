import './lib/common.css'
import React, { Component } from 'react';
import './App.css';

import Search from './components/search';
import Header from './components/header';
import Otherapp from './components/otherapp'
import Spike from './components/spike'
import More from './components/more'
class App extends Component {
  render() {
    return (
      <div>
         <Search/>
         <Header source="http://localhost:4000/data/swiper" />
         <Otherapp source="http://localhost:4000/data/otherapp" />
         <Spike source="http://localhost:4000/data/spike" />
         <More source="http://localhost:4000/data/more" />
      </div>
    );
  }
}

export default App;
