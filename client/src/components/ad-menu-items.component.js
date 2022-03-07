import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

  function Item(props) {
  return <tr className="shadow p-3 mb-5 bg-white rounded">
      <td>{props.menu.imagePath}</td>
      <td>{props.menu.title}</td>
      <td>{props.menu.description}</td>
      <td>{props.menu.price}</td>
      <td>{props.menu.available_quantity}</td>
      <td>{props.menu.date}</td>
      <td>
        <Link to={"/edit/"+props.menu._id}>edit</Link> | <a href="#" onClick={() => {
          props.deleteMenu(
            props.menu._id,
            props.menu.imagePath,
            props.menu.title,
            props.menu.description,
            props.menu.price,
            props.menu.available_quantity,
            props.menu.date
           )
         }}>delete</a>
      </td>
    </tr>
  }

export default class AdMenuItems extends Component {
  constructor(props) {
    super(props);

    this.deleteMenu = this.deleteMenu.bind(this);
    this.deleteLog = this.deleteLog.bind(this);


    this.state = {menus: []};
  }

   componentDidMount() {
      axios.get('/menu/')
        .then(response => {
            this.setState({ menus: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
 deleteLog(i, t, d, p, av, dt){
   const logger = {
      imagePath: i,
      title: t,
      description: d,
      price: p,
      available_quantity: av,
      date: dt
   }

 axios.post('/users/menu/log', logger, { headers:
   {
   "this-token": localStorage.getItem("this-token")
 }
 })
 .then(response => {
   console.log("Data is logged");
 })
 .catch((error) => {
   console.log(error);
 })
 }


  deleteMenu(id, i, t, d, p, av, dt) {
    this.deleteLog(i, t, d, p, av, dt);
    axios.delete('/menu/'+id)
      .then(res => console.log(res.data));
    this.setState({
      menus: this.state.menus.filter(el => el._id !== id)
    })
  }

    menuList() {
      return this.state.menus.map(currentitem => {
        return <Item menu={currentitem} deleteMenu={this.deleteMenu} key={currentitem._id}/>;
      })
    }

  render() {
    return (
      <div>
        <h3>Menu Items</h3>
        <Link to={"/restore"} style={{fontWeight: "bold", color:"yellow"}}><span style={{color:"black"}}>*</span> Storage</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ImagePath</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Available_quantity</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              { this.menuList() }
            </tbody>
          </table>
        </div>
    )
  }
}
