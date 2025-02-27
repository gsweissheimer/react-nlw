import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
    token?: string;
    pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ token, pageTitle }) => {
    return (
        <header className="top-bar">
            <div className='breadcrumbs'>
                <h1><Link to="/">Dashboard</Link></h1><h2>{pageTitle && ` > ${pageTitle}` }</h2>
            </div>
            <ul>
                <li>
                    <Link to={`/profile`}>Profile</Link>
                </li>
                {token && (
                    <li className="logout-link">
                        <Link to={`/logout`}>Logout</Link>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Header;
