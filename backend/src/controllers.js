const Authors = require('./models/authorsModel').Authors;
const Books = require('./models/authorsModel').Books;
const Readers = require('./models/authorsModel').Readers;
const Subscriptions = require('./models/authorsModel').Subscriptions;
const Borrowed = require('./models/authorsModel').Borrowed;

class AuthorsControllers {
    static getAuthors = async (req, res) => {
        const result = await Authors.findAll();
        // const result = await AuthorsModel.getAllAuthors();
        res.status(200).json({ result: result });
    }

    static getAuthor = async (req, res) => {
        const authorName = req.body.authorName;
        const result = Authors.findOne({ where: { name: authorName } });
        // const result = await AuthorsModel.getAuthor(authorName);
        res.status(200).json({ result: result });
    }

    static createAuthor = async (req, res) => {
        const authorName = req.params.authorName;
        try {
            const result = await Authors.create({ name: authorName });
            // const result = await AuthorsModel.createAuthor(authorName);
            res.status(200).json({ message: "Створено автора з ім'ям " + authorName });
        } catch (e) {
            if (e.message == `повторювані значення ключа порушують обмеження унікальності "authors_name_key"`)
                res.status(404).json({ message: "Автор з таким ім'ям вже існує, створіть нового!" });
        }
    }

    static updateAuthor = async (req, res) => {
        const authorOldName = req.params.authorOldName;
        const authorNewName = req.query.authorNewName;
        try {
            const result = await Authors.update({ name: authorNewName }, { where: { name: authorOldName } });
            // const result = await AuthorsModel.updateAuthor(authorOldName, authorNewName);
            if (result[0] == 0)
                return res.status(404).json({ message: `Не вдалося знайти автора за ім'ям "${authorOldName}", перевірте правильність вводу! Можливо ви переплутали регістр або розкладку клавіатури!` })
            res.status(200).json({ result: "Ім'я автора " + authorOldName + " змінено на " + authorNewName });
        } catch (e) {
            if (e.message == `повторювані значення ключа порушують обмеження унікальності "authors_name_key"`)
                res.status(404).json({ message: `Автор з ім'ям ${authorNewName} вже існує, змініть ім'я на інше!` });
        }
    }

    static deleteAuthor = async (req, res) => {
        const authorId = req.params.authorId;
        // const result = await AuthorsModel.deleteAuthor(authorId);
        const result = await Authors.destroy({ where: { author_id: authorId } });
        if (result == 0)
            return res.status(404).json({ result: `Автора з id ${authorId} не існувало, нікого не було видалено!` });
        res.status(200).json({ result: `Видалено автора з id ${authorId} а також усі книги, де був указаний цей автор!` });
    }
}


class BooksControllers {
    static getBooks = async (req, res) => {
        const result = await Books.findAll();
        console.log(result);
        // const result = await BooksModel.getAllBooks();
        res.status(200).json({ result: result });
    }

    static getBook = async (req, res) => {
        const bookName = req.params.bookName;
        const result = Books.findOne({ where: { name: bookName } });
        // const result = await BooksModel.getBookByName(bookName);
        res.status(200).json({ result: result });
    }

    static createBook = async (req, res) => {
        const bookName = req.params.bookName;
        const genre = req.query.genre;
        const authorId = req.query.authorId;
        try {
            const result = await Books.create({ name: bookName, genre: genre, author_id: authorId });
            // const result = await BooksModel.createBook(bookName, genre, authorId);
            res.status(200).json({ result: `Створено нову книгу з назвою "${bookName}", жанр - ${genre}, id автора - ${authorId}!` });
        } catch (e) {
            if (e.message == `insert або update в таблиці "books" порушує обмеження зовнішнього ключа "books_author_id_fkey"`)
                res.status(404).json({ message: `Автора з введеним author_id = ${authorId} не існує, введіть існуючий author_id!` });
        }
    }

