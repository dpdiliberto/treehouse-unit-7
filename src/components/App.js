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

  // Function to perform a search based on the input query string, resulting in an array of photos
  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo,
        isLoading: false,
        query: query
      })
      console.log(`Current query: ${this.state.query}`);
    })
    .catch( error => {
      console.log('Error fetching and parsing data', error);
    });
  }


  
  render () {
    return (
      <HashRouter>
        <div className="App">
          <SearchForm onSearch={this.performSearch} /> 
          <Nav onSearch={this.performSearch} isLoading={this.state.isLoading} query={this.state.query}/>
          <Switch>
              <Route exact path='/' render={ () => <Redirect to={'/sunsets'} />} />
              <Route path={`/sunsets`} 
                  render={ () => 
                  <PhotoList 
                    data={'sunsets'} 
                    onSearch={this.performSearch} 
                    photos={this.state.photos}
                    query={this.state.query}
                    isLoading={this.state.isLoading}
                  />} />         
              <Route path={`/ocean`} 
                  render={ () => 
                    <PhotoList 
                      data={'ocean'} 
                      onSearch={this.performSearch} 
                      photos={this.state.photos}
                      query={this.state.query}
                    isLoading={this.state.isLoading}
                    /> } />     
              <Route path={`/dolphins`} 
                  render={ () => 
                    <PhotoList 
                      data={'dolphins'} 
                      onSearch={this.performSearch} 
                      photos={this.state.photos}
                      query={this.state.query}
                    isLoading={this.state.isLoading}
                    /> } />     
              <Route path={"/search/:query"} 
                  render={ () => 
                    <PhotoList 
                      onSearch={this.performSearch} 
                      photos={this.state.photos}
                      query={this.state.query}
                      isLoading={this.state.isLoading}
                    /> } />     
              <Route path={"/"} 
                  render={ () => 
                    <Error /> } />
            </Switch>
        </div>
      </HashRouter>
    );
  }
}
