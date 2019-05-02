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
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidUpdate() {
    var inputs = JSON.parse(localStorage.getItem('inputs'));
    console.log(inputs);

    inputs.forEach(function(input){
      console.log(input);
      if (document.getElementById(input.id) != null) {
        document.getElementById(input.id).checked = input.checked;
      }
    });
  }

  getSavedPlaces(){
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkData = [];

    checkboxes.forEach(function(input){
      checkData.push({ id: input.id, checked: input.checked });
    });

    localStorage.setItem('inputs', JSON.stringify(checkData));
    console.log(JSON.stringify(checkData));
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
    console.log('API call on CLICK');
    this.getPlaces();
  }

  _handleKeyDown(event) {
    if (event.key === 'Enter') {
      console.log('API call on ENTER');
      this.handleClick();
    }
  }

  handleChange(event) {
    this.setState({zip_code: event.target.value});
  }

  render() {
    return (
      <div className="Search-Box">
        <div className="search-box"> 
          {/* This will work with a componentDidMount() */}
          {/* <input onChange={this.getSavedPlaces} type="checkbox" id="sample-check"></input> */}

          <h1 id="test-id">Enter a zip code and explore dining options near your area.</h1>
          <input value={this.state.zip_code} onChange={this.handleChange} onKeyDown={this._handleKeyDown} type="text" placeholder="Search for restaurants near you" name="search"/>
          <button onClick={this.handleClick} type="submit"><i className="fa fa-search"></i></button>
        </div>

          <div className="places">
            {
              this.state.restaurants.map((restaurant)=>{
                return(
                  <div key={restaurant.name}>
                    <span><input id="test-check" onChange={this.getSavedPlaces} value={restaurant.name} type="checkbox"></input></span>
                    <label>{restaurant.name}</label>
                  </div>
                )
              })
            }
          </div>
      </div>
    );
  }

}
{/* Adding CORRECT comment for pull request master -> evaluation */}
{/* Adding this comment for pull request master -> evaluation */}
export default SearchBox;