import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

export default class NewsContainer extends Component {
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87c2af5eef974645a5eefd0278ad8a0e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        let totalArticles = parsedData.totalResults;
        console.log(totalArticles);
        let pages = totalArticles / this.props.pageSize;
        console.log(pages);
        this.setState({
            articles: parsedData.articles,
            totalPages: pages,
            loading: false
        })
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalPages: 2
        }
    }

    previousPage = async () => {
        this.work(this.state.page - 1);
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87c2af5eef974645a5eefd0278ad8a0e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            // articles: parsedData.articles,
            // loading: false
        })
    }

    nextPage = async () => {
        this.work(this.state.page + 1);
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87c2af5eef974645a5eefd0278ad8a0e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            // articles: parsedData.articles,
            // loading: false
        })
    }

    work = async(page) => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87c2af5eef974645a5eefd0278ad8a0e&page=${page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        let totalArticles = parsedData.totalResults;
        let pages = totalArticles / this.props.pageSize;
        this.setState({
            articles: parsedData.articles,
            totalPages: pages,
            loading: false
        })
    }

    render() {
        return (
            <>
                {this.state.loading && <Loading />}
                <div className="container my-3">
                    <h2 id="heading">News of Today - Top Headlines</h2>
                    <div className="row my-3">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem title={element.title} description={element.description} author={element.author} datePublished={element.publishedAt} imageUrl={element.urlToImage} url={element.url} category={this.props.category}/>
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className={`btn btn-dark ${(this.state.page <= 1)? "invisible": null}`} onClick={this.previousPage}>&larr; Previous</button>
                        <button disabled={this.state.page >= this.state.totalPages} type="button" className={`btn btn-dark ${(this.state.page >= this.state.totalPages)? "invisible": null}`} onClick={this.nextPage}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}