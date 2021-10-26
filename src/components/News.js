import React, { Component } from 'react'

export default class News extends Component {
    articles = [
        {
            "source": {
                "id": "reuters",
                "name": "Reuters"
            },
            "author": "Epic Games",
            "title": "Epic Games opposes Apple's effort to pause antitrust trial orders - Reuters",
            "description": "\"Fortnite\" creator Epic Games on Friday opposed Apple Inc's <a href=\"https://www.reuters.com/companies/AAPL.O\" target=\"_blank\">(AAPL.O)</a> efforts to put on hold orders handed down in an antitrust trial as a potentially lengthy appeals process plays out.",
            "url": "https://www.reuters.com/technology/epic-games-opposes-apples-effort-pause-antitrust-trial-orders-2021-10-23/",
            "urlToImage": "https://www.reuters.com/resizer/bJpsfUpq9E0O120Trv8dDocHERo=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/5MMQYJP6E5JEPJUM27D5U2HSUM.jpg",
            "publishedAt": "2021-10-23T03:37:00Z",
            "content": "Smartphone with Epic Games logo is seen in front of Apple logo in this illustration taken, May 2, 2021. REUTERS/Dado Ruvic/Illustration/File PhotoOct 22 (Reuters) - \"Fortnite\" creator Epic Games on To auto-resize an image or a video to fit in a div container use object-fit property. It is used to specify how an image or video fits in the container. This property is used to specify how an image or video resize and fit the container. It tells the content how to fit in a specific div container in various way such as preserve that aspect ratio or stretch up and take up as much space as possible. Smartphone with Epic Games logo is seen in front of Apple logo in this illustration taken, May 2, 2021. REUTERS/Dado Ruvic/Illustration/File PhotoOct 22 (Reuters) - \"Fortnite\" creator Epic Games on To auto-resize an image or a video to fit in a div container use object-fit property. It is used to specify how an image or video fits in the container. This property is used to specify how an image or video resize and fit the container. It tells the content how to fit in a specific div container in various way such as preserve that aspect ratio or stretch up and take up as much space as possible. Smartphone with Epic Games logo is seen in front of Apple logo in this illustration taken, May 2, 2021. REUTERS/Dado Ruvic/Illustration/File PhotoOct 22 (Reuters) - \"Fortnite\" creator Epic Games on To auto-resize an image or a video to fit in a div container use object-fit property. It is used to specify how an image or video fits in the container. This property is used to specify how an image or video resize and fit the container. It tells the content how to fit in a specific div container in various way such as preserve that aspect ratio or stretch up and take up as much space as possible."
        }
    ]
    constructor() {
        super();
        this.state = {
            articles: this.articles
        }
    }

    render() {
        return (
            <div className="container my-3">
                {this.state.articles.map((element) => {
                    return <div className="news-card">
                        <h5 className="news-card-title">{element.title}</h5>
                        <small>{element.author} | {element.publishedAt}</small>
                        <div className="news-card-img-div">
                            <img src={element.urlToImage} className="news-card-img" alt="..." />
                        </div>
                        <div className="news-card-body">
                            <p className="news-card-text">{element.content}</p>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}
