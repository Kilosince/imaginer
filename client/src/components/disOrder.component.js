import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function ProfileMan(props) {
return (
  <div style={{marginTop: "1%"}}>
  <div className="shadow p-3 mb-1 bg-white rounded" style={{
  borderStyle:"solid",
  borderWidth: "1px",
  borderRadius: "25px",
  borderColor: "#ffd699"
}}>

    <h2 style={{marginLeft: "2%"}} >{props.order.title}</h2>
    <p style={{marginLeft: "2%"}}>{props.order.notes}</p>
    <p style={{marginLeft: "2%", fontWeight: "bold", color: "red"}}>({props.order.quantity})</p>
  </div>
    </div>

)}

export default class ShowMe extends Component {
  constructor(props) {
    super(props);


    this.singleTick = this.singleTick.bind(this);
    this.profileMan= this.profileMan.bind(this);


      this.state = {

      orders: []


    };
  }


  componentDidMount() {
     axios.get('/users/tickView/'+this.props.match.params.id, { headers:
       {
       "this-token": localStorage.getItem("this-token")
     }
     })
     .then(response => {
       const ok = response.data.filter(el => el.ourId === this.props.match.params.id);
           this.setState({ orders: ok, identify: this.props.match.params.id })
         })
         .catch((error) => {
           console.log(error);
         })
     }


   singleTick(id) {
     console.log(this.state.orders);
     return this.state.orders.map(currentOrders => {
       return <ProfileMan
       order={currentOrders}
      profileMan={this.profileMan}
       key={currentOrders._id}/>;
     })
}


   profileMan() {
     window.location = "/status";
   }








     render() {
   return (
     <div>
       <div>
       <h2
         className="ourIder shadow p-3 mb-1"
         >{this.props.match.params.id}</h2>
       <div>

      <span>
      <button className="btn btn-success btn-sm profileB"
          onClick={() => { this.profileMan() }}>
      @Profile
      </button>

      </span>
       </div>
           <div>
             { this.singleTick(this.state.identify) }
           </div>
         </div>

       </div>


   )
 }
}
