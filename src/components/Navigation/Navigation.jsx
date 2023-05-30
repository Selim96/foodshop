import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const setActiveLink = ({isActive})=> isActive ? `${s.navigation_link} ${s.active}` : s.navigation_link;

const Navigation = () => {

    return <nav className={s.navigation}>
        <NavLink to='/' className={setActiveLink} >Shop</NavLink>
        <NavLink to='/card' className={setActiveLink} >Shoping Card</NavLink>
        <NavLink to='/history' className={setActiveLink} >History</NavLink>
    </nav>
};

export default Navigation;