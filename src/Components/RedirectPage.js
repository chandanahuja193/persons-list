import React, { Component } from 'react';
import { Redirect} from "react-router-dom";

class RedirectPage extends Component {
    render() {
            if(!localStorage.getItem('token'))
            return <Redirect to="/login" />
            else{
            return <Redirect to="/dashboard" />
            }
    }
}

export default RedirectPage;
