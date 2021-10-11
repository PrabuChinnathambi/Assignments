import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';

function Home() {
    return (
        <div className="home_page">
            <div>
                <Navbar />
            </div>
            <div className="home_container">
                <div id="tv" className=" main_card home_leftCard">
                    <div>
                        <p>Part 1: </p>
                        <ul>
                            <li>Given json file to created a perfect Table</li>
                            <li>Using Material-Ui to styled all the things.</li>
                            <li>Axios use fetched all the data from JSON</li>
                            <li>Implemented pagination, sorting, searching and feilds wise filter</li>
                            <li>Created a api to get a maximum population data.</li>
                        </ul>
                    </div>
                </div>
                <div id="tv" className="main_card home_rightCard">
                    <div>
                        <p>Part 2: </p>
                        <ul>
                            <li>Using node js to created all the data modals in mongoDB </li>
                            <li>Imported the multer and created a diskstorage for storing MP4 data</li>
                            <li>Applied middleware authentication, Every api's are secured</li>
                            <li>User login and register api also implimented with JWT token</li>
                            
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home
