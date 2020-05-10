import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import callAPI from '../lib/axios'

export default class RegisterView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            file: null
        }
    }

    handleRegisterClick = async () => {
        const { username, password, email, file } = this.state
        //console.log(file)
        if (username === '' && password === '' && email === '') {
            console.log(username, password, email)
            alert('Cannot proceed without username and/or password')
        } else {
            try {
                let formData = new FormData();
                formData.append('file', file);
                formData.append('name', username);
                formData.append('password', password);
                formData.append('email', email);
                await callAPI('post', '/user', {
                    data: formData
                })
                alert('New User created')
            } catch (error) {
                alert('An error occured')
                console.log('Error')
            }
        }
    }

    render() {
        return (
            <div className="pt-5 login-bg text-white h-100">
                <div className="text-center">
                    <div className="display-4">Register with </div>
                    <div className="display-1"> PostIn.</div>
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
                            className="mt-3"
                            style={{ marginLeft: 600, marginRight: 600 }}>
                            <input
                                type="email"
                                className="form-control text-center placeholder-colored"
                                placeholder="xx@email.com"
                                onChange={(e) => {
                                    const { state: currentState } = this
                                    currentState.email = e.target.value
                                    this.setState(currentState)
                                }}></input>
                        </div>
                        <div
                            className="mt-3"
                            style={{ marginLeft: 600, marginRight: 600 }}>
                            <input type="file"
                                name="file"
                                accept="image/png, image/jpeg" onChange={(e) => {
                                    const { state: currentState } = this
                                    currentState.file = e.target.files[0]
                                    this.setState(currentState)
                                }}></input>
                        </div>
                        <div
                            className="mt-3 rounded"
                            style={{ marginLeft: 600, marginRight: 600 }}>
                            <button
                                className="btn btn-primary w-100"
                                onClick={this.handleRegisterClick}>
                                Sign Up
							</button>
                            <Link to="/login" className="text-white">
                                Login
							</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}