import React from 'react';

// Book Component
class Book extends React.Component {
    render() {
        // checking if there is any associated book thumnail or not
        const url = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : "" ;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${url})` }}></div>{/* thumbnail url */}
                        <div className="book-shelf-changer">
                            <select value={this.props.book.shelf || "None"} onChange={(e) => { this.props.setBook(this.props.book, e.target.value) }}> {}
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>{/* title */}
	                <div className="book-authors">{this.props.book.authors}</div>{/* author */}
                </div>
            </li>
        );
    }
}

export default Book;
