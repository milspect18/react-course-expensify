// Exploring Higher Order Components (HOC)

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>WARNING: Private Info</p>}
            <WrappedComponent {...props} />
        </div>
    );
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Must log in to view this!</p>}
        </div>
    );
}

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info='Poops McGee' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='Info Dinfo' />, document.getElementById('app'));
