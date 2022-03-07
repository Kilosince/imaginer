import React from 'react';
import axios from 'axios';
import CardSection from './CardSection.component';
import {injectStripe} from 'react-stripe-elements';






class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.postOrder = this.postOrder.bind(this);
    this.receiptMe = this.receiptMe.bind(this);
    this.confirmed = this.confirmed.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);



    this.state = {
      name: '',
      mentionMan: "",
      commId: "",
      confirmMe: false,
      nono: ["StripeCardError"]
    }
  }


  confirmed() {

      const answer = {
        commId: this.state.commId,
        ready: "order received!"
      }

     axios.post('/users/confirmed', answer, { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
    })
    .then(res => {
        console.log(res.data);
       })
       .catch((error) => {
         console.log(error);
       })

     }


  async receiptMe() {
    await this.setState({
      commId: Math.floor(Math.random() * 1001)
    });
     const receipter = {
       yourOrder: this.props.adCart,
       amounter: this.props.amount,
       commId: this.state.commId
     }
     console.log(this.state.commId);

    await axios.post('/users/receiptme/', receipter, {  headers:
          {
            "this-token": localStorage.getItem("this-token")
           }
      })
   .then(res => console.log("You tried it..."));
   }


  async postOrder() {
      const info = {
      adCart: this.props.adCart,
      commId: this.state.commId
    }
    await axios.post('/users/orders/info', info, {  headers:
          {
            "this-token": localStorage.getItem("this-token")
           }
      })
      .then(res => {
         console.log(info);
        })
        .catch((error) => {
          console.log(error);
        })
      }


  deleteOrder() {

      axios.delete('/users/orders/all',  {  headers:
         {
            "this-token": localStorage.getItem("this-token")
           }
      })
      .then(response => {
       console.log("ok");
        window.location = "status/";
      })
      .catch((error) => {
        console.log(error);
      })
  }





  handleInputChange = event =>
      this.setState({[event.target.name]: event.target.value})



      async handleSubmit(ev) {
       // We don't want to let default form submission happen here, which would refresh the page.
       ev.preventDefault();
       try {
         let {
           token: { id },
         } = await this.props.stripe.createToken({ name: this.state.name });
         let amount = this.props.amount;

         let res = await axios.post(
           '/users/pay',
           {
             token: id,
             amount,
           },
           {
             headers: {
               'this-token': localStorage.getItem('this-token'),
             },
           },
         );
         console.log(res.data);

       let eMan = this.state.nono.filter((el) => el === res.data);
      await (eMan.length > 0) ? console.log("Card did not go through.") : this.receiptMe();
       if (eMan.length > 0) {
         this.setState({ mentionMan: 'There was an error with your card.' });
       } else {
         this.postOrder();
         this.confirmed();
       }
     } catch (error) {
       console.log(error);
     }
     this.deleteOrder();

   }




  render() {

    return (

      <div>
    <input
     type="string"
     value={this.state.name}
     name="name"
     placeholder=" Card Name"
     onChange={this.handleInputChange}
     style={{
  border: "1px",
  borderTopStyle: "hidden",
  borderRightStyle: "hidden",
  borderLeftStyle:"hidden",
  borderBottomStyle: "groove",
  borderColor: "black",
  marginBottom: "2%"}} />
      <form onSubmit={this.handleSubmit}>
        <CardSection/>
        <button type="submit" value="Submit" className="btn btn-outline-primary" >Confirm order</button>
      </form>
      <h3>
      Total Amount:
      </h3>
      <p>
      ${this.props.amount}
      </p>
      <p>{this.state.mentionMan}</p>
      </div>



    );
  }
}

export default injectStripe(CheckoutForm);
