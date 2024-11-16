let library = {
    books: [],
    id: 0,
    addBook: function(book) {
        this.books.push(book);
    },
    removeBook: function(title) {
        this.books = this.books.filter(book => book.title !== title);
    },
    changeAvailability: function(title) {
        let book = this.books.find(book => book.title === title);
        book.isAvailable = !book.isAvailable;
    },
    getAvailableBooks: function() {
        return this.books.filter(book => book.isAvailable);
    },
    findBookByAuthor: function(author) {
        return this.books.filter(book => book.author === author);
    },


}

library.addBook({title: "The great gatsby", author: "F. Scott Fitzgerald", year: 1925, isAvailable: true, id: library.id++})
library.addBook({title: "To kill a mockingbird", author: "Harper Lee", year: 1960, isAvailable: false, id: library.id++} )
library.changeAvailability('To kill a mockingbird')
library.removeBook('To kill a mockingbird')
library.addBook({title: 'harry potter 1', author: 'J.K. Rowling', year: 1997, isAvailable: true, id: library.id++})
library.addBook({title: 'harry potter 2', author: 'J.K. Rowling', year: 1997, isAvailable: true ,id: library.id++})
library.addBook({title: "The witcher", author: "A. Sabkovski", year: 2000, isAvailable: true ,id: library.id++})
library.changeAvailability('The witcher')
console.log(library.getAvailableBooks());
console.log(library.books);
console.log(library.findBookByAuthor('J.K. Rowling'))


