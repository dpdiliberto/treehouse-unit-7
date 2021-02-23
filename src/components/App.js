import React, { Component } from 'react';
import apiKey from './../config';
import axios from 'axios';

import SearchForm from './SearchForm';
import Nav from './Nav';
import PhotoList from './PhotoList';

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
      isLoading: true
    };
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        photos: response.data.photos.photo,
        isLoading: false
      })
    })
    .catch( error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  /* https://live.staticflickr.com/{server-id}/{id}_{secret}.jpg */

  
  render () {
    return (
      <HashRouter>
        <div className="App">
          <Route path='/' render={ () => <SearchForm onSearch={this.performSearch} /> } />
          <Nav onSearch={this.performSearch} isLoading={this.state.isLoading} />
          <Route exact path='/' render={ () => <Redirect to={'/cats'} />} />
          <Route path={`/cats`} 
              render={ () => 
              <PhotoList 
                data={'cats'} 
                onSearch={this.performSearch} 
                photos={this.state.photos}
              />} />         
          <Route path={`/ocean`} 
              render={ () => 
                <PhotoList 
                  data={'ocean'} 
                  onSearch={this.performSearch} 
                  photos={this.state.photos}
                /> } />     
          <Route path={`/dogs`} 
              render={ () => 
                <PhotoList 
                  data={'dogs'} 
                  onSearch={this.performSearch} 
                  photos={this.state.photos}
                /> } />     
          <Route path={"/search/:query"} 
              render={ () => 
                <PhotoList 
                  onSearch={this.performSearch} 
                  photos={this.state.photos}
                /> } />
        </div>
      </HashRouter>
    );
  }
}
