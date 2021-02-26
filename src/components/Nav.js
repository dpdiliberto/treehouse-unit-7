import React, { Component } from 'react';
import { NavLink } 
from 'react-router-dom';

class Nav extends Component {

    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li ><NavLink to={'/sunsets'}>Sunsets</NavLink></li>
                    <li ><NavLink to={'/ocean'}>Ocean</NavLink></li>
                    <li ><NavLink to={'/dolphins'}>Dolphins</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;