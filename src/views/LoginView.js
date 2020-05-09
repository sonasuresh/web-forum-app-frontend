import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import callAPI from '../lib/axios'

export default class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLoginClick = async () => {
        const { username, password } = this.state
        if (username === '' && password === '') {
            alert('Cannot proceed without username and/or password')
        } else {
            try {
                const response = await callAPI('post', '/user/login', {
                    data: {
                        name: username,
                        password
                    }
                })
                console.log(response)
                localStorage.setItem('token', response.data.jwttoken)
                localStorage.setItem('name', response.data.name)
                window.location = '/#/'
            } catch (error) {
                console.log('Error')
            }
        }
    }

    render() {
        return (
            <div className="pt-5 login-bg text-white h-100">
                <div className="text-center">
                    <div className="display-4">Welcome to </div>
                    <div className="display-1"> Postifi</div>
                    <h3>An One step solution to share your thoughts</h3>
                    <div style={{ fontSize: 20 }} className="mt-5">
                        <div style={{ marginLeft: 600, marginRight: 600 }}>
                            <input
                                className="form-control text-center placeholder-colored"
                                placeholder="Enter your username"
                                onChange={(e) => {
                                    const { state: currentState } = this
                                    currentState.username = e.target.value
                                    this.setState(currentState)
                                }}></input>
                        </div>
                        <div
                            className="mt-3"
                            style={{ marginLeft: 600, marginRight: 600 }}>
                            <input
                                type="password"
                                className="form-control text-center placeholder-colored"
                                placeholder="Password"
                                onChange={(e) => {
                                    const { state: currentState } = this
                                    currentState.password = e.target.value
                                    this.setState(currentState)
                                }}></input>
                        </div>
                        <div
                            className="mt-3 rounded"
                            style={{ marginLeft: 600, marginRight: 600 }}>
                            <button
                                className="btn btn-primary w-100"
                                onClick={this.handleLoginClick}>
                                Login
            				</button>
                            <Link to="/register" className="text-white">
                                Dont Have an Account? Sign Up
            				</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}