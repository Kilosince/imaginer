import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LilStat(props) {


return (


  <div
  style={{border: "solid", borderWidth: "2px", borderColor: "#cce0ff", borderRadius: "10px"}}
  className="shadow-sm p-2 mb-3 bg-white   card">
  <div className="card-body">
    <h3 style={{color: "#303030", fontWeight: "bold", fontFamily: "Times Roman", letterSpacing: "1px"}}
    onClick={() => {props.displayOrder(props.status.ourId)}}>{props.status.ourId}</h3>
    <h2 style={{color: "#0047b3"}}>"{props.status.ready}"</h2>
    <p style={{fontSize: "2.2em"}} >{props.status.timeMan} min</p>

    <div>

    <button type="button" value="button"  className="btn btn-success btn-sm"
    className="btn btn-outline-success btn-sm"
    style={{ marginLeft: "2%", marginRight:"1%", fontWeight: "bold"}}
     onClick={() => {props.tisGift(props.status.ourId)}}> a gift</button>

     <button type="button" value="button" className="btn btn-danger btn-sm" style={{fontWeight: "bold",  color: "white", marginLeft: "6px"}}
     onClick={() => { props.deleteButton(props.status._id) }}> - </button>

     <div className={props.status.ourId}  style={{marginLeft: "1%", display: "none"}}>
<div style={{display: "inline-block"}}>
     <button type="button" value="button"  className="btn btn-warning btn-sm"
     style={{color: "white", fontWeight: "bold"}}
      onClick={() => {props.sendGift(props.gifted, props.status.ourId)}}> send gift</button>
  </div>

  <div style={{display: "inline-block", marginTop: "2%"}}>
   <input
   style={{fontWeight: "bold", color: "grey", marginLeft: "4%"}}

     className={props.status.key}
     placeholder=" please type in a valid email"
       onChange={props.giftedName}
       type="text"
     />
     </div>


    </div>
    </div>

    </div>
    <div  className="mark"  style={{fontWeight: "bold", color: "grey", marginLeft: "4%", display: "none"}}>
     Oh no, we don't see that email? Please try another.
    </div>

  </div>

)}

