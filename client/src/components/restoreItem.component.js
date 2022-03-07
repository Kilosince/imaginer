import React from 'react';
import ProductItem from './product-item.component';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Restorer(props) {
return (
  <tr>
    <td>{props.logger.imagePath}</td>
    <td>{props.logger.title}</td>
    <td>{props.logger.description}</td>
    <td>{props.logger.price}</td>
    <td>{props.logger.available_quantity}</td>
    <td>{props.logger.date}</td>
    <td>


     <button type="button" value="button"  className="btn btn-outline-dark btn-sm" style={{fontWeight: "bold", marginLeft: "2%"}}
      onClick={() => { props.restoreButton(
        props.logger._id,
        props.logger.imagePath,
        props.logger.title,
        props.logger.description,
        props.logger.price,
        props.logger.available_quantity,
        props.logger.date
      )}}> restore </button>
    </td>
  <td>
  <button type="button" value="button"  className="btn btn-outline-danger btn-sm" style={{fontWeight: "bold"}}
     onClick={() => { props.deleteButton(
       props.logger._id
     )}}> delete </button>
  </td>
  </tr>

)}

    export default class RestoreItem extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
        menuLog: []
        }
          this.restoreButton = this.restoreButton.bind(this);
          this.restoreLog = this.restoreLog.bind(this);
          this.deleteButton = this.deleteButton.bind(this);
      }


      componentDidMount() {
       axios.get('/users/menu/restore', { headers:
         {
         "this-token": localStorage.getItem("this-token")
       }
       })
         .then(response => {
             this.setState({ menuLog: response.data })
           })
           .catch((error) => {
             console.log(error);
           })
       }

       restoreButton(id, i, t, d, p, av, dt) {
         const restoreMenu = {
           imagePath: i,
           title: t,
           description: d,
           price: p,
           available_quantity: av,
           date: dt
         }

         console.log(restoreMenu)


         axios.post('/menu/add', restoreMenu,  { headers:
           {
           "this-token": localStorage.getItem("this-token")
         }
         })
           .then(res => this.deleteButton(id));
       }

       deleteButton(id) {
         axios.delete('/users/dlog/'+id)
           .then(res => console.log(res.data));
         this.setState({
           menuLog: this.state.menuLog.filter(el => el._id !== id)
         })
       }

           restoreLog() {
             return this.state.menuLog.map(restored => {
               return <Restorer
               logger={restored}
               restoreButton={this.restoreButton}
               deleteButton={this.deleteButton}
               key={restored._id}/>;
             })
           }



      render() {
        const { menuLog } =  this.state;
        return (
          <div className=" container">
            <h3 className="card-title">Items Storage</h3>
            <Link to={"/menuitem"} style={{fontWeight: "bold"}}><span style={{color:"black"}}>*</span> Menu</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>ImagePath</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  { this.restoreLog() }
                </tbody>
              </table>
          </div>
        );
      }
    }
