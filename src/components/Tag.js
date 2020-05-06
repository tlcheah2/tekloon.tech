import React from "react";

const tagStyle = {
    'javascript': { backgroundColor: '#F0DB4F', color: 'black' },
    'nodejs': { backgroundColor: '#68A063', color: 'white' },
    'angular': { backgroundColor: '#B52E31', color: 'white' },
    'gatsby': { backgroundColor: '#663399', color: 'white'},
    'css': { backgroundColor: '#2965f1', color: 'white', textTransform: 'uppercase' },
    'cli': { backgroundColor: 'var(--textNormal)', color: 'var(--bg)', textTransform: 'uppercase' },


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