    static updateBook = async (req, res) => {
        const bookOldName = req.params.bookOldName;
        const bookNewName = req.query.bookNewName;
        const newGenre = req.query.newGenre;
        const newAuthorId = req.query.newAuthorId;
        try {
            const result = await Books.update({ name: bookNewName, genre: newGenre, author_id: newAuthorId }, { where: { name: bookOldName } });
            // const result = await BooksModel.updateBook(bookOldName, bookNewName, newGenre, newAuthorId);
            if (result[0] == 0)
                return res.status(404).json({ message: `Не вдалося знайти книгу за ім'ям "${bookOldName}", перевірте правильність вводу! Можливо ви переплутали регістр або розкладку клавіатури!` });
            res.status(200).json({ result: `Інформація про книгу оновлена! Нова назва - "${bookNewName}", жанр - ${newGenre}, id автора - ${newAuthorId}` });
        } catch (e) {
            if (e.message == `insert або update в таблиці "books" порушує обмеження зовнішнього ключа "books_author_id_fkey"`)
                res.status(404).json({ message: `Автора з введеним author_id = ${newAuthorId} не існує, введіть існуючий author_id!` });
        }
    }

    static deleteBook = async (req, res) => {
        const bookId = req.params.bookId;
        const result = await Books.destroy({ where: { book_id: bookId } });
        // const result = await BooksModel.deleteBook(bookId);
        if (result == 0) {
            return res.status(404).json({ message: `Книги з id ${bookId} не знайдено, нічого не було видалено!` });
        }
        res.status(200).json({ message: `Видалено книгу з id ${bookId}!` });
    }
}


class ReadersControllers {
    static getReaders = async (req, res) => {
        const result = await Readers.findAll();
        // const result = await ReadersModel.getAllReaders();
        res.status(200).json({ result: result });
    }

    static getReader = async (req, res) => {
        const readerName = req.params.readerName;
        const result = Readers.findOne({ where: { name: readerName } });
        // const result = await ReadersModel.getReaderByName(readerName);
        if (result.rowCount == 0)
            return res.status(404).json({ message: `Читача з ім'ям ${readerName} не знайдено, перевірте правильність вводу!` })
        res.status(200).json({ reuslt: result });
    }

    static createReader = async (req, res) => {
        const readerName = req.params.readerName;
        const phone = req.query.phone;
        const address = req.query.address;
        const result = await Readers.create({ name: readerName, phone: phone, address: address });
        // const result = await ReadersModel.createReader(readerName, phone, address);
        res.status(200).json({ result: `Створено нового користувача з ім'ям: ${readerName}, телефоном: ${phone}, та адресою: ${address}` });
    }

    static updateReader = async (req, res) => {
        const readerOldName = req.params.readerOldName;
        const readerNewName = req.query.readerNewName;
        const newPhone = req.query.newPhone;
        const newAddress = req.query.newAddress;
        const result = await Readers.update({ name: readerNewName, phone: newPhone, address: newAddress }, { where: { name: readerOldName } });
        // const result = await ReadersModel.updateReader(readerOldName, readerNewName, newPhone, newAddress);
        if (result[0] == 0)
            return res.status(404).json({ message: `Не вдалося знайти читача за ім'ям ${readerOldName}, перевірте правильність вводу!` });
        res.status(200).json({ result: `Інформація про читача оновлена! Нове ім'я: ${readerNewName}, телефон: ${newPhone}, адреса: ${newAddress}` });
    }

    static deleteReader = async (req, res) => {
        const readerId = req.params.readerId;
        const result = await Readers.destroy({ where: { reader_id: readerId } });
        // const result = await ReadersModel.deleteReader(readerId);
        if (result == 0)
            return res.status(404).json({ message: `Користувача з id ${readerId} не було видалено оскільки його не існувало!` });
        res.status(200).json({ result: `Видалено читача з id ${readerId}!` });
    }
}


