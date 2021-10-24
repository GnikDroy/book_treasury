import React from 'react';
import PropTypes from 'prop-types';

import { title } from './Header';

/**
 * Component for wrapping pages
 *
 * @component
 */
const Page = (props) => {
    React.useEffect(() => {
        document.title = props.title;
    }, [props.title,]);
    return props.children;
};

Page.propTypes = {
    /**
     * Title of the page.
     */
    title: PropTypes.string,
}

Page.defaultProps = {
    title: title,
}


export default Page;