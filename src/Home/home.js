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
        stuff: [],
        categories: [],
        currentCategory: "",
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
        return this.state.categories.map(category =>{
            return(
                <div className="individual-category">
                    <button onClick={()=>this.handleFilter(category)}>{category}</button>
                </div>
            )
        })
    }

    handleFilter = (category) =>{
        this.setState({
            currentCategory: category
        })

    }
  



  renderItems(){
    if(this.state.currentCategory == ""){
      return this.state.stuff.map(item =>{
          
        return(
            <Link to={`/item/${item.id}`}>
                <div className="individual-items">
                    <div>{item.item_name}</div>
                    
                    <div>{item.item_description}</div>
                    
                    <div>${item.item_price}.00</div>
                    
                </div>
             </Link>
        )

      })}else{
          let filteredItems = this.state.stuff.filter(item => item.item_category == this.state.currentCategory)
          return filteredItems.map(item =>{
          
            return(
                <Link to={`/item/${item.id}`}>
                    <div className="individual-items">
                        <div>{item.item_name}</div>
                        
                        <div>{item.item_description}</div>
                        
                        <div>${item.item_price}.00</div>
                        
                    </div>
                 </Link>
                )
    
            }
        )}
  }

  render() {
    return (
      <div className="home-page-wrapper">
            <Navbar page="Home"></Navbar>
            <div className="home-page-content-wrapper">
                <div className="home-page-categories">
                    <button className="free-button" onClick={()=>this.handleFilter("")}>Reset</button>
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
