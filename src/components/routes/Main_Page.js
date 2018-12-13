import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from '../BookShelf';
import * as BooksAPI from '../../BooksAPI'

class Main_Page extends React.Component {

    // initializing the state
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    //async request for getting all the books
    componentDidMount() {
        BooksAPI.getAll().then(result => {
            this.setState({ books: result });
        });
    }

    //async request for updating the book to the server
    setBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf;
            this.setState(state => ({
                books: state.books.filter(item => item.id !== book.id).concat(book)
            }));
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {/* Currently reading shelf */}<BookShelf setBook={this.setBook} books={this.state.books.filter(books => books.shelf === 'currentlyReading') } name="Currently Reading" />
                        {/* Want to read shelf */}<BookShelf setBook={this.setBook} books={this.state.books.filter(books => books.shelf === 'wantToRead') } name="Want To Read" />
                        {/* Already read shelf */}<BookShelf setBook={this.setBook} books={this.state.books.filter(books => books.shelf === 'read') } name="Read" />
                    </div>
                </div>
                <div className="open-search">
                    <Link className="open-search" to='/search'></Link>{/* Add a new book Link */}
                </div>
            </div>
        );
    }
}

export default Main_Page; 