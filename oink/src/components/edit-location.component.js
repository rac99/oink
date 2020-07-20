import React, { Component } from 'react';
import axios from 'axios';

export default class EditLocation extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeProvince = this.onChangeProvince.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangePostalCode = this.onChangePostalCode.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      address: '',
      city: '',
      province: '',
      country: '',
      postal_code: '',
      description: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/locations/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          address: response.data.address,
          city: response.data.city,
          province: response.data.province,
          country: response.data.country,
          postal_code: response.data.postal_code,
          description: response.data.description,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value
    });
  }

  onChangeProvince(e) {
    this.setState({
      province: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  onChangePostalCode(e) {
    this.setState({
      postal_code: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const location = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(location);

    axios.post('http://localhost:5000/locations/update/'+this.props.match.params.id, location)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Location</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>

          <div className="form-group"> 
            <label>Address: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.address}
                onChange={this.onChangeAddress}
                />
          </div>
          <div className="form-group"> 
            <label>City: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.city}
                onChange={this.onChangeCity}
                />
          </div>
          <div className="form-group"> 
            <label>Province: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.province}
                onChange={this.onChangeProvince}
                />
          </div>
          <div className="form-group"> 
            <label>Country: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.country}
                onChange={this.onChangeCountry}
                />
          </div>
          <div className="form-group"> 
            <label>Postal Code: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.postal_code}
                onChange={this.onChangePostalCode}
                />
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          

          <div className="form-group">
            <input type="submit" value="Edit Location" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}