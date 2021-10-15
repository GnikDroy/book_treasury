import React from 'react'

/* <CardGrid card={Card} data={[]} key_fn={} /> */
function CardGrid(props) {
    return (
        <div className="container">
            <div className="row row-cols-4 g-4">
                {props.data.map((x) => <React.Fragment key={props.key_fn(x)}> {props.card(x)} </React.Fragment>)}
            </div>
        </div>
    );
}

export default CardGrid

