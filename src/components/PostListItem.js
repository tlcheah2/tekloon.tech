import React from "react";
import moment from "moment";
import Tag from './Tag';
import { navigate } from 'gatsby';

export default (props) => {
    const datePublished = new Date(props.publishedDate);
    const formattedPublishedDate = moment(props.publishedDate).format('YYYY-MM-DD')
    return (
        <div className="post-list-item-container" onClick={() => navigate(props.slug)}>
            <div className="post-list-item-header">
                <h2 className="post-title">{props.title}</h2>
                <p className="post-date">{formattedPublishedDate}</p>
            </div>
            <div className="tag-container">
                {props.tags && props.tags.map((tag) => <Tag tag={tag} />)}
                {props.keywords && props.keywords.map(({ name }) => <Tag tag={name} />)}
            </div>
        </div>
    )
};


