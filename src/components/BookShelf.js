import React from 'react';
import Book from './Book';

// Book Shelf component
class BookShelf extends React.Component {

    render() {
        return (  
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.name} </h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            { this.props.books.map((book, id) => <Book setBook={this.props.setBook} key={id} book={book} />) }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}
             
export default BookShelf; 