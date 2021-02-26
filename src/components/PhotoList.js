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
        let query = '';
    
        (this.props.match.params.query) ? query = this.props.match.params.query : query = this.props.query; 

        if (this.state.previousQuery !== query) {
            this.props.onSearch(query);
            this.setState(prevState => ({
                previousQuery: query
            }))
        }    
    }

    render() {

        // Build Photo components with each of the 24 resulting photos
        const data = this.props.photos;
        let photos;
        if (this.props.isLoading) {
            photos = <Loading />
        } else {
            if (data.length > 0) {
                photos = data.map(photo => 
                    <Photo 
                        serverId={photo.server} 
                        secret={photo.secret} 
                        id={photo.id}
                        key={photo.id} 
                    />)
            } else {
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