function EditRun(props) {
return (

    <button type="button" style={{fontWeight: "bold"}} className="btn btn-outline-secondary"
    onClick={() => props.showDelete()}> Edit Account </button>


)}
function DeleteRun(props) {
return (
  <div>
  <button type="button" value="button" className="btn btn-outline-warning"  style={{fontWeight: "bold"}}
  onClick={() => { props.closeDelete()}}> Close Edit </button>
  <button type="button" value="button" className="btn btn-outline-danger" style={{fontWeight: "bold", marginLeft: ".3em"}}
   onClick={() => { props.accountDelete()}}> Delete Account </button>
  </div>


)}



  const StatLine = props => {

 const [showDelete, setShowDelete] = useState(false);
 const [giftedAction, setGifted] = useState("");
 const [showGiftAction, setShowGift] = useState('');
 const [statusCon, setStatusCon] = useState([]);
 const [checkEmail, setCheckEmail] = useState([]);
 const [truth, setTruth] = useState("begin");
 const [warnerBros, setWarner] = useState("Seems Fine")




   useEffect(
     () => {
      axios.get('/users/status', { headers:
        {
        "this-token": localStorage.getItem("this-token")
      }
      })
      .then(response => {
            setStatusCon(response.data);
            console.log(response.data);

          })
          .catch((error) => {
            console.log(error);
          })
        },[warnerBros]);

//final delete of profile
      const deleteButton = id => {
        axios.delete('/users/status/'+id, { headers:
          {
          "this-token": localStorage.getItem("this-token")
        }
        })
          .then(res => console.log(res.data));
          setStatusCon(statusCon.filter(el => el._id !== id));
      }

      useEffect(
        () => {
         axios.get('/users/checkEmail', { headers:
           {
           "this-token": localStorage.getItem("this-token")
         }
         })
         .then(response => {
               setCheckEmail(response.data);

             })
             .catch((error) => {
               console.log(error);
             })
           },[]);
//show delete profile button
      const showDeleteAction = () => {
          setShowDelete(true);
        }

        //gets user.email to check against user input



      //display gift give button
            const showGiftButton = (entry) => {


        showGiftAction || '' ? setShowGift(false) : setShowGift(true);



              const giftId = statusCon.filter(el => el.ourId === entry);
              for (let i = 0; i < giftId.length; i++ ) {
                if (!showGiftAction) {
                let cool = document.getElementsByClassName(entry);
                  cool[i].style.display = "inline-block";

               } else {

                 let cool = document.getElementsByClassName(entry);
                 cool[i].style.display = "none";


                   setGifted('');

               }

               }



}

//there was an error in email gift
        const emailIssue = (iss) => {
          let box = []
          for (let i = 0; i < statusCon.length; ++i) {
            box.push(statusCon[i].ourId)
          }
        let ar = box.indexOf(iss);
        for (let i = 0; i < box.length; ++i) {
          let cool = document.getElementsByClassName("mark");
          cool[ar].style.display = "inline-block";
        }
        }


      //updateSend
        const statSend = async (our) => {


           const gifter = {
                ourIdMan: our,
                weReady: "successfully gifted"
              }

             await axios.put('/users/upStatsend', gifter, { headers:
               {
               "this-token": localStorage.getItem("this-token")
             }
             })
             .then(res => {
               window.location = "/status";
                })
                .catch((error) => {
                  console.log("big problem");
                })
      }

      const secPoint = async (our, him) => {

                const adUp = {
                   oldEmail: our,
                   newEmail: him,
                   adCart: statusCon
                 }

             await axios.put('/users/adminup', adUp, { headers:
                  {
                  "this-token": localStorage.getItem("this-token")
                }
                })
                .then(response => {
                   statSend(him);


                })
                .then(res => {
                  console.log("tumbleweed");
                   })
                   .then(res => {
                      //hide error message

                      })
                   .catch((error) => {
                     console.log(error);
                   })
                 }



            const updateAd = async (him, our) => {


              /*him = him.replace(/[^A-Za-z]+/g, '');*/
              const emailTruth = checkEmail.filter(el => el.email === him);
                await (emailTruth.length === 0) ? emailIssue(our) : secPoint(him, our);

                //show error message
}


       const sendGift = async (him, our) => {
        /* let b = our;
         let c = b.indexOf(".com");
         let d = b.substring(0, c !== -1 ? c : b.length);*/
         let origOur = our;
         let bb = him;
         let cc = bb.indexOf("@");
         let dd = bb.substring(0, cc !== -1 ? cc : bb.length);

         const answer = {
           commId: our,
           email: him,
           ready: `Hey ${dd}, you've been sent an order!`
         }


        await axios.post('/users/sendGift', answer, { headers:
         {
         "this-token": localStorage.getItem("this-token")
       }
       })
       .then((res) => {
            updateAd(him, origOur);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
          setShowGift(our);
            console.log(answer.commId);
          }



  const giftedName = e => {
        const evalue = e.target.value;
        setGifted(evalue);
          }

      const closeDelete = () => {
        setShowDelete(false);
        }

  const accountDelete = async () => {
    const here = { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  }
  await axios.delete('/users/account', here)
    .then(response => {
          console.log("that's nice");
         })
        .catch((error) => {
          console.log(error);
        })
        axios.delete('/users/logout', here)
        .then(response => {
          const good = localStorage.clear('this-token');
            window.location = '/login';
        })





}

    const displayOrder = id => {
       window.location = '/displayOrder/'+id;
    }

    const ordersList = () => {



       return statusCon.map(sl=> {

         return <LilStat
         status={sl}
         displayOrder={displayOrder}
          deleteButton={deleteButton}
         tisGift={showGiftButton}
          gifted={giftedAction}
          sendGift={sendGift}
          showGift={showGiftAction}
          forGift={giftedAction}
         giftedName={giftedName}
         key={sl._id}/>;
      })
    }








    return (

      <div>
      { (showDelete === false) ?
    <EditRun showDelete={showDeleteAction}/>
      :
      <DeleteRun closeDelete={closeDelete} accountDelete={accountDelete}/>
    }

      <h2
      className="shadow p-1 mb-4"
      style={{
        marginTop: "3%",
        fontFamily: "georgia",
        color: " grey",
        fontSize: "35px",
        letterSpacing: "2px",
        backgroundColor: "",
        textAlign: "center",
        border: "solid",
        borderWidth: "1px",
        borderRadius: "5px"

    }}>Profile</h2>
          <div>
          { ordersList() }
      </div>


        </div>


    )
  }
export default StatLine;