class SubscriptionsControllers {
    static getSubscriptions = async (req, res) => {
        const result = await Subscriptions.findAll();
        // const result = await SubscriptionsModel.getAllSubscriptions();
        res.status(200).json({ result: result });
    }

    static getSubscription = async (req, res) => {
        const subscriptionId = req.params.subscriptionId;
        const result = Subscriptions.findOne({ where: { subscription_id: subscriptionId } });
        // const result = await SubscriptionsModel.getSubscriptionById(subscriptionId);
        if (result == 0)
            return res.status(404).json({ message: `Абонемента з id = ${subscriptionId} не існує!` });
        res.status(200).json({ result: result });
    }

    static createSubscription = async (req, res) => {
        const { issueDate, delayDate, readerId } = req.body;
        try {
            console.log('creating sub');
            const result = await Subscriptions.create({ issue_date: issueDate, delay_date: delayDate, reader_id: readerId });
            // const result = await SubscriptionsModel.createSubscription(issueDate, delayDate, readerId);
            res.status(200).json({ message: `Створено новий абонемент: дата створення - ${issueDate}, дата просрочення - ${delayDate}, id читача = ${readerId}!` });
        } catch (e) {
            console.log(e.message)
            if (e.message == `Validation error: Issue_before_delay_validation not passed`)
                res.status(404).json({ message: `Дата просрочення "${delayDate}" не може бути пізніше за дату видачі "${issueDate}" абонемента!` });
            if (e.message == `insert або update в таблиці "subscriptions" порушує обмеження зовнішнього ключа "subscriptions_reader_id_fkey"`)
                res.status(404).json({ message: `Читача зі вказаним id = ${readerId} не існує, введіть id існуючого користувача!` });
            if (e.message == `повторювані значення ключа порушують обмеження унікальності "subscriptions_reader_id_key"`)
                res.status(404).json({ message: `Читач зі вказанним id = ${readerId} вже має абонемент! У кожного читача може бути тільки 1 абонемент!` });
        }
    }

    static updateSubscription = async (req, res) => {
        const subscriptionId = req.params.subscriptionId;
        const { oldIssueDate, newDelayDate } = req.body;
        try {
            const result = await Subscriptions.update({ delay_date: newDelayDate, issue_date: oldIssueDate }, { where: { subscription_id: subscriptionId } });
            // const result = await SubscriptionsModel.updateSubscription(subscriptionId, newDelayDate);
            if (result[0] == 0)
                return res.status(404).json({ message: `Не вийшло оновити інформацію про абонемент з id = ${subscriptionId}` });
            res.status(200).json({ message: `Оновлено інформацію про абонемент з id = ${subscriptionId}, нова дата просрочення: ${newDelayDate}` });
        } catch (e) {
            console.log(e.message)
            if (e.message == `Validation error: Issue_before_delay_validation not passed`)
                res.status(404).json({ message: `Нова дата просрочення "${newDelayDate}" не може бути раніше, ніж дата видачи цього абонімента! Введіть іншу дату!` });
        }
    }

    static deleteSubscription = async (req, res) => {
        const subscriptionId = req.params.subscriptionId;
        const result = await Subscriptions.destroy({ where: { subscription_id: subscriptionId } });
        // const result = await SubscriptionsModel.deleteSubscription(subscriptionId);
        if (result == 0)
            return res.status(404).json({ message: `Абонемент з id = ${subscriptionId} не було видалено, оскільки його не існувало!` });
        res.status(200).json({ message: `Абонемент з id = ${subscriptionId} успішно видалено!` });
    }
}


class BorrowedControllers {
    static getAllBorrowed = async (req, res) => {
        const result = await Borrowed.findAll();
        // const result = await BorrowedModel.getAllBorrowed();
        res.status(200).json({ result: result });
    }

