import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../media.css';

    const ProductItem = props => {


      const [imagePath, setImagePath] = useState('');
      const [title, setTitle] = useState('');
      const [notes, setNotes] = useState('');
      const [quant, setQuant] = useState('');
      const [price, setPrice] = useState('');
      const [cart, setCart] = useState([]);


      const handleInputNote = event => {
        const evalue = event.target.value;
          setNotes(evalue);
              };

      const handleInputQuant = event => {
                const evalue = event.target.value;
                  setQuant(evalue);
                      };

             useEffect(
               () => {
               const cream = { headers:
                 {
                 "this-token": localStorage.getItem("this-token")
               }
             }
                axios.get('/users/orders', cream)
              .then(response => {
                    setCart(response.data)
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }, []);



  const updateQuant = sing => {

        const quat = props.product.available_quantity - sing;
          const menuQuat = {
          id: props.product._id,
          imagePath: props.product.imagePath,
          title: props.product.title,
          description: props.product.description,
          price: props.product.price,
          available_quantity: quat,
          date: props.product.date
        }

        axios.put('/menu/update/quant', menuQuat, { headers:
          {
          "this-token": localStorage.getItem("this-token")
        }
      })
      .then(res => console.log(res.data));


    };

    const addToCart = e => {
       const bing = (quant === '') ? 1 : quant;

         if (bing > props.product.available_quantity) {
           alert(`Sorry Charlie, ${props.product.title} is sold out!
             There's only ${props.product.available_quantity} left!`);
         } else {

          updateQuant(bing);
      if (cart === '') {
        const moreOrder = {
         imagePath: props.product.imagePath,
         ourId: props.product._id,
         title: props.product.title,
         description: props.product.description,
         notes: (notes.length > 0) ? notes : 'X',
         quantity: bing,
         price: props.product.price,
         date: new Date()

       }

       axios.post('/users/orders', moreOrder, { headers:
         {
         "this-token": localStorage.getItem("this-token")
       }
     })
     .then(res => console.log(res.data));
   } else {

     updateQuant(bing);
     const moreOrder = {
      imagePath: props.product.imagePath,
      ourId: props.product._id,
      title: props.product.title,
      description: props.product.description,
      notes: (notes.length > 0) ? notes : 'X',
      quantity: bing,
      price: props.product.price,
      date: new Date()

    }


    axios.put('/users/orders', moreOrder, { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
   })
   .then(res => console.log(res.data));

   }
 }

     setNotes('');
     setQuant('');
        }

    const { product } = props;
        return (
         <div className="shadow-sm p-3 mb-3 bg-white rounded  card" style={{ marginBottom: "10px"}}>
           <div style={{
             borderColor: "#5c5c3d",
             borderStyle: "solid",
             borderWidth: "2px",
            borderRadius: "5px"
           }}className="card-body">
             <h4 className="card-title">{product.title}</h4>
             <p className="card-text">{product.imagePath}</p>
             <p className="card-text">{product.description}</p>
             <h5 className="card-text"><small>price: </small>${product.price}</h5>
             <span className="card-text">
               <small>Available Quantity: </small>{product.available_quantity}
             </span>
             { product.available_quantity > 0 ?
              <div>
              <input type="string" value={notes}  name="notes" placeholder="   ~type notes~" onChange={handleInputNote} />
                 <button style={{fontWeight: "bold", backgroundColor: "#ffff00", borderColor: "#e6f2ff"}} className="btn btn-sm btn-warning moverr"
                    onClick={addToCart}>Add to cart</button>
                 <input type="number" value={quant} name="quantity" placeholder=" qty"
                    onChange={handleInputQuant} className="inputr"
                    style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
              </div> :
              <p className="text-danger"> product is out of stock </p>
            }
          </div>
        </div>
       )
     }

export default ProductItem;
