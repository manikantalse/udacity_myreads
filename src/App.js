import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Main_Page from './components/routes/Main_Page';
import Search_Page from './components/routes/Search_Page';


// Main Application component
class App extends React.Component {
  render() {
    return (
      <div>
        {/* Routing to two seperate States */}
        <Route exact path="/" component={Main_Page} />,
        <Route exact path="/search" component={Search_Page} />
      </div>
    );
  }
}

export default App
