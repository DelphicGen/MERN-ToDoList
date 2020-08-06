import React from 'react';
import logo from '../img/logo.png';

const Sidebar = ({ active, setActive }) => {
    

    return (
        <React.Fragment>
            <img className="logo" src={logo} alt="logo" />
            <div className="sidebar">

                <a href="#" className={`${active === "today" && 'active'} today`} onClick={() => setActive('today')}>Today</a>
                <div className="today-after"></div>
                <a href="#" className={`${active === "upcoming" && 'active'} upcoming`} onClick={() => setActive('upcoming')}>Upcoming</a>
                <div className="upcoming-after"></div>
                <a href="#" className={`${active === "completed" && 'active'} completed`} onClick={() => setActive('completed')}>Completed</a>
                <div className="completed-after"></div>

            </div>
        </React.Fragment>
    )
}

export default Sidebar



