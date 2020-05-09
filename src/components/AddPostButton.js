import React from 'react'

function AddPostButton(props) {
    return (
        <span {...props}>
            <button
                className="btn btn-outline-violet pill-button text-violet shadow floatright"
                onClick={props.onClick}>
                <i className="fa fa-plus mr-2" /> Add Post
			</button>
        </span>
    )
}

export default AddPostButton