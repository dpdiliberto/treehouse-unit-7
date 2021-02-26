import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Photo from './Photo';
import NoMatches from './NoMatches';
import Loading from './Loading';

class PhotoList extends Component {

    state = {
        previousQuery: ''
    }

    // When component mounts, run search on route path data prop. Data prop initializes as 'sunsets'
    componentDidMount() {
        this.props.onSearch(this.props.query);
    }


   componentDidUpdate() { 
        let query;
    
        // Check if the query came from URL corresponds to a nav element or a search and assign to 'query' variable
        (this.props.match.params.query) ? query = this.props.match.params.query : query = this.props.query; 

        // Check if the new query is not equal to the previous query so that componentDidUpdate() only updates the photo list once per update
        if (this.state.previousQuery !== query) {

            // Search for photos based on URL query
            this.props.onSearch(query);
            this.setState({previousQuery: query})
        }    
    }

    render() {

        const data = this.props.photos;
        let photos;

        // Display Loading component before the component has loaded
        if (this.props.isLoading) {
            photos = <Loading />
        } else {

            // Build Photo components with each of the 24 resulting photos
            if (data.length > 0) {
                photos = data.map(photo => 
                    <Photo 
                        serverId={photo.server} 
                        secret={photo.secret} 
                        id={photo.id}
                        key={photo.id} 
                    />)
            } else {

                // Show NoMatches component is there are no matches
                photos = <NoMatches />
            }
        }
        
        return (
            <div className="photo-container">
                <h2>Results for: "{this.props.query}"</h2>
                <ul>
                    { photos }
                </ul>
            </div>
        )
    }
}

export default PhotoList = withRouter(PhotoList);