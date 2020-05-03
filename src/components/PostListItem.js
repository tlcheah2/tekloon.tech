import React from "react";
import Tag from './Tag';
import { navigate } from 'gatsby';

export default (props) => (
    <div className="post-list-item-container" onClick={() => navigate(props.slug)}>
        <div className="post-list-item-header">
            <h2 className="post-title">{props.title}</h2>
            <p className="post-date">{props.publishedDate}</p>
        </div>
        <div className="tag-container">
            {props.tags.map((tag) => <Tag tag={tag} />)}
        </div>        
    </div>
 );

    
