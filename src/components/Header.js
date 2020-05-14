import React from 'react';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = ({ logout }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' activeClassName='is-active' exact={true} >Dashboard</NavLink>
        <NavLink to='/create' activeClassName='is-active' >Add Expense</NavLink>
        <NavLink to='/help' activeClassName='is-active' >Get Help</NavLink>
        <button onClick={logout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
