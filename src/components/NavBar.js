import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        if (!localStorage.getItem('token')) {
            window.location = '/#/login'
        }
    }

    handleLogoutClick = () => {
        localStorage.clear()
        window.location = '/#/login'
    }
    handleMyPostsClick = () => {
        window.location = '/#/myposts'
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-bg-light navbar-bg fixed">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01">
                    <button className="btn btn-link text-white">
                        <Link to="/"><h6>FEEDS</h6></Link>
                    </button>
                    <ul className="navbar-nav mr-auto" />
                    <ul className="navbar-nav mt-2 mt-lg-0 ">
                        <li className="nav-item active">
                            <button
                                className="btn btn-link text-white"
                                onClick={this.handleMyPostsClick}>
                                My Posts
					</button>
                        </li>
                    </ul>
                    <button
                        className="btn btn-link text-white"
                        onClick={this.handleLogoutClick}>
                        Logout
					</button>
                </div>
            </nav>
        )
    }
}