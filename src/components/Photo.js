import React from 'react';

const Photo = (props) => {
    return(
        <li>
            <img src={`https://live.staticflickr.com/${props.serverId}/${props.id}_${props.secret}.jpg`} alt="" />
        </li>
    );
}

export default Photo;