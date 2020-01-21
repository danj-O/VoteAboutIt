import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    render () {
        return (
            <nav className="navbar">
                <Link to="/" className="">Vote On It</Link>
                <div>
                    <ul>
                        <li className="navbar-item">
                            <Link to="/"> Polls </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create"> Create Poll </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user"> Create User </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar