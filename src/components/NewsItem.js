import React from 'react'

export default function NewsItem(props) {
    let { title, description, author, datePublished, imageUrl, url, category } = props
    return (
        <div id="newsItem" className="card">
            <img id="newsImage" src={(imageUrl === null) ? `https://source.unsplash.com/1600x900/?${category}` : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p id="newDescription" className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">{(author === null) ? "Anonymous" : author} - {new Date(datePublished).toGMTString()}</small></p>
                <a href={url} target="-blank" className="btn btn-primary">Read More</a>
            </div>
        </div>
    )
}