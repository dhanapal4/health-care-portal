import { useState } from 'react'
import './Home.css'

function Home() {

    const handleClick = () => {
        window.open('https://www.bing.com', '_blank', 'noopener,noreferrer')
    }
    return (
        <div className="news-home">
            <h1>Latest Health Information</h1>

            <div className="boxes">
                <div className="card">
                    <h2>COVID-19 Updates</h2>
                    <p>Stay informed with the latest COVID-19 news and guidelines.</p>
                    <button onClick={handleClick}>Read More</button>
                </div>

                <div className="card">
                    <h2>Seasonal Flu Prevention</h2>
                    <p>Tips and resources to protect yourself from the flu this season.</p>
                    <button onClick={handleClick}>Read More</button>
                </div>

                <div className="card">
                    <h2>Mental Health Awareness</h2>
                    <p>Learn about mental health resources and support.</p>
                    <button onClick={handleClick}>Read More</button>
                </div>

                <div className="card">
                    <h2>Nutrition Tips</h2>
                    <p>Discover healthy eating habits and recipes.</p>
                    <button onClick={handleClick}>Read More</button>
                </div>
            </div>
        </div>
    )
}

export default Home