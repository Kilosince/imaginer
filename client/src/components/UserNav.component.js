import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../media.css';







export default class UserNav extends Component {
  constructor(props) {
    super(props);



      this.state = {
          cart: [],
          cartCount: '',
          tally: ''
      }

  }



 componentDidUpdate(){

 axios.get('/users/orders', { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  })
.then(response => {
        if (response.data)  {
          let h = [];
          h = response.data;
       let zazr = 0;
       for (let i = 0; i < h.length; i++ ) {
         zazr += Number(h[i].quantity);
       }
   this.setState({
     cart: h,
     tally: zazr
   })
 }

      })
      .catch((error) => {
        console.log(error);
      })
}






 render() {
      return (

        <nav className="navbar navbar-default navbar-expand-lg navbar-light backback">

            <Link to="/" className="navbar-brand" style={{color: "red", fontWeight: "bold"}}>The Flying Pot</Link>
            <div className="collapse container-fluid navbar-collapse" style={{ fontWeight: "bold"}}>
            <ul className="navbar-nav mr-auto">

            <div className="dropdown">
            <button className="dropbtn btn btn-outline-info">options</button>
              <div className="dropdown-content">
            { (this.props.UsInOut === "no") ?
            <Link to="/user" className="nav-link" style={{color: "black"}}>Create User</Link>
           :
            <li style={{display: "none"}}>
            </li>
          }


            <Link to="/" className="nav-link" style={{color: "black"}}>Shopping</Link>
            <Link to="/checkout" className="nav-link" style={{color: "black"}}>Cart<span style={{ color: 'red'}}> ({this.state.tally})</span></Link>
            <Link to="/status" className="nav-link" style={{color: "black"}}>Profile</Link>
            <Link to="/finalout" className="nav-link" style={{color: "black"}}>Final Checkout</Link>
          </div>

          { (this.props.UsInOut === "no") ?
          <li>
         <button to="/login" type="button" onClick={() => {this.props.loginButton()}} className="btn btn-outline-info loginb">login</button>
          </li>
          :
          <li>
          <button to="/logout" type="button" onClick={() =>{this.props.logout()}} className="btn btn-outline-info logoutb">logout</button>
          </li>
                              }
          </div>



          </ul>
          </div>
          </nav>


   )
 }
}
