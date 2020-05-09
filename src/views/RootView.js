import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import PostView from './PostView'
import MyPostView from './MyPostView'
import LoginView from './LoginView'
import RegisterView from './RegisterView'

class RootView extends Component {
    render() {
        return (
            <div className="wrapper">
                <Route path="/login" exact component={LoginView}></Route>
                <Route path="/register" exact component={RegisterView}></Route>
                <Route path="/myposts" exact component={MyPostView}></Route>
                <Route path="/" exact component={PostView}></Route>
            </div>
        )
    }
}

export default RootView;