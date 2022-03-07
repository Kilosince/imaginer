import React, { Component } from 'react';
import axios from 'axios';



export default class LoginUsers extends Component {
  constructor(props) {
      super(props);

      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        email: '',
        password: '',
        problemChild: false

      }
    }


      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }

      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }


    async onSubmit(e) {
        e.preventDefault();

        const item = {
          email: this.state.email,
          password: this.state.password
        }

        console.log(item);

       await axios.post('/users/login', item)
        .then(response => {
           localStorage.setItem('this-token', response.data);
          return response.data
        })
        .then(res => {
          this.setState({
            email: '',
            password: ''
            })
             window.location = '/';
          })
   .catch(err => {
     console.log("Is there a problem?")
     this.setState({
        problemChild: "true"
     })
   })
        }

  render() {
    let errorMan = "";
    {  this.state.problemChild === "true" ? errorMan = "" : errorMan = "none";}
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Email: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
        </div>

        <div className="form-group">
          <label>Password: </label>
          <input type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
      </div>


      <div className="form-group">
        <input type="submit" value="Login" className="btn btn-primary" />
      </div>
      <div>
      <p style={{display: errorMan, fontWeight: "bold", fontSize: "18px", marginLeft: "2%" }}>Dang, your username or password was entered wrong. Please try again!</p>
        </div>

    </form>
  </div>
    )
  }
}
