import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Photo from './Photo';

class PhotoList extends Component {

    componentDidMount() {
        this.props.onSearch(this.props.data);
      }

    render() {
        console.log(this.props.match.params.query);
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
        }
        
        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    {photos}
                </ul>
            </div>
        )
    }
}

export default PhotoList = withRouter(PhotoList);