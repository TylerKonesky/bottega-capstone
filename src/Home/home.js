import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Nav/navbar"
import "./home.css"
import Cookie from "js-cookie"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        stuff: [
            // {id: 1, name: "Shoes", description: "White Nike Elite 500", category: "Clothes", cost: 99.99, img: ""},
            // {id: 2, name: "Shirt", description: "White Nike Elite 500", category: "Clothes", cost: 99.99, img: ""},
            // {id: 3, name: "Pants", description: "White Nike Elite 500", category: "Clothes", cost: 99.99, img: ""},
            // {id: 4, name: "More pants", description: "White Nike Elite 500", category: "Clothes", cost: 99.99, img: ""},
            // {id: 5, name: "Golf Clubs", description: "White Nike Elite 500", category: "Sporting Goods", cost: 99.99, img: ""},
            // {id: 6, name: "Cheese", description: "White Nike Elite 500", category: "Food", cost: 99.99, img: ""},
            // {id: 7, name: "Milk", description: "White Nike Elite 500", category: "Food", cost: 99.99, img: ""},
            // {id: 8, name: "Lemons", description: "White Nike Elite 500", category: "Food", cost: 99.99, img: ""},
            // {id: 9, name: "Suit", description: "White Nike Elite 500", category: "Clothes", cost: 99.99, img: ""},
            // {id: 10, name: "Belt", description: "White Nike Elite 500", category: "Clothes", cost: 99.99, img: ""},
            // {id: 11, name: "Fish", description: "White Nike Elite 500", category: "Cats", cost: 99.99, img: ""},
        ],
        categories: [],
        username: ''

    }
    this.getCategories = this.getCategories.bind(this)
    this.renderCategories = this.renderCategories.bind(this)
    this.getData = this.getData.bind(this)
    this.checkCookies = this.checkCookies.bind(this)

  }

    componentDidMount(){
        this.checkCookies()
        this.getData();
        setTimeout(() => this.setState({
            categories: this.getCategories()
        }), 500);
        this.renderCategories();
    }

    getCategories(){
        let categories = []
        this.state.stuff.map(item =>{
            categories.push(item.item_category)
        })
        const distinct = (value, index, self)=>{
            return self.indexOf(value) === index
        }
        return categories.filter(distinct)
    }

    checkCookies(){
        if(Cookie.get("USERNAME")){
            return;
        }else{
            let cookiess = Math.floor(Math.random()*1000000)
            Cookie.set("USERNAME", cookiess, {expires: 1})
        }
            
    }

    getData(){
        axios.get('https://bottega-project-server-db.herokuapp.com/getitems').then(response =>{
            console.log(response.data)
            this.setState({
                stuff: response.data
            })
        })
    }
    

    renderCategories(){
        console.log("what time is it?")
        return this.state.categories.map(category =>{
            return(
                <div className="individual-category">
                    <button href="/">{category}</button>
                </div>
            )
        })
    }
  



  renderItems(){
      
      return this.state.stuff.map(item =>{
        return(
            <Link to={`/item/${item.id}`}>
                <div className="individual-items">
                    {item.item_name}
                    <br></br>
                    {item.item_description}
                    <br></br>
                    ${item.item_price}.00
                    <br></br>
                </div>
             </Link>
        )
      })
  }

  render() {
    console.log("Test",this.state.categories)
    return (
      <div className="home-page-wrapper">
            <Navbar page="Home"></Navbar>
            <div className="home-page-content-wrapper">
                <div className="home-page-categories">
                    
                    {this.state.categories.length > 0 ? this.renderCategories() : null}
                </div>
                <div className="home-page-items">
                    {this.renderItems()}
                </div>   
            </div>        
      </div>
    );
  }
}
