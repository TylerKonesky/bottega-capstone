import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie"
import NavBar from "../Nav/navbar"

import "./cart.css"

export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cart: [],
            displayCart: []
        }
        this.removeFromCart = this.removeFromCart.bind(this)
    }

    componentDidMount(){
        axios.get(`https://bottega-project-server-db.herokuapp.com/getallcarts`).then(response =>{
            response.data.map(item =>{
                if(item.user_id == Cookie.get("USERNAME")){
                    this.setState({
                        cart: [...this.state.cart, item]
                    })
                }
            })
            this.gatherCart();
        })  
    }
   
    gatherCart = () =>{
        this.state.cart.map(item =>{
            axios.get(`https://bottega-project-server-db.herokuapp.com/item/${item.cart_item}`).then(response =>{
                this.setState({
                    displayCart : [...this.state.displayCart, response.data ]
                })
            })
        })
    }

    renderCart = () =>{
        return this.state.displayCart.map(item =>{
            return(
                <div className="cart-item-details">
                    <div>{item.item_name}</div>
                    <div>${item.item_price}.00</div>
                    <div>x 1</div>
                    
                    <button onClick={()=>this.removeFromCart(item.id)}>remove</button>
                </div>
            )
        })
    }
    renderTotal = () => {
        let total = 0.00;
        this.state.displayCart.map(item =>{
            total += item.item_price
        })
        return total
    }

    removeFromCart(id){
        let deleteid = null;
        for(let i = 0; i < this.state.cart.length; i++){
            if(id == this.state.cart[i].cart_item && this.state.cart[i].user_id == Cookie.get("USERNAME")){
                deleteid = this.state.cart[i].id
                break;
            }
        }
        axios.delete(`https://bottega-project-server-db.herokuapp.com/removeitem/${deleteid}`).then(response=>{
            this.setState({
                cart: [response.data]
            })
            alert("Item Removed")
            window.location.reload()
        })
    }

    render(){
        return(
            <div>
                <NavBar page={"Cart"}></NavBar>
                <div className="cart-items-wrapper">
                    <div>
                    {this.state.displayCart.length > 0 ? this.renderCart() : "Cart is Empty"}
                    </div>
                    <div>
                    {this.state.displayCart.length > 0 ? (`Total: $ ${this.renderTotal()}`) : null}
                    </div>
                </div>
            </div>
        )
    }
}