import React, {useContext} from 'react'
import {NavLink,useHistory} from "react-router-dom";
import {AuthContext, RoleAdmin} from "../../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/login')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">Task Tracker</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/items">Items</NavLink></li>
                    {auth.isAuthenticated && auth.role === RoleAdmin &&
                        <li><NavLink to="/admin">Admin Panel</NavLink></li>
                    }
                    <li><a href="/login" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}