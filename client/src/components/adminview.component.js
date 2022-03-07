import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TickView from './tickView.component';
import axios from 'axios';
import '../media.css';





  function Amino(props) {
  return (
    <div style={{ marginTop: "1%", border: "solid 1px  #8cb3d9", borderBottom: "none"}}>

  <p style={{fontStyle: "italic", color: "red", fontSize: "20px", marginTop: "0px", marginBottom: "0px", marginLeft: "2%" }}
   className={props.orders.ourId} onClick={() => { props.tickView(props.orders.ourId) }}>{props.orders.ourId}</p>
  <p style={{fontSize: "25px", margin: "0px", marginLeft: "2%"}} className={props.orders.title}
  onClick={() => { props.tickView(props.orders.ourId) }}>{props.orders.title}</p>



      <p  style={{marginTop: "0px", marginBottom: "0px", marginLeft: "2%" }}
      onClick={() => { props.tickView(props.orders.ourId) }} >{props.orders.notes}</p>

      <p  style={{color: "red", fontSize: "18", fontWeight: "bold", marginBottom: "0px", marginLeft: "2%" }}
      onClick={() => { props.tickView(props.orders.ourId) }} >({props.orders.quantity})</p>

     <div style={{margin: "0px"}} >
      <button type="button" value="button" className="btn b1" style={{fontWeight: "bold"}}
      onClick={() => { props.readyButton(props.orders.ourId) }}>  ready</button>

      <button type="button" value="button" className="btn b2"  style={{fontWeight: "bold"}}
       onClick={() => {props.comeInButton(props.orders.ourId)}}>  come-in</button>

      <button type="button" value="button" className="btn b3"  style={{ fontWeight: "bold"}}
        onClick={() => { props.highlightKey(props.orders.ourId)}}>  key</button>



      <button type="button" value="button"  className="btn b4" style={{fontWeight: "bold"}}
       onClick={() => { props.highlightTitle(props.orders.title)}}>  title</button>


       <button type="button" value="button"  className="btn b5" style={{color: "black", fontWeight: "bold"}}
        onClick={() => { props.timeMan(props.orders.ourId)}}> time </button>


      <input
        className="ten"
          value={props.timerMan}
          onChange={props.onChangeMan}
          type="number"
        />

      <button  type="button" value="button" className="btn b6" style={{fontWeight: "bold"}}
      onClick={() => { props.deleteMenu(props.orders._id, props.orders.ourId) }}> delete </button>

  </div>
      </div>

  )}


export default class MenuItems extends Component {
  constructor(props) {
    super(props);

    this.deleteMenu = this.deleteMenu.bind(this);
    this.highlightTitle = this.highlightTitle.bind(this);
    this.highlightKey = this.highlightKey.bind(this);
    this.onReady = this.onReady.bind(this);
    this.comeIn = this.comeIn.bind(this);
    this.timeMan = this.timeMan.bind(this);
    this.onChangeMan = this.onChangeMan.bind(this);
    this.tickView = this.tickView.bind(this);
    this.recycler = this.recycler.bind(this);
    this.ticketSend = this.ticketSend.bind(this);





    this.state = {

      orders: [],
      adminoV: '',
      adminoT: '',
      ready: '',
      key: '',
      timeMan: '5',
      email: '',
      trueT: true,
      true: true,
      eyedee: '',
      statusCon: []


    };
  }



