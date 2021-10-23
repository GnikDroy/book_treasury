import React from 'react';
import AlertBox from '../components/AlertBox';

function InvalidPage(props) {
    return (
        <div className="container text-center">
            <AlertBox visible={true} type="danger">
                <h1 className="display-1 my-5 py-5">404</h1>
                <h1 className="my-5">Sorry, the page you were looking for doesn't exist. </h1>
            </AlertBox>
        </div>
    );
}

export default InvalidPage;