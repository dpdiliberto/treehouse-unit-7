import React from 'react';
import PropTypes from 'prop-types';

const Photo = (props) => {
    return(
        <li>
            <img src={`https://live.staticflickr.com/${props.serverId}/${props.id}_${props.secret}.jpg`} alt="" />
        </li>
    );
}

Photo.propTypes = {
    serverId: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default Photo;