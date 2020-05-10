import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

function PostCard(props) {
    return (
        <div className="card shadow mb-3 size"><br />
            <div align="center">{props.user} Posted on <Moment format="YYYY/MM/DD">{props.date}</Moment></div>
            <div className="card-body">
                <h4 className="card-title font-weight-bold">
                    {props.title}
                    {/* <i

                        className="fa text-violet fa-edit float-right clickable-icon"
                        data-toggle="modal"
                        data-target="#postUpdateModal"
                        onClick={() => {
                            props.handleUpdatePostClick(props.postId)
                        }}
                    /> */}
                </h4>
                <hr />
                <img src={`https://post-in-backend.herokuapp.com/post/download/${props.image}.png`} alt="No Image Preview" class="centerAlign" width="400" height="200" />
                <p className="card-text">{props.description}</p>
                <button className="link-button"
                    data-toggle="modal"
                    data-target="#viewLikeModal"

                    title="View Likes"
                    onClick={() =>
                        props.viewLikes(props.postId)
                    }>{props.likes}&nbsp;likes</button>

                {/* <div className="row">
                    <div className="col-6">
                        <Link
                            to={`issues/${props.postId}`}
                            className="btn btn-violet btn-block shadow"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="View Issues">
                            <i className="fas fa-eye mr-1" />
							View Issues
						</Link>
                    </div> */}
                <div className="row">
                    <div className="col-4">
                        {/* <button
                            className="btn btn-block btn-color"
                            onClick={() =>
                                props.handleLikePost(props.postId, localStorage.getItem('name'))
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Likes"> */}
                        <div className="style-icon">
                            <i class="fas fa-heart clickable-icon"
                                onClick={() =>
                                    props.handleLikePost(props.postId, localStorage.getItem('name'))
                                } data-toggle="tooltip"
                                data-placement="bottom"
                                title="Likes"
                            ></i>
                        </div>


                        {/* </button> */}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PostCard