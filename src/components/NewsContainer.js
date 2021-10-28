import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component";


export default class NewsContainer extends Component {
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87c2af5eef974645a5eefd0278ad8a0e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87c2af5eef974645a5eefd0278ad8a0e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            loading: false,
            totalResults: parsedData.totalResults
        })
    };


    render() {
        return (
            <>
                {this.state.loading && <Loading />}
                <div className="container my-3">
                    <h2 id="heading">News of Today - Top Headlines</h2>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<span></span>}
                    >
                        <div className="container">
                            <div className="row my-3">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4 my-3" key={element.url}>
                                        <NewsItem title={element.title} description={element.description} author={element.author} datePublished={element.publishedAt} imageUrl={element.urlToImage} url={element.url} category={this.props.category} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}