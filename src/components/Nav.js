import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';

class Nav extends Component {
    handleClick = (e) => {
        this.props.onSearch(e.target.innerText);
    }

    render() {
        return (
            <nav className="main-nav">
                <ul>
                    <li onClick={this.handleClick}><NavLink to={'/cats'}>Cats</NavLink></li>
                    <li onClick={this.handleClick}><NavLink to={'/ocean'}>Ocean</NavLink></li>
                    <li onClick={this.handleClick}><NavLink to={'/dogs'}>Dogs</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Nav;