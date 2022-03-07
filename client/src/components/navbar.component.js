import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserNav from './UserNav.component.js';
import '../media.css';




function AdviewNavbar(props) {
      return (

        <nav className="navbar navbar-expand-lg navbar-light backback">
          <Link to="/" className="navbar-brand" style={{color: "red", fontWeight: "bold"}}>The Flying Pot</Link>
          <div  style={{ fontWeight: "bold"}}>
          <ul className="navbar-nav mr-auto">
          <div className="dropdown">
          <li>
          <button className="dropbtn btn btn-outline-info" >options</button>
          </li>
          <div className="dropdown-content" style={{fontFamily:"sans-serif"}}>
          <Link to="/user" className="nav-link james" style={{color: "black"}}>Create User</Link>
          <Link to="/menuitem" className="nav-link" style={{color: "black"}}>Menu</Link>
          <Link to="/" className="nav-link james" style={{color: "black"}}>Shopping</Link>
          <Link to="/create" className="nav-link james" style={{color: "black"}}>Create Menu Item</Link>
          <Link to="/users" className="nav-link james" style={{color: "black"}}>Client Base</Link>
          <Link to="/amino" className="nav-link james" style={{color: "black"}}>Admin</Link>
            </div>
            { (props.AdInOut === "no") ?
                        <li>
                        <button className="btn btn-outline-info loginb" onClick={() => {  props.loginButton()}}> login </button>
                        </li>

                        :

                        <li>
                        <button type="button" className="btn btn-outline-info logoutb" onClick={() => { props.logout()}}> logout </button>
                        </li>
                      }

          </div>




          </ul>
          </div>
          </nav>

    )}


export default class Navbar extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: '',
      kind: '',
      user: '',
      cartCount: '',
      cart: []
    };


    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

   componentDidMount(){
    localStorage.getItem("this-token") ? this.setState({ loggedInStatus: "yes"}) : this.setState({ loggedInStatus: "no"});
   axios.get('/users/kind',  { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  })
      .then(response => {
          this.setState({ user: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
  }




 async handleLogout() {
    const cram = { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  }
    await axios.delete("/users/logout", cram)
      .then(response => {
        const good = localStorage.clear('this-token');
      })
      window.location = '/login';
    }

  handleLogin() {
      window.location = '/login';
    }




  render() {

      return (
      this.state.user === 'admin' ?

          <AdviewNavbar loginButton={this.handleLogin} logout={this.handleLogout} AdInOut={this.state.loggedInStatus}/>
          :
            <UserNav loginButton={this.handleLogin} logout={this.handleLogout} UsInOut={this.state.loggedInStatus}/>



      );
    }

}
