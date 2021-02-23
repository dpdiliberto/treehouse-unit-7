import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

class Nav extends Component {
    // run a search based on the navigation element's text
    handleClick = (e) => {
        this.props.onSearch(e.target.innerText);
    }

    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li onClick={this.handleClick}><NavLink to={'/sunsets'}>Sunsets</NavLink></li>
                    <li onClick={this.handleClick}><NavLink to={'/ocean'}>Ocean</NavLink></li>
                    <li onClick={this.handleClick}><NavLink to={'/dolphins'}>Dolphins</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;