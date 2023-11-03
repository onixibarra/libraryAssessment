// total book count
function getTotalBooksCount(books) {
  return books.length
}

// total accounts count
function getTotalAccountsCount(accounts) {
  return accounts.length
}

// total borrowed books
function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    const lastBorrow = book.borrows[0]
    if (!lastBorrow.returned) {
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  // Create a frequency map for genres
  const genreFrequency = books.reduce((genreMap, book) => {
    const { genre } = book;
    if (genreMap[genre]) {
      genreMap[genre]++
    } else {
      genreMap[genre] = 1
    }
    return genreMap;
  }, {})

  // Convert the frequency map into an array of objects
  const genreArray = Object.keys(genreFrequency).map((genre) => ({
    name: genre,
    count: genreFrequency[genre],
  }));

  // Sort the array by genre count in descending order
  genreArray.sort((a, b) => b.count - a.count)

  // Return the top 5 most common genres
  return genreArray.slice(0, 5)
}

function getMostPopularBooks(books) {
  // Create a list of books with their borrow counts
  const booksWithBorrowCounts = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));

  // Sort the list by borrow count in descending order
  booksWithBorrowCounts.sort((a, b) => b.count - a.count)

  // Return the top 5 most popular books
  return booksWithBorrowCounts.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
   // Create a list of authors with the total borrow count of their books
   const authorBorrowCounts = authors.map((author) => {
    const authorBooks = books.filter((book) => book.authorId === author.id)
    const borrowCount = authorBooks.reduce((count, book) => count + book.borrows.length, 0)
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: borrowCount,
    };
  });

  // Sort the list by borrow count in descending order
  authorBorrowCounts.sort((a, b) => b.count - a.count)

  // Return the top 5 most popular authors
  return authorBorrowCounts.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
