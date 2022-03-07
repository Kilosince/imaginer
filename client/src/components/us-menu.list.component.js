import React from 'react';
import ProductItem from './product-item.component';
import axios from 'axios';
import { Link } from 'react-router-dom';

    export default class ProductList extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
        menus: []
        }
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




      render() {
        const { menus } =  this.state;
        return (
          <div className=" container">
            <h2
            className="shadow-sm p-1 mb-4 card-title"
            style={{
              marginTop: "2%",
              fontFamily: "Georgia",
              fontSize: "30px",
              lineSpacing: "1px",
              textAlign: "center",
              border: "solid",
              borderTop: "none",
              borderRight: "none",
              borderLeft: "none",
              borderColor: "#c2d6d6",
              borderWidth: "2px",
              borderRadius: "10px"

          }}>Menu Items</h2><hr/>
          {menus.map((menu, index) => <ProductItem product={menu} key={index}/>)}
            <hr/>
            <Link to="/finalout">
              <button className="btn btn-success float-right">Checkout</button>
            </Link>
            <Link to="/checkout">
              <button className="btn btn-primary float-right"
                  style={{  marginRight: "10px" }}>View Cart</button>
            </Link><br/><br/><br/>
          </div>
        );
      }
    }
