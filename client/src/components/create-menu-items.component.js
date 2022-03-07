import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateItems extends Component {
  constructor(props) {
      super(props);

      this.onChangeImage = this.onChangeImage.bind(this);
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangePrice = this.onChangePrice.bind(this);
      this.onChangeQty = this.onChangeQty.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        imagePath: '',
        title: '',
        description: '',
        price: '',
        available_quantity:'',
        date: new Date(),
        users: []
    }
  }

    componentDidMount() {
      this.setState({
        users: ['test this'],
        title: ''
      })
    }


    onChangeImage(e) {
      this.setState({
        imagePath: e.target.value
      });
    }

    onChangeTitle(e) {
      this.setState({
        title: e.target.value
      });
    }

    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }

    onChangeQty(e) {
      this.setState({
        available_quantity: e.target.value
      });
    }

    onChangePrice(e) {
      this.setState({
        price: e.target.value
      });
    }

    onChangeDate(date) {
      this.setState({
        data: date
      });
    }

    onSubmit(e) {
      e.preventDefault();

      const menu = {
        imagePath: this.state.imagePath,
        title: this.state.title,
        description: this.state.description,
        available_quantity: this.state.available_quantity,
        price: this.state.price,
        date: this.state.date
      }

      console.log(menu)

      axios.post('/menu/add', menu)
        .then(res => console.log(res.data));

      window.location = '/';
    }


  render() {
    return (
      <div>
        <h3>Create New Menu Log</h3>
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
                  <label>Available_quantity: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.available_quantity}
                    onChange={this.onChangeQty}
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
                    <label>Date: </label>
                    <div>
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <input type="submit" value="Create Menu Log" className="btn btn-primary" />
                  </div>
                </form>
              </div>
              )
            }
          }
