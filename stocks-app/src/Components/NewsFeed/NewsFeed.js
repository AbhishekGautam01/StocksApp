import React from 'react'
import LineGraph from './LineGraph/LineGraph';
import TimeLine from './TimeLine/TimeLine';
import './NewsFeed.css'

function NewsFeed() {
    return (
        <div className="newsfeed">
            <div className="newsfeed__container">
                <div className="newsfeed__chartSection">
                    <div className="newsfeed__portfolio">
                    <h1>$140,000.00</h1>
                    <p>+41.63 (+0.04%) Today</p>
                    </div>
                    <div className="newsfeed__chart">
                        <LineGraph />
                        <TimeLine />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsFeed
