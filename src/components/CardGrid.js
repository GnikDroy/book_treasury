import React from 'react'
import PropTypes from 'prop-types';

/**
 * Grid like display of elements.
 *
 * @component
 */
function CardGrid(props) {
    return (
        <section className="container">
            <div className="row row-cols-4-lg g-4">
                {props.data.map((x) => <React.Fragment key={props.key_fn(x)}> {props.card(x)} </React.Fragment>)}
            </div>
        </section>
    );
}
CardGrid.propTypes = {
    /**
     * The Component to use to render each card.
     */
    card: PropTypes.elementType.isRequired,
    /**
     * The list of elements to display
     */
    data: PropTypes.array,
    /**
     * A function used to extract key from every item.
     * has the form `(item) => key`
     */
    key_fn: PropTypes.func.isRequired
}
CardGrid.defaultProps = { 
    data: [],
}


export default CardGrid

