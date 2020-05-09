import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import { moment } from 'moment'

import MyPostCard from '../components/MyPostCard'
import AddPostButton from '../components/AddPostButton'
import AddPostModal from '../components/AddPostModal'
import callAPI from '../lib/axios'
import { ToastContainer, toast } from 'react-toastify'

class MyPostView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            selectedPost: {},
            likedUsersList: [],
            date: ''
        }
        if (!localStorage.getItem('token')) {
            window.location = '/#/login'
        }
    }
    componentDidMount() {
        this.getAllPosts()
    }
    getAllPosts = async () => {
        try {
            const name = localStorage.getItem('name')
            const results = await callAPI('get', `/post/${name}`)
            const { state: currentState } = this
            currentState.posts = results.data.message
            currentState.date = results.data.message.createdAt
            this.setState(currentState)
            console.log(results.data.message)
        } catch (error) {
            toast.error('An error Occured. Try Again')
        }
    }
    handleDeletePost = async (postId) => {
        try {
            await callAPI('delete', `/post/${postId}`)
            this.getAllPosts()
            toast.success('Post Deleted')
        } catch (error) {
            toast.error('Post Cannot be Deleted')
        }
    }

    handleUpdatePostClick = (postId) => {
        const { state: currentState } = this
        const filteredPosts = currentState.posts.filter((post) => {
            return post._id === postId
        })
        currentState.selectedPost = filteredPosts[0]
        this.setState(currentState)
    }
    handleLikePost = async (postId, name) => {
        if (postId === '' && name === '') {
            alert('Cannot proceed without username and/or password')
        } else {
            try {
                const response = await callAPI('put', '/post/like', {
                    data: {
                        id: postId,
                        username: name
                    }
                })
                this.getAllPosts()
                toast.success('Liked')

            } catch (error) {
                toast.error('Post Cannot be Liked!')
            }
        }
    }
    viewLikes = async (postId) => {
        if (postId === '') {
            alert('Cannot proceed without post Id')
        } else {
            try {
                const result = await callAPI('get', `/post/viewlikes/${postId}`)
                const { state: currentState } = this
                currentState.likedUsersList = result.data.message
                this.setState(currentState)
                //alert("List of Users who liked tis Post" + '\n' + result.data.message)
                // toast.success("Lists of users who liked")
            } catch (error) {
                toast.error('Error')
            }
        }
    }
    _renderPostCards = () => {
        try {
            if (this.state.posts.length > 0) {
                return (
                    <div className="align">

                        {this.state.posts.map((post, idx) => (

                            < div
                                className="col-sm-12 col-md-12 col-lg-4 col-xl-3"
                                key={idx} >

                                <MyPostCard
                                    user={post.owner}
                                    date={post.createdAt}
                                    title={post.posttitle}
                                    description={post.postcontent}
                                    postId={post._id}
                                    image={post.postimageid}
                                    likes={post.likes}
                                    handleLikePost={this.handleLikePost}
                                    handleDeletePost={this.handleDeletePost}
                                    handleUpdatePostClick={
                                        this.handleUpdatePostClick
                                    }
                                    viewLikes={this.viewLikes}
                                /><br />
                            </div>
                        ))
                        }
                    </div >
                )
            } else {
                return (
                    <div className="text-center">
                        <h3 className="text-danger">
                            <i className="fa fa-exclamation-circle mr-4" />
                            No Posts
                        </h3>
                    </div>
                )
            }
        }
        catch (error) {
            return (
                <div className="text-center">
                    <h3 className="text-danger">
                        <i className="fa fa-exclamation-circle mr-4" />
                       Error in Loading Post!
                    </h3>
                </div>
            )
        }

    }

    handleTitleChange = (e) => {
        const { state: currentState } = this
        currentState.selectedPost.posttitle = e.target.value
        this.setState(currentState)
    }
    handleDescriptionChange = (e) => {
        const { state: currentState } = this
        currentState.selectedPost.postcontent = e.target.value
        this.setState(currentState)
    }
    handleFileChange = (e) => {
        const { state: currentState } = this
        currentState.selectedPost.file = e.target.files[0]
        this.setState(currentState)
    }

    handleCancel = () => {
        this.getAllPosts()
    }

    handleUpdate = async (postId) => {
        try {
            await callAPI('put', '/post', {
                data:
                    this.state.selectedPost
                //{  id: postId,
                // postcontent: this.selectedPost.postcontent,
                // posttitle: this.selectedPost.posttitle}


            })
            toast.success('Post Updated')
        } catch (error) {
            toast.error('Error in Updating the post')
        }
        this.getAllPosts()
    }
    onConfirm = async () => {
        try {
            let formData = new FormData();
            formData.append('file', this.state.selectedPost.file);
            formData.append('username', localStorage.getItem('name'))
            formData.append('postcontent', this.state.selectedPost.postcontent);
            formData.append('posttitle', this.state.selectedPost.posttitle);
            await callAPI('post', '/post', {
                data: formData
            })
            toast.success('Post Created')

            this.getAllPosts()
        } catch (error) {
            toast.error('Error in Creating Post')
        }
    }


    render() {
        const { state } = this
        const { selectedPost } = state
        return (
            <div>
                <NavBar />
                <div className="d-flex justify-content-between align-items-center float mt-2 mb-5">
                    <AddPostButton
                        data-toggle="modal"
                        data-target="#addPostModal"
                    />
                </div>
                <div className="m-5">
                    <ToastContainer />

                    <AddPostModal
                        onConfirm={this.onConfirm}
                        onCancel={this.handleCancel}
                        handleTitleChange={this.handleTitleChange}
                        handleDescriptionChange={this.handleDescriptionChange}
                        handleFileChange={this.handleFileChange}
                    />

                    <div
                        className="modal fade"
                        id="postUpdateModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="postUpdateModal"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="postUpdateModalLabel">
                                        Edit Post Details
									</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="ml-2">Title</label>
                                        <input
                                            type="text"
                                            value={selectedPost.posttitle}
                                            onChange={this.handleTitleChange}
                                            className="form-control"
                                            placeholder="Enter Title of the Post"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="ml-2">
                                            Content
										</label>
                                        <textarea
                                            className="form-control"
                                            value={selectedPost.postcontent}
                                            onChange={
                                                this.handleDescriptionChange
                                            }
                                            placeholder="Enter Content of the Post"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={this.handleCancel}>
                                        Cancel
									</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.handleUpdate}>
                                        Update
									</button>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div
                        className="modal fade"
                        id="viewLikeModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="postUpdateModal"
                        aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="postUpdateModalLabel">
                                        People who liked this Post
									</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">

                                        {this.state.likedUsersList.map((user, idx) => (
                                            <div>
                                                {user}
                                            </div>
                                        ))}

                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                            onClick={this.handleCancel}>
                                            Close
									</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this._renderPostCards()}
                </div>
            </div>
        );
    }
}

export default MyPostView;