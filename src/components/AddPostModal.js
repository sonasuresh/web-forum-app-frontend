import React from 'react'

function AddPostModal(props) {
    return (
        <div
            className="modal fade"
            id="addPostModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addPostModal"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="AddPostModalLabel">
                            Add New Post
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
                                className="form-control"
                                placeholder="Enter Title of the Post"
                                onChange={props.handleTitleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="ml-2">Content</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter content of the Post"
                                onChange={props.handleDescriptionChange}
                            />
                        </div>
                        <div

                        >
                            <label className="ml-2">Post</label><br />
                            <input type="file"
                                name="file"
                                accept="image/png, image/jpeg" onChange={props.handleFileChange}></input>
                        </div>
                        {/* <div className="form-group">
                            <label className="ml-2">Post</label>
                            <input type="file"
                                className="form-control"
                                accept="image/png, image/jpeg" onChange={props.handleFileChange} />
                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={props.onCancel}>
                            Cancel
						</button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={props.onConfirm}>
                            Confirm
						</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPostModal