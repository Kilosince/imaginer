import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Tick(props) {
return (
  <div style={{marginTop: "2%"}}>
  <div className="shadow p-3 mb-1 bg-white rounded" style={{
  borderStyle:"solid",
  borderWidth: "1px",
  borderRadius: "25px"
}}>

    <h2 style={{marginLeft: "2%"}} className={props.orders.title}>{props.orders.title}</h2>
    <p style={{marginLeft: "2%"}}>{props.orders.notes}</p>
    <p style={{marginLeft: "2%", fontWeight: "bold", color: "red"}}>({props.orders.quantity})</p>
  </div>
    </div>

)}

export default class TickView extends Component {
  constructor(props) {
    super(props);

    this.deleteMenu = this.deleteMenu.bind(this);
    this.onReady = this.onReady.bind(this);
    this.comeIn = this.comeIn.bind(this);
    this.timeMan = this.timeMan.bind(this);
    this.onChangeMan = this.onChangeMan.bind(this);
    this.singleTick = this.singleTick.bind(this);
    this.adminRun = this.adminRun.bind(this);
    this.recycleMan= this.recycleMan.bind(this);
    this.sendTicket = this.sendTicket.bind(this);






    this.state = {

      orders: [],
      ticks: '',
      adminoV: '',
      adminoT: '',
      ready: '',
      key: '',
      countTick: '',
      timeMan: '5',
      email: '',
      totManner: '',
      trueT: true,
      true: true,
      statusCon: []


    };
  }


  componentDidMount() {
     axios.get('/users/tickView/'+this.props.match.params.id, { headers:
       {
       "this-token": localStorage.getItem("this-token")
     }
     })
     .then(response => {
       let totMan = null;
       const ok = response.data.filter(el => el.ourId === this.props.match.params.id);
         for (let i = 0; i < ok.length; i++ ) {
             totMan += Number(ok[i].quantity);
                 }
           this.setState({ orders: response.data, ticks: this.props.match.params.id, totManner: totMan })
         })
         .catch((error) => {
           console.log(error);
         })
     }



     onChangeMan(e) {
       this.setState({
         timeMan: e.target.value
       });
       console.log(this.state.timeMan);
     }

     onReady(id) {
       let an = this.state.orders.filter(el => el.ourId === id)
       let f = an.map(a => {
     let b = a.ourId;
     let c = b.indexOf(".com");
     let d = b.substring(0, c !== -1 ? c : b.length);
     b = d.concat(".com");
     return b;
   })
   let email = f[0];
   let ready = "Ready!";

   this.setState({
         statusCon: an
       })
       const answer = {
         email: email,
         ourId: id,
         ready: ready
       }

     axios.post('/users/status', answer, { headers:
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

  comeIn(id) {

       let an = this.state.orders.filter(el => el.ourId === id)
       let f = an.map(a => {
     let b = a.ourId;
     let c = b.indexOf(".com");
     let d = b.substring(0, c !== -1 ? c : b.length);
     b = d.concat(".com");
     return b;
   })

   let email = f[0];
   let ready = "Come-In!";
   this.setState({
     statusCon: an,
   })

     const answer = {
       email: email,
       ourId: id,
       ready: ready
     }

   axios.post('/users/status', answer, { headers:
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

   timeMan(id){
     let an = this.state.orders.filter(el => el.ourId === id)
     let f = an.map(a => {
   let b = a.ourId;
   let c = b.indexOf(".com");
   let d = b.substring(0, c !== -1 ? c : b.length);
   b = d.concat(".com");
   return b;
  })
  let email = f[0];

  const orderTime = {
   email: email,
   ourId: id,
   ready: "Coming Up!",
   timeMan: this.state.timeMan
  }

   axios.post('/users/status', orderTime, { headers:
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



   adminRun() {
     window.location = "/amino";
   }

   singleTick(id) {
     console.log(this.state.orders);
     let an = this.state.orders.filter(el => el.ourId === id)
     return an.map(currentOrders => {
       return <Tick
       orders={currentOrders}
       timeMan={this.timeMan}
       timerMan={this.state.timeMan}
       onChangeMan={this.onChangeMan}
       readyButton={this.onReady}
       comeInButton={this.comeIn}
       key={currentOrders._id}/>;
     })
}

   sendTicket(id) {
     let tick = this.state.orders.filter(el => el.ourId === id)
     let bigTicker = [];
     for (let i = 0; i < tick.length; ++i) {

     let ticket = {
       ourId: this.state.ticks,
       title: tick[i].title,
       notes: tick[i].notes,
       quantity: tick[i].quantity,
       price: tick[i].price
     }
     bigTicker.push(ticket);
   }

     console.log(bigTicker);
     axios.post('/users/ticketFinder/', bigTicker, { headers:
       {
       "this-token": localStorage.getItem("this-token")
     }
     })
     .then(res => {
       this.setState({
         orders: this.state.orders.filter(el => el._id !== id)
       })
     })

}

   recycleMan() {
     window.location = "/ticketstore";
   }

   async deleteMenu(id) {
    await axios.delete('/users/ticketd/'+id, { headers:
       {
       "this-token": localStorage.getItem("this-token")
     }
     })
     .then(res => {
    this.sendTicket(id);
   })
   window.location = '/amino';

   }






     render() {
       let showButton = '';
       (this.state.trueT) ? showButton = "none" : showButton = "";

   return (
     <div>

     { (this.state.true === true) ? <h3>Ticket: <span style={{fontFamily: "Helvetica", color: "tomato"}}>{this.state.ticks}</span>
     <span className="float-right">all day ticket: <span style={{color: "red"}}>
        {this.state.totManner}</span></span></h3>:
        <h3>Open Orders<span className="float-right">all day: <span style={{color: "red"}}>
           {this.state.adminoV}</span></span></h3>}
           <h3><span className="float-right" style={{display: showButton}} >all day item: <span style={{color: "red"}}>
              {this.state.adminoT}</span></span></h3>

       <div>


       <div style={{display: "inline-block",marginTop: "2%", marginLeft: "5%"}}>

       <span>
       <button className="btn btn-warning btn-sm" style={{marginLeft: "2%", color: "white"}}   onClick={() => { this.adminRun() }}>
       @DSHBRD
       </button>
       </span>

       <span>
       <button type="button" value="button" onClick={() => { this.onReady(this.state.ticks)}} className="btn btn-success" style={{marginLeft: "1%"}}>ready
       </button>
       </span>

       <button type="button" value="button"  className="btn btn-dark" style={{fontWeight: "bold", marginLeft: "1%"}}
        onClick={() => { this.timeMan(this.state.ticks)}}> time </button>


      <input
          value={this.timerMan}
          onChange={this.onChangeMan}
          type="number"
          style={{ width: "12%",
          fontWeight: "400",
           marginLeft: "2%",
           borderRadius: "25%",
           borderColor: "white"
         }}
          className="btnsliner"/>


      <button  type="button" value="button" className="btn btn-danger btn-sm" style={{fontWeight: "bold", marginLeft: "3%"}}
      onClick={() => { this.deleteMenu(this.state.ticks) }}> x </button>
      <span>

      <button
      className="btn btn-outline-secondary btn-sm"
      style={{
      fontFamily: "georgia",
      letterSpacing: "1px",
      marginLeft: "2%"
             }}
      onClick={() => { this.recycleMan()}}
     >
      *recycle
      </button>
      </span>


       </div>
           <div>
             { this.singleTick(this.state.ticks) }
           </div>
         </div>

       </div>


   )
 }
}
