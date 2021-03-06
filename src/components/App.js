import React, { Component } from 'react';
import apiKey from './../config';
import axios from 'axios';

import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoList from './PhotoList';
import Error from './Error';

import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

export default class App extends Component {

  constructor () {
    super();
    this.state = {
      photos: [],
      isLoading: true,
      query: ''
    };
  }

  // Function to perform a search based on the input query string from either the Nav component or SearchForm component
  // Function results in an array of photos from corresponding query
  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo,
        isLoading: false,
        query: query
      })
    })
    .catch( error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render () {

    return (
      <HashRouter>
        <div className="App">

          {/* Mount components with corresponding props */}
          <SearchForm onSearch={this.performSearch}/> 
          <Nav />
          <Switch>

              {/* Redirect so that default page is of sunsets */}
              <Route exact path='/' render={ () => <Redirect to={'/sunsets'} />} />

              {/* Create a route for each of the Nav elements 
              -- Opportunity to refactor in the future
              -- As of now, this causes the application to load photos twice per update, which is not ideal

              {this.state.navElements.map( (element, index) =>
                <Route path={`/${element}`} key={index}
                  render={ () => 
                  <PhotoList 
                    onSearch={this.performSearch} 
                    photos={this.state.photos}
                    query={`${element}`}
                    isLoading={this.state.isLoading}
                  />} />
              )} */}

              {/* Create a route for each of the Nav elements */}
              <Route path={`/sunsets`}
                  render={ () => 
                  <PhotoList 
                    onSearch={this.performSearch} 
                    photos={this.state.photos}
                    query={`sunsets`}
                    isLoading={this.state.isLoading}
                  />} />

              <Route path={`/ocean`}
                  render={ () => 
                  <PhotoList 
                    onSearch={this.performSearch} 
                    photos={this.state.photos}
                    query={`ocean`}
                    isLoading={this.state.isLoading}
                  />} />

                <Route path={`/dolphins`}
                  render={ () => 
                  <PhotoList 
                    onSearch={this.performSearch} 
                    photos={this.state.photos}
                    query={`dolphins`}
                    isLoading={this.state.isLoading}
                  />} />

              {/* Create a route for searches */}
              <Route path={"/search/:query"}
                  render={ () => 
                    <PhotoList 
                      onSearch={this.performSearch} 
                      photos={this.state.photos}
                      query={this.state.query}
                      isLoading={this.state.isLoading}
                    /> } />   

              {/* Create route to Error component if URL does not match any of the above routes */}
              <Route path={"/"} 
                  render={ () => 
                    <Error /> } />
            </Switch>
        </div>
      </HashRouter>
    );
  }
}
