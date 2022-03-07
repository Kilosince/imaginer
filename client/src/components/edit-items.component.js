import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditItems extends Component {
  constructor(props) {
      super(props);

      this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangePrice = this.onChangePrice.bind(this);
      this.availQty = this.availQty.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        imagePath: '',
        title: '',
        description: '',
        price: '',
        available_quantity: '',
        date: new Date(),
        users: []
    }
  }

    componentDidMount() {
      axios.get('/menu/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            imagePath: response.data.imagePath,
            title: response.data.title,
            description: response.data.description,
            price: response.data.price,
            available_quantity: response.data.available_quantity,
            date: new Date(response.data.date)
          })
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.name),
          })
        }
      })
      .catch((error) => {
      console.log(error);
    })
  }


    onChangeImage(e) {
      this.setState({
        imagePath: e.target.value
      })
    }

    onChangeTitle(e) {
      this.setState({
        title: e.target.value
      })
    }

    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      })
    }

    onChangePrice(e) {
      this.setState({
        price: e.target.value
      })
    }

    availQty(e) {
      this.setState({
        available_quantity: e.target.value
      })
    }

    onChangeDate(date) {
      this.setState({
        date: date
      })
    }

    onSubmit(e) {
      e.preventDefault();

      const menu = {
        id: this.props.match.params.id,
        imagePath: this.state.imagePath,
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        available_quantity: this.state.available_quantity,
        date: new Date(this.state.date)
      }

      console.log(menu);

  axios.put('/menu/update/quant', menu, { headers:
      {
      "this-token": localStorage.getItem("this-token")
    }
  })
  .then(res => {
    console.log("ok!")
  })
  .catch((error) => {
    console.log(error);
  });
   window.location = '/menuitem';


    }


  render() {
    return (
      <div>
        <h3>Edit Menu Log</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>imagePath: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.imagePath}
              onChange={this.onChangeImage}
              />
            </div>

          <div className="form-group">
            <label>Title: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
                    />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
                </div>
                <div className="form-group">
                  <label>Price: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    />
                  </div>
                  <div className="form-group">
                    <label>Available_quantity: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.available_quantity}
                      onChange={this.availQty}
                      />
                    </div>
                  <div className="form-group">
                    <label>Date: </label>
                    <div>
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="submit" value="Edit Menu Log" className="btn btn-primary" />
                  </div>
                </form>
              </div>
              )
            }
          }
