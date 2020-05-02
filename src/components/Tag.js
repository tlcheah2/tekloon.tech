import React from "react";

const tagStyle = {
    'javascript': { backgroundColor: '#F0DB4F', color: 'black' },
    'nodejs': { backgroundColor: '#68A063', color: 'white' },
    'angular': { backgroundColor: '#B52E31', color: 'white' },
}

export default (props) => {
    console.log('props', props);
    const style = tagStyle[props.tag];
    return (
        <div
            key={props.tag}
            className="post-tag" 
            style={ style }>
                {props.tag}
        </div>
    );
};