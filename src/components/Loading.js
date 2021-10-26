import React, { Component } from 'react'
import loading from './loading.gif'

export default class Loading extends Component {
    render() {
        return (
            <div className="text-center loading-gif">
                <img className="loading-img" src={loading} alt="loading" />
            </div>
        )
    }
}