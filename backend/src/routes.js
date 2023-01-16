const express = require('express');

const AuthorsControllers = require('./controllers').AuthorsControllers;
const BooksControllers = require('./controllers').BooksControllers;
const ReadersControllers = require('./controllers').ReadersControllers;
const SubscriptionsControllers = require('./controllers').SubscriptionsControllers;
const BorrowedControllers = require('./controllers').BorrowedControllers;

const router = express.Router();

router.get('/authors', AuthorsControllers.getAuthors);
router.get('/authors/:authorName', AuthorsControllers.getAuthor);
router.post('/authors/:authorName', AuthorsControllers.createAuthor);
router.put('/authors/:authorOldName', AuthorsControllers.updateAuthor);
router.delete('/authors/:authorId', AuthorsControllers.deleteAuthor);

router.get('/books', BooksControllers.getBooks);
router.get('/books/:bookName', BooksControllers.getBook);
router.post('/books/:bookName', BooksControllers.createBook);
router.put('/books/:bookOldName', BooksControllers.updateBook);
router.delete('/books/:bookId', BooksControllers.deleteBook);

router.get('/readers', ReadersControllers.getReaders);
router.get('/readers/:readerName', ReadersControllers.getReader);
router.post('/readers/:readerName', ReadersControllers.createReader);
router.put('/readers/:readerOldName', ReadersControllers.updateReader);
router.delete('/readers/:readerId', ReadersControllers.deleteReader);

router.get('/subscriptions', SubscriptionsControllers.getSubscriptions);
router.get('/subscriptions/:subscriptionId', SubscriptionsControllers.getSubscription);
router.post('/subscriptions', SubscriptionsControllers.createSubscription);
router.put('/subscriptions/:subscriptionId', SubscriptionsControllers.updateSubscription);
router.delete('/subscriptions/:subscriptionId', SubscriptionsControllers.deleteSubscription);

router.get('/borrowed', BorrowedControllers.getAllBorrowed);
router.get('/borrowed/:readerId', BorrowedControllers.getBorrowed);
router.post('/borrowed', BorrowedControllers.createBorrowed);
router.put('/borrowed/:bookId', BorrowedControllers.updateBorrowed);
router.delete('/borrowed/:bookId', BorrowedControllers.deleteBorrowed);

module.exports = router;