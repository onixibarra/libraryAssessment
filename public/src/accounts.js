// find accounts using id. takes an array accounts and an id
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

// sorts an array of objects that sorts by last name in alphabetical order
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
}

// the function takes an account and an array of books. It should return total times the account appears in the borrow list
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrows, book) => {
    const borrows = book.borrows;
    const borrowCount = borrows.filter(borrow => borrow.id === accountId).length;
    return totalBorrows + borrowCount;
  }, 0);
}


/* function takes an array of account, books and authors. It should return an array of books that are currently checked
out by an account and each book object should include author info */
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id
  return books
    .filter((book) =>
      book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned)
    )
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId)
      return { ...book, author }
    })
}

module.exports =  {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
}