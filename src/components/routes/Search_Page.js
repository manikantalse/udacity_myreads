import React from "react";
import * as BooksAPI from "../../BooksAPI";
import Book from "../Book";
import { Link } from "react-router-dom";

class Search_Page extends React.Component {


// initializing the state
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    };
  }

// request for getting all the book data from the server
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

// updating the state 
  updateQuery = query => {
    this.setState({ query: query }, () => this.submitSearch(query));
  };

// submitting the search keyword to the server
  submitSearch(query) {
    if (query === "" || query === undefined) {
      return this.setState({ results: [] });
    }

    // searching for the associated books
    BooksAPI.search(this.state.query.trim()).then(result => {

      if (result.error) {

        return this.setState({ results: [] });
      } else {

        result.forEach(book => {
          let filteredItems = this.state.books.filter(Book => Book.id === book.id);
          book.shelf = filteredItems.length>0 ? filteredItems.shelf : "none";

          if (filteredItems.length>0) {
            book.shelf = filteredItems[0].shelf;
          }
        });
        return this.setState({ results: result });
      }
    });
  }

  // request for updating the modified book status
  setBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat({ book })
      }));
    });
  };

  // finally rendering the whole thing
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* mapping each returned book with unique id */}
            {this.state.results.map((book, id) => <Book setBook={this.setBook} key={id} book={book}  />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search_Page; 