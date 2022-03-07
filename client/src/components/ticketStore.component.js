import React from 'react';
import axios from 'axios';
import '../media.css';

function Tickler(props) {
return (
<div className="shadow-sm p-3 mb-3 bg-white rounded card" style={{ marginBottom: "10px"}}>
  <div className=" card-body" style={{
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#cc6600"
}}>
    <p className="ourId">{props.tickler.ourId}</p>
    <p className="daTitle" style={{marginLeft: "2%", fontFamily: "georgia"}}>{props.tickler.title}</p>
    <p style={{marginLeft: "2%"}}>{props.tickler.notes}</p>
    <p className="quant" style={{marginLeft: "2%", fontWeight: "bold", color: "red"}}>({props.tickler.quantity})</p>
    <button
    onClick={() => { props.deleteMenu(props.tickler._id) }}
      className=" moveDel btn btn-danger btn sm">
    delete
    </button>
  </div>
  </div>

)}

    export default class TicketStore extends React.Component {
      constructor(props) {
        super(props);

  this.adminRun = this.adminRun.bind(this);
  this.tickerBank = this.tickerBank.bind(this);
  this.deleteMenu = this.deleteMenu.bind(this);


        this.state = {
          tickler: []
        }
      }



             componentDidMount() {
               const cream = { headers:
                 {
                 "this-token": localStorage.getItem("this-token")
               }
             }
                axios.get('/users/ticketstore', cream)
              .then(response => {
                      this.setState({ tickler: response.data })
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }

      adminRun() {
          window.location = "/amino";
                }


      tickerBank() {
        console.log(this.state.tickler);
        return this.state.tickler.map(bank => {
          return <Tickler
          tickler={bank}
          deleteMenu={this.deleteMenu}
          key={bank._id}/>;
        })
     }


     deleteMenu(id) {
       axios.delete('/users/ticketr/'+id, { headers:
         {
         "this-token": localStorage.getItem("this-token")
       }
       })
       .then(res => {
       this.setState({
         tickler: this.state.tickler.filter(el => el._id !== id)
       })
     })
     .catch((error) => {
       console.log("there was an issue deleting ticketr");
     })
     console.log(id);


     }





      render(){
        return (
          <div>

          <span>
          <button className="btn btn-warning btn-sm" style={{marginLeft: "2%", color: "white"}}   onClick={() => { this.adminRun() }}>
          @DSHBRD
          </button>
          </span>
        <p className="shadow-sm p-1 mb-2.3 recycleMan">
        <span className="recycleManT">* Recycle </span></p>

         <div>
    {this.tickerBank()}
        </div>
        </div>
       )
     }
    }
