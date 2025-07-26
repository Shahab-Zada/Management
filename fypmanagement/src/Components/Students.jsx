import React from 'react';
import Marks from './Marks';
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const loggedInStudent = localStorage.getItem('name'); 

    return (
       <div>
            <Marks name={loggedInStudent} />
        </div>
    );
};

export default Dashboard;
