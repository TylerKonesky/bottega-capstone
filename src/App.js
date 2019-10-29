import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import Home from "./Home/home"
import Item from "./Item/item"
import Cart from "./Cart/cart"


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route path="/item/:id" component={Item}></Route>
          <Route path="/cart" component={Cart}></Route>
        </div>
      </Router>
      
    </div>
  );
}

export default App;
