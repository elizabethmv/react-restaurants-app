import React, { Component } from 'react';
import axios from 'axios';


class SearchBox extends Component {
  render() {
    this.getPlaces();
    return (
      <div className="search-box"> 
          <h1>Enter a zip code and explore dining options near your area.</h1>
          <input type="text" placeholder="Search for restaurants near you" name="search"/>
          <button type="submit"><i className="fa fa-search"></i></button>
      </div>
    );
  }

  getPlaces() {
    var params = {
      zip_code: "60654"
    };

    axios.get('https://pacific-gorge-23307.herokuapp.com/places', {params})
    .then(response => {
      console.log(response.data);
    })  
    .catch(function(error) {
      console.log('GET REQUEST ERROR: \n', error);
    });
  }

}

export default SearchBox;