   componentDidMount() {
      axios.get('/users/amino', { headers:
        {
        "this-token": localStorage.getItem("this-token")
      }
      })
      .then(response => {
            this.setState({ orders: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      tickView(_id) {
       window.location = '/tickView/'+_id;

      }


      onChangeMan(e) {
        this.setState({
          timeMan: e.target.value
        });
        console.log(this.state.timeMan);
      }

      //Send ticket as part of delete process
        async ticketSend(our) {
        let tick = this.state.orders.filter(el => el.ourId === our)
        let bigTicker = [];
        for (let i = 0; i < tick.length; ++i) {

        let ticket = {
          ourId: our,
          title: tick[i].title,
          notes: tick[i].notes,
          quantity: tick[i].quantity,
          price: tick[i].price
        }


        console.log(bigTicker);
        await axios.post('/users/ticketFinder/', ticket, { headers:
          {
          "this-token": localStorage.getItem("this-token")
        }
        })
        .then(res => {
          console.log("Go nuts");
        })
        .catch(err => {
          console.log("ticket did not get posted");
        })
}
      }

      deleteMenu(id, our) {
          console.log(id);
         axios.delete('/users/damino/'+id, { headers:
            {
            "this-token": localStorage.getItem("this-token")
          }
          })
            .then(res => {
           this.ticketSend(our);
            })
            .then(response => {
              this.setState({
                orders: this.state.orders.filter(el => el._id !== id)
            })
          })
            .catch((error) => {
              console.log(id);
            })

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
      let email = (an[0].emailOp.length > 3) ? an[0].emailOp : f[0];
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
  console.log(email);
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

    let email = (an[0].emailOp.length > 3) ? an[0].emailOp : f[0];
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
    let email = (an[0].emailOp.length > 3) ? an[0].emailOp : f[0];


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

    recycler() {
      window.location = "/ticketstore"
    }



highlightTitle(entry) {
  if (this.state.trueT) {
    this.setState({
      trueT: false
    })
  } else {
    this.setState({
      trueT: true
      })
  }

  const adminV = this.state.orders.filter(el => el.title === entry);
  let newT = null;
  for (let i = 0; i < adminV.length; i++ ) {
    if (this.state.trueT) {
     let cool = document.getElementsByClassName(adminV[i].title);
     cool[i].style.backgroundColor = "lightGrey";
    cool[i].style.borderColor = "blue";
    cool[i].style.color = "black";
    cool[i].style.fontWeight = "900";
    newT += Number(adminV[i].quantity);
   } else {
     let cool = document.getElementsByClassName(adminV[i].title);
     cool[i].style.backgroundColor = "";
     cool[i].style.borderColor = "";
       cool[i].style.color = "black";
     cool[i].style.fontWeight = "";
     newT = null;
   }

   }
   this.setState({
     adminoT: newT
   })
   console.log(newT);
}



highlightKey(entry, id) {
  if (this.state.true) {
    this.setState({
      true: false
    })
  } else {
    this.setState({
      true: true
      })
  }

  let adminV = this.state.orders.filter(el => el.ourId === entry);
  let newQuat = null;
      for ( let i = 0; i < adminV.length; i++) {
      if (this.state.true) {
       let cool = document.getElementsByClassName(adminV[i].ourId);
       cool[i].style.backgroundColor = "lightgrey";
      cool[i].style.borderColor = "green";
      cool[i].style.color = "black";
      cool[i].style.fontWeight = "900";
      newQuat += Number(adminV[i].quantity);
     } else {
       let cool = document.getElementsByClassName(adminV[i].ourId);
       cool[i].style.backgroundColor = "";
       cool[i].style.borderColor = "";
       cool[i].style.color = "red";
       cool[i].style.fontWeight = "";
     }
  }
  this.setState({
    adminoV: newQuat
  })
  console.log(this.state.adminoV);


}


    ordersList() {
      return this.state.orders.map(currentOrders => {
        return <Amino
        orders={currentOrders}
        deleteMenu={this.deleteMenu}
        highlightTitle={this.highlightTitle}
        highlightKey={this.highlightKey}
        timeMan={this.timeMan}
        timerMan={this.state.timeMan}
        onChangeMan={this.onChangeMan}
        readyButton={this.onReady}
        comeInButton={this.comeIn}
        tickView={this.tickView}
        key={currentOrders._id}/>;
      })
    }





      render() {
        let showButton = '';
        (this.state.trueT) ? showButton = "none" : showButton = "";
    return (
      <div>
      { (this.state.true === true) ? <h3>Open Orders<span className="float-right">all day ticket: <span style={{color: "red"}}>
         {this.state.orders.length}</span></span></h3>:
         <h3>Open Orders<span className="float-right">all day: <span style={{color: "red"}}>
            {this.state.adminoV}</span></span></h3>}
            <h3> <span className="float-right" style={{display: showButton}} >all day item: <span style={{color: "red"}}>
               {this.state.adminoT}</span></span></h3>

              <button
              className="btn btn-success btn-sm"
              style={{
              marginLeft: "2%",
              marginBottom: "1%",
              letterSpacing: "1px",
              fontFamily: "georgia"
                     }}
              onClick={() => { this.recycler()}}

            >
             *Recycle
              </button>


            <div className="theBod">
              { this.ordersList() }
            </div>



        </div>


    )
  }
}
