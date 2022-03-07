import React, { Component } from 'react';
import StatLine from "./statLine.component";
import axios from 'axios';

  function Users(props) {
  return <tr>
      <td>{props.users.name}</td>
      <td>{props.users.kind}</td>
      <td>{props.users.email}</td>
      <td>
       <a href="#" onClick={() => { props.deleteMenu(props.users._id) }}>delete</a>
      </td>
    </tr>
  }


export default class MenuItems extends Component {
  constructor(props) {
    super(props);

    this.deleteMenu = this.deleteMenu.bind(this);



    this.state = {
      users: []


    };
  }

   componentDidMount() {
      axios.get('/users/')
        .then(response => {
            this.setState({ users: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }



  deleteMenu(id) {
    axios.delete('/users/'+id)
      .then(res => console.log(res.data));
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }




    usersList() {
      return this.state.users.map(currentusers => {
        return <Users users={currentusers} deleteMenu={this.deleteMenu} key={currentusers._id}/>;
      })

    }


  render() {

    return (



      <div>
        <h3 >Customers</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>name</th>
              <th>kind</th>
              <th>email</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              { this.usersList() }
            </tbody>
          </table>
        </div>
    )
  }
}
