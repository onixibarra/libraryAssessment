// finding authors using id
function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

// finding books using id
function findBookById(books, id) {
  return books.find(book => book.id === id)
}

// what the status is for books
function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(book => !book.borrows[0].returned)
  const returned = books.filter(book => book.borrows[0].returned)
  return [checkedOut, returned]
}

// locate borrower of a book
function getBorrowersForBook(book, accounts) {
  const { borrows } = book
  const borrowers = borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id)
    return { ...borrow, ...account }
  });
  return borrowers.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