    static getBorrowed = async (req, res) => {
        const readerId = req.params.readerId;
        const bookId = req.query.bookId;
        const result = Borrowed.findOne({ where: { reader_id: readerId } });
        // const result = await BorrowedModel.getBorrowedById(readerId, bookId);
        if (result.rowCount == 0)
            return res.status(404).json({ message: `Шукана позика за id_читача = ${readerId} та id_книги = ${bookId} не існує!` });
        res.status(200).json({ result: result.rows });
    }

    static createBorrowed = async (req, res) => {
        const { readerId, bookId, borrowDate, returnDate } = req.body;
        try {
            const result = await Borrowed.create({ reader_id: readerId, book_id: bookId, borrow_date: borrowDate, return_date: returnDate });
            // const result = await BorrowedModel.createBorrowed(readerId, bookId, borrowDate, returnDate);
            res.status(200).json({ message: `Успішно створено позичення користувачем з id = ${readerId} книги з id = ${bookId}. Дата позичення: "${borrowDate}", дата повернення: "${returnDate}"` });
        } catch (e) {
            if (e.message == `insert або update в таблиці "borroweds" порушує обмеження зовнішнього ключа "borroweds_reader_id_fkey"`)
                res.status(404).json({ message: `Користувача з введеним id = ${readerId} не існує, введіть id існуючого користувача` });
            if (e.message == `insert або update в таблиці "borroweds" порушує обмеження зовнішнього ключа "borroweds_book_id_fkey"`)
                res.status(404).json({ message: `Книги з введеним id = ${bookId} не існує, введіть id існуючої книги!` });
            if (e.message == `повторювані значення ключа порушують обмеження унікальності "borroweds_book_id_key"`)
                res.status(404).json({ message: `Книга з введеним id = ${bookId} вже позичена якимось читачем, введіть id книги яку ще ніхто не позичів!` });
            if (e.message == `Validation error: Borrow_before_return_validation not passed`)
                res.status(404).json({ message: `Введена дата позичення "${borrowDate}" має бути раніше за дату повернення "${returnDate}"!` });
            if (e.message == `повторювані значення ключа порушують обмеження унікальності "borroweds_pkey"`)
                res.status(404).json({ message: `Користувач з id = ${readerId} вже позичів книгу з id = ${bookId}, введіть новий запис!` });
        }
    }

    static updateBorrowed = async (req, res) => {
        const bookId = req.params.bookId;
        const { oldBorrowDate, newReturnDate } = req.body;
        try {
            const result = await Borrowed.update({ borrow_date: oldBorrowDate, return_date: newReturnDate }, { where: { book_id: bookId } });
            // const result = await BorrowedModel.updateBorrowed(bookId, newReturnDate);
            res.status(200).json({ message: `У записі позичення книги з id = ${bookId} успішно оновлена дата повернення: "${newReturnDate}"` });
        } catch (e) {
            console.log(e.message);
            if (e.message == `Validation error: Borrow_before_return_validation not passed`)
                res.status(404).json({ message: `Неможливо встановити нову дату повернення "${newReturnDate}" у записі позичення книги з id = ${bookId}, оскільки дата повернення не може бути раніше за дату позичення` });
        }
    }

    static deleteBorrowed = async (req, res) => {
        const bookId = req.params.bookId;
        const result = await Borrowed.destroy({ where: { book_id: bookId } });
        // const result = await BorrowedModel.deleteBorrowed(bookId);
        if (result == 0)
            return res.status(404).json({ message: `Записа позичення книги з id = ${bookId} не було видалено, оскільки його не існувало` });
        res.status(200).json({ message: `Запис позичення книги з id = ${bookId} успішно видалено` });
    }
}

module.exports.AuthorsControllers = AuthorsControllers;
module.exports.BooksControllers = BooksControllers;
module.exports.ReadersControllers = ReadersControllers;
module.exports.SubscriptionsControllers = SubscriptionsControllers;
module.exports.BorrowedControllers = BorrowedControllers;