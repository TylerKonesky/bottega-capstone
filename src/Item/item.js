import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../Nav/navbar"
import Cart from "../Cart/cart"

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
      
    //   this.setCurrentItem();
      
  }


  getItem(){
      axios.get(`https://bottega-project-server-db.herokuapp.com/item/${this.props.match.params.id}`).then(response =>{
          console.log(response.data)
          this.setState({
              currentItem: [response.data]
          })
      })
  }

  addToCart(){
      console.log(this.state.userName, this.props.match.params.id)
      axios.post(`https://bottega-project-server-db.herokuapp.com/addToCart`, {user_id : this.state.userName, cart_item: Number(this.props.match.params.id)}).then(response=> {
        console.log("Item Added", response.data)
        
      })
  }

   renderItem(){
       return this.state.currentItem.map(item=>{
           return(
               <div>
                   <div>{item.item_name}</div>

                   <div>{item.item_description}</div>
                   <div>${item.item_price}.00</div>
                   <button onClick={this.addToCart}>Add to Cart</button>

               </div>
           )
       })
    } 


  render() {
      
    return (
      <div>
          <NavBar page={"View Item"}></NavBar>
          
          {this.state.currentItem.length > 0 ? this.renderItem(): "loading...."}
          
      </div>
    );
  }
}
