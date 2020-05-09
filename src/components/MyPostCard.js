import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

function MyPostCard(props) {
    return (
        <div className="card shadow mb-3 size"><br />


            <div align="center">{props.user} Posted on <Moment format="YYYY/MM/DD">{props.date}</Moment></div>
            <div className="card-body">
                <h4 className="card-title font-weight-bold">
                    {props.title}

                    <i

                        className="fa text-violet fa-edit floatright clickable-icon"
                        data-toggle="modal"
                        data-target="#postUpdateModal"
                        onClick={() => {
                            props.handleUpdatePostClick(props.postId)
                        }}
                    />
                    <i className="fa fa-trash clickable-icon float-right" onClick={() =>
                        props.handleDeletePost(props.postId)
                    }
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Delete post" />
                </h4>
                <hr />
                <img src={`http://localhost:4000/post/download/${props.image}.png`} alt="No Image Preview" class="centerAlign" width="400" height="200" />
                <p className="card-text">{props.description}</p>
                <button className="link-button"
                    data-toggle="modal"
                    data-target="#viewLikeModal"
                    onClick={() =>
                        props.viewLikes(props.postId)
                    }>{props.likes}&nbsp;likes</button>


                <div className="row">
                    <div className="col-4">

                        <div className="style-icon">
                            <i class="fas fa-heart clickable-icon"
                                onClick={() =>
                                    props.handleLikePost(props.postId, localStorage.getItem('name'))
                                } data-toggle="tooltip"
                                data-placement="bottom"
                                title="Likes"
                            ></i>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MyPostCard