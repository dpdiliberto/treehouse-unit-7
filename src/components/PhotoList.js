import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Photo from './Photo';
import NoMatches from './NoMatches';

class PhotoList extends Component {

    // When component mounts, run search on route path data prop. Data prop initializes as 'sunsets'
    componentDidMount() {
        this.props.onSearch(this.props.data);
      }

    render() {
        // Build Photo components with each of the 24 resulting photos
        const data = this.props.photos;
        let photos;
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