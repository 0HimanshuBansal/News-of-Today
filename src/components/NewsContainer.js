import Loading from './Loading';
import NewsItem from './NewsItem';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

export default function NewsContainer(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    useEffect(() => {
        document.title = sentenceCase() + " - News of Today";
        fetchData();
    }, [])

    const sentenceCase = () => {
        let str = props.category;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fetchData = async () => {
        setLoading(true);
        const newsCatcher = `https://api.newscatcherapi.com/v2/latest_headlines?countries=${props.country}&topic=${props.category}&page=1&page_size=${props.pageSize}&lang=en`
        const url = newsCatcher;
        const data = await fetch(url, {
            "headers": {
                "x-api-key": props.api
            }
        });
        const parsedData = await data.json();

        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.total_pages)
    }

    const fetchMoreData = async () => {
        setLoading(true);
        const newsCatcher = `https://api.newscatcherapi.com/v2/latest_headlines?countries=${props.country}&topic=${props.category}&page=${page + 1}&page_size=${props.pageSize}&lang=en`

        const url = newsCatcher;
        const data = await fetch(url, {
            "headers": {
                "x-api-key": props.api
            }
        });
        const parsedData = await data.json();
        setPage(page + 1);
        setArticles(articles.concat(parsedData.articles));
        setLoading(false);
        setTotalResults(parsedData.total_pages)
    };

    const randomTitleSubstring = (title) => {
        const titleArray = title.split(' ');
        return titleArray[4];
    }
    return (
        <>
            {loading && <Loading />}
            <div className="container">
                <div id="heading"><h2>{`News of Today - Top ${sentenceCase()} Headlines`}</h2></div>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, i) => {
                                return <div className="col-md-4 my-3" key={i}>
                                    <NewsItem key={element.url} title={element.title} description={element.excerpt} author={element.author} datePublished={element.published_date} imageUrl={element.media} url={element.link} category={props.category} nullImage={`${randomTitleSubstring(element.title)}`} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}