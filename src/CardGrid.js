import React from 'react'
import Card from './Card'
import { fetch_popular } from "./BookApi"

class CardGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

        fetch_popular().then((result) => {
            this.setState({ books: result.results });
        }).catch(() => {
            console.log("Error!");
        });

    }

    render() {
        return (
            <div className="card-columns text-center">
                {this.state.books.map((x) => <Card key={x.id} book={x} />)}
            </div>
        );
    }
}

export default CardGrid

