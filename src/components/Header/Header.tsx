import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

interface HeaderProps {
    token?: string;
    pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ token, pageTitle }) => {
    return (
        <header className={style.topbar}>
            <div className={style.breadcrumbs}>
                <h1><Link to="/">Dashboard</Link></h1><h2>{pageTitle && ` > ${pageTitle}` }</h2>
            </div>
            <ul>
                <li>
                    <Link to={`/profile`}>Profile</Link>
                </li>
                {token && (
                    <li className={style.logoutLink}>
                        <Link to={`/logout`}>Logout</Link>
                    </li>
                )}
                {!token && (
                    <li className={style.logoutLink}>
                        <Link to={`/login`}>Login</Link>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Header;
