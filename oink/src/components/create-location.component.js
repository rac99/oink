import React, { Component } from 'react';
import axios from 'axios';
import Geocode from "react-geocode";

// insert your API key
Geocode.setApiKey('');

export default class CreateLocation extends Component {
  
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
      latitude: '',
      longitude: '',
      users: []
    }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({ 
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
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
      address: this.state.address,
      city: this.state.city,
      province: this.state.province,
      country: this.state.country,
      postal_code: this.state.postal_code,
    };
    const info = {
      username: this.state.username,
      description: this.state.description,
    };

    Geocode.fromAddress(`${location}`).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng
        })
      
      axios.post('http://localhost:5000/locations/add', {
        ...location,
        ...info,
        ...lat,
        ...lng,
      })
      .then(res => console.log(res.data));
        console.log(location, info, lat, lng);
        //window.location = '/';
      
        // add a .catch here

      },
      error => {
        console.error(error);
      }
    );

    

  } 
  
  render() {
    return (
      <div>
        <h3>Add a Location</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
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
            <input type="submit" value="Create Location" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}