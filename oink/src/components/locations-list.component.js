import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Location = props => (
  <tr>
    <td>{props.location.username}</td>
    <td>{props.location.address}</td>
    <td>{props.location.city}</td>
    <td>{props.location.province}</td>
    <td>{props.location.country}</td>
    <td>{props.location.postal_code}</td>
    <td>{props.location.description}</td>
    <td>
      <Link to={"/edit/"+props.location._id}>edit</Link> | <a href="#" onClick={() => { props.deleteLocation(props.location._id) }}>delete</a>
    </td>
  </tr>
)

export default class LocationsList extends Component {
  
  constructor(props) {
    super(props);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.state = {locations: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/locations/')
     .then(response => {
       this.setState({ locations: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  deleteLocation(id) {
    axios.delete('http://localhost:5000/locations/'+id)
      .then(res => console.log(res.data));
    this.setState({
      locations: this.state.locations.filter(el => el._id !== id)
    })
  }

  locationList() {
    return this.state.locations.map(currentlocation => {
      return <Location location={currentlocation} deleteLocation={this.deleteLocation} key={currentlocation._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Locations List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Address</th>
              <th>City</th>
              <th>Province</th> 
              <th>Country</th>
              <th>Postal Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            { this.locationList() }
          </tbody>
        </table>
      </div>
    )
  }
}