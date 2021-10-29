import Loading from './Loading';
import NewsItem from './NewsItem';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";


export default function NewsContainer(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    useEffect( async() => {
        document.title = sentenceCase() + " - News of Today";
        fun();
    }, [])

    const sentenceCase = () => {
        let str = props.category;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const fun = async () => {
        setLoading(true);

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=1&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
    }

    const fetchMoreData = async () => {
        setLoading(true);
        // setPage(page + 1); as this is not asynchronous and it also takes time, which leads to not updating 
                            // variable in time, hence we see duplicate data, because of same url,["page" here]

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setPage(page + 1);
        setArticles(articles.concat(parsedData.articles));
        setLoading(false);
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            {loading && <Loading />}
            <div className="container">
                <div id="heading"><h2>{`News of Today - Top ${sentenceCase()} Headlines`}</h2></div>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                // loader={<h2>Loading...</h2>}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} author={element.author} datePublished={element.publishedAt} imageUrl={element.urlToImage} url={element.url} category={props.category} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}