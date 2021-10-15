import React from 'react'
import Throbber from './Throbber'
import CardGrid from './CardGrid'
import BookCard from './BookCard'
import { fetch_popular } from './BookApi'

class BookDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            books: [],
            error: false,
        }
        fetch_popular().then((result) => {
            this.setState({ books: result.results, loading: false });
        }).catch(() => {
            this.setState({ error: true });
        });
        

        // let observer = new IntersectionObserver((entries, observer)=>{console.log("Toggle");}, {});
        // let observing_item = document.getElementById("book-display-end");
        // console.log(observing_item);
        // observer.observe(observing_item);

    }

    render() {
        const display_error_msg = this.state.error ? "block" : "none";
        const display_throbber = this.state.loading && !this.state.error;

        return (
            <div className="container">
                <div className="alert alert-danger" role="alert" style={{ display: display_error_msg}}>
                    The API is currently unreachable. Please reach out to the site administrator.
                </div>
                <CardGrid card={BookCard} data={this.state.books} key_fn={(x) => { return x.id; }} />
                <div id="book-display-end" className="text-center">
                    <Throbber visible={display_throbber} size={"6rem"} />
                </div>
            </div>

        );
    }
}

export default BookDisplay
