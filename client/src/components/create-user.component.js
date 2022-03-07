import React, { Component } from 'react';
import axios from 'axios';
import '../media.css';


export default class CreateUsers extends Component {
  constructor(props) {
      super(props);

      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeKind = this.onChangeKind.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onChangePasswordA = this.onChangePasswordA.bind(this);
      this.verifyMan = this.verifyMan.bind(this);
      this.onVerify = this.onVerify.bind(this);
      this.magicButton = this.magicButton.bind(this);
      this.onMagic = this.onMagic.bind(this);
      this.passMan = this.passMan.bind(this);
      this.errorMan = this.errorMan.bind(this);
      this.eGuy = this.eGuy.bind(this);

      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        name: '',
        kind: '',
        email: '',
        password: '',
        passwordA: '',
        showMe: false,
        showTell: false,
        showAdmin: false,
        verifyAdmin: "",
        passMan: [],
        verifyGuy: "",
        verifyer: ""
      }
    }

      onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }

      onChangeKind(e) {
        this.setState({
          kind: e.target.value
        });
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

      onChangePasswordA(e) {
        this.setState({
          passwordA: e.target.value
        });
      }

      onVerify(e) {
        this.setState({
          verifyer: e.target.value
        });
      }

      onMagic(e) {
        let drill = '';
        this.state.showAdmin === true ? drill = false : drill = true;
        this.setState({
          showAdmin: drill
        });
      }


      passMan() {
        this.setState({
          showMe: true,
        });
        console.log(this.state.passMan);

}

    verifyMan() {
        const verify = {
          name: this.state.name,
          email: this.state.email,
          verifyGuy: this.state.verifyGuy
          }
      axios.post('/users/verify/', verify)
    .then(res => console.log("You tried it..."));

    }

      errorMan() {
        let pack = "";
          let n = this.state.email.indexOf("@");
          let o = this.state.email.indexOf(".com");

          if (n === -1 || o === -1) {
            pack += " Please type a valid email address.";
          }

          this.state.password === this.state.passwordA ? console.log("password good")
          : pack += " Please verify that your passwords match and is a minimum of 6 characters.";

          this.state.name.length > 5 ? console.log("name cool")
          : pack +=" Please make sure your name is atleast 5 characters long.";

            this.setState({
              passMan: pack
            })
      }

      eGuy() {
        let guy = this.state.verifyGuy;
        let oGuy = this.state.verifyer;
      let verbose = guy.toString();
        let verboser = oGuy.toString();

        let pack = "";
        if (verbose === verboser) {
           console.log("This bad boy is verified");
           this.setState({
             passMan: ""
           })
         } else {
           pack += " The code you typed did not match our records. Please re-type your 6 digit verification number";
        this.setState({
          passMan: pack
        })
        console.log("look Here");
      }

      }

    async magicButton() {
      await this.errorMan();
      if (this.state.passMan.length <= 0) {
        this.setState({
          showTell: true,
          verifyGuy: Math.floor(Math.random() * 1000001)
        })
        this.verifyMan();
        console.log(this.state.email);
        console.log(this.state.verifyGuy);
      } else {
        console.log("There was a problem at the door.");
        this.passMan();

      }
      }

    async onSubmit(e) {
        e.preventDefault();
        await this.eGuy();
      if (this.state.passMan.length <= 0) {
        let answerMe = "";
        (this.state.kind === "281-330-8004") ? answerMe = "admin" : answerMe = "user";
        const item = {
          name: this.state.name,
          kind: answerMe,
          email: this.state.email,
          password: this.state.password
        }
        console.log(item);

        axios.post('/users/add', item)
        .then(res => console.log(res.data));

          window.location = '/login';
      } else {
        console.log('nah');
         this.passMan();
      }
    }

  render() {
    let show = '';
    let adminer = this.state.showAdmin === true ? '' : 'none';
    let showPerson = '';
    let showPersona = '';
    this.state.showTell === false ? showPerson = '' : showPerson = 'none';
    this.state.showTell === true ? showPersona = '' : showPersona = 'none';
     this.state.showMe === false ? show = 'none' : show = '';

    return (
      <div>
        <h3 onClick={this.onMagic}>Create User:</h3>
        <form onSubmit={this.onSubmit}>
  <br></br>
          <div className="form-group" style={{display: showPerson}}>
            <input type="text"
                required
                className="form-control stylin"
                placeholder=" please type your name"
                value={this.state.name}
                onChange={this.onChangeName}

                    />
          </div>

          <div className="form-group" style={{display: adminer}}>
            <input type="text"
                required
                className="form-control stylin"
                placeholder=" please type your kind"
                value={this.state.kind}
                onChange={this.onChangeKind}

                />
          </div>

          <div className="form-group" style={{display: showPerson}}>
            <input type="text"
                required
                className="form-control stylin"
                placeholder=" please type your email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
        </div>

        <div className="form-group" style={{display: showPerson}}>

          <input type="password"
              required
              className="form-control stylin"
              placeholder=" please type your password"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
      </div>

      <div className="form-group" style={{display: showPerson}}>
        <input type="password"
            required
            className="form-control stylin"
            placeholder="please re-type your password"
            value={this.state.passwordA}
            onChange={this.onChangePasswordA}

            />
    </div>

      <div className="form-group" style={{display: showPerson}}>
        <input type="button" value="Register Account" className="btn btn-primary" onClick={this.magicButton} />
      </div>
    </form>

    <form onSubmit={this.onSubmit}>
    <div className="form-group" style={{display: showPersona}}>
      <input type="text"
          required
          className="form-control stylin"
          placeholder="please type verification code"
          value={this.state.verifyer}
          onChange={this.onVerify}
          />
  </div>
  <div className="form-group" style={{display: showPersona}}>
    <input type="submit" value="Verify Account" className="btn btn-success" />
  </div>
  </form>

    <p style={{display: show, fontWeight: "bold", fontSize: "18px", marginLeft: "2%"}} >
  {this.state.passMan}
    </p>
  </div>
    )
  }
}
