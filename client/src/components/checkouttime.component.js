import React, { Component } from 'react';
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm.component.js';
import axios from 'axios';





export default class MyCheckOutTime extends Component {
  constructor(props) {
    super(props);


      this.state = {
          name: "",
          quantity: "",
          tally: '',
          amount:"",
          cart: []
      }
  }




    componentDidMount() {
    const here = { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  }
    axios.get('/users/orders', here)
     .then(response => {
           this.setState({ cart: response.data })
          let zazr = 0;
          for (let i = 0; i < this.state.cart.length; i++ ) {
            zazr += Number(this.state.cart[i].quantity);
          }
      this.setState({
        tally: zazr
      })

          })
          .then( res => {
            let theetot = [];
            theetot =  this.state.cart.map( cartU => {
                const total = [];

                  const sum = cartU.price * cartU.quantity;
                  total.push(sum);
                  return total;

                })
                const sum1 = theetot.reduce((accumulator, currentValue) => {
                  return +accumulator + +currentValue;
                });
                this.setState({
                  amount: sum1
                  })
                console.log(this.state.amount);
            })
         .catch((error) => {
           console.log(error);
         })

     }









  render() {
    return (
      <div>
       <Elements>
     <InjectedCheckoutForm amount={this.state.amount} adCart={this.state.cart}/>
     </Elements>
       </div>

)



  }
}
