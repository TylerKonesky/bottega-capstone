import React, { Component } from "react";
import axios from "axios";
import NavBar from "../Nav/navbar"
import "./item.css"

import Cookie from "js-cookie"

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state={
        currentItem : [],
        userName: null
    }
    this.renderItem = this.renderItem.bind(this)
    this.getItem = this.getItem.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount(){
      this.getItem();
      this.setState({
          userName: Cookie.get("USERNAME").toString()
      }) 
  }

  getItem(){
      axios.get(`https://bottega-project-server-db.herokuapp.com/item/${this.props.match.params.id}`).then(response =>{
          this.setState({
              currentItem: [response.data]
          })
      })
  }

  addToCart(){
      axios.post(`https://bottega-project-server-db.herokuapp.com/addToCart`, {user_id : this.state.userName, cart_item: Number(this.props.match.params.id)}).then(response=> {
        alert("Item added to cart")
      })
  }

   renderItem(){
       return this.state.currentItem.map(item=>{
           return(
               <div className="cart-page-items">
                   <div className="item-name">{item.item_name}</div>

                   <div className="item-description">{item.item_description}</div>
                   <div className="item-price">${item.item_price}.00</div>
                   <button className="item-button" onClick={this.addToCart}>Add to Cart</button>

               </div>
           )
       })
    } 


  render() {
    return (
        <div>
            <NavBar page={"View Item"}></NavBar>
            <div className="cart-page-wrapper">
                
                {this.state.currentItem.length > 0 ? this.renderItem(): "loading...."}

            </div>
        </div>
    );
  }
}
