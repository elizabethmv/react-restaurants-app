import React, { Component } from 'react';
import axios from 'axios';


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      restaurants: [],
      zip_code: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getPlaces() {
    var params = {
      zip_code: this.state.zip_code
    };

    axios.get('https://pacific-gorge-23307.herokuapp.com/places', {params})
    .then(response => {
      let restaurants = response.data.results;
      this.setState({restaurants: restaurants});
      console.log("state", this.state.restaurants);
    })  
    .catch(function(error) {
      console.log('GET REQUEST ERROR: \n', error);
    });
  }

  handleClick() {
    console.log('API call');
    this.getPlaces();
  }

  handleChange(event) {
    this.setState({zip_code: event.target.value});
  }

  render() {
    return (
      <div className="Search-Box">
        <div className="search-box"> 
          <h1>Enter a zip code and explore dining options near your area.</h1>
          <input value={this.state.zip_code} onChange={this.handleChange}type="text" placeholder="Search for restaurants near you" name="search"/>
          <button onClick={this.handleClick} type="submit"><i className="fa fa-search"></i></button>
        </div>

          <div className="places">
            {
              this.state.restaurants.map((restaurant)=>{
                return(
                  <div key={restaurant.name}>
                    <h4>{restaurant.name}</h4>
                  </div>
                )
              })
            }
          </div>
      </div>
    );
  }

}

export default SearchBox;