import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import LocationsList from "./components/locations-list.component";
import EditLocation from "./components/edit-location.component";
import CreateLocation from "./components/create-location.component";
import CreateUser from "./components/create-user.component";

import Home from "./components/home.component";

function App() {
 return (
   <Router>
     <div className="container">
       <Navbar />
       <br/>
       <Route path="/" exact component={Home} />
       <Route path="/locations" component={LocationsList} />
       <Route path="/edit/:id" component={EditLocation} />
       <Route path="/create" component={CreateLocation} />
       <Route path="/user" component={CreateUser} />
     </div>
   </Router>
 );
}
 
export default App;