import { useState, useEffect } from "react";

import { BorrowedCard } from "./BorrowedCard";

export const Borrowed = () => {

    const [loadedBorrowed, setLoadedBorrowed] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateHandler = () => setNeedUpdate(!needUpdate);
    const [borrowInput, setBorrowInput] = useState('');
    const borrowChangeHandler = (event) => setBorrowInput(event.target.value);
    const [returnInput, setReturnInput] = useState('');
    const returnChangeHandler = (event) => setReturnInput(event.target.value);
    const [bookIdInput, setBookIdInput] = useState('');
    const bookIdChangeHandler = (event) => setBookIdInput(event.target.value);
    const [readerIdInput, setReaderIdInput] = useState('');
    const readerIdChangeHandler = (event) => setReaderIdInput(event.target.value);

    useEffect(() => {
        const SendRequest = async () => {
            const response = await fetch('https://library-backend-nine.vercel.app/borrowed');
            const responseData = await response.json();
            setLoadedBorrowed(responseData.result);
        }
        SendRequest();
    }, [needUpdate]);

    const createBorrowedHandler = async (event) => {
        event.preventDefault();
        if (borrowInput.trim() == '') {
            alert("Заповніть поле дата позичення, воно не може бути пустим!");
            return;
        }
        if (returnInput.trim() == '') {
            alert("Заповніть поле дата повернення, воно не може бути пустим!");
            return;
        }
        if (bookIdInput.trim() == '') {
            alert("Заповніть поле ID книги, воно не може бути пустим!");
            return;
        }
        if (readerIdInput.trim() == '') {
            alert("Заповніть поле ID читача, воно не може бути пустим!");
            return;
        }
        if (!/^\d+$/.test(bookIdInput)) {
            alert("ID книги може містити тільки цифри, перевірте правильність вводу!");
            return;
        }
        if (!/^\d+$/.test(readerIdInput)) {
            alert("ID читача може містити тільки цифри, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/borrowed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                readerId: readerIdInput,
                bookId: bookIdInput,
                borrowDate: borrowInput,
                returnDate: returnInput
            })
        });
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.message);
        }
        needUpdateHandler();
    }

    return (
        <div>
            <form onSubmit={createBorrowedHandler}>
                <div className="create__container">
                    <input placeholder="Дата позичення" value={borrowInput} onChange={borrowChangeHandler} />
                    <input placeholder="Дата повернення" className="input-margin" value={returnInput} onChange={returnChangeHandler} />
                    <input placeholder="ID книги" className="input-small" value={bookIdInput} onChange={bookIdChangeHandler} />
                    <input placeholder="ID читача" className="input-small" value={readerIdInput} onChange={readerIdChangeHandler} />
                    <button type="submit" className="create__button">Створити</button>
                </div>
            </form>

            {loadedBorrowed != undefined && loadedBorrowed.map((borrowed, i) => <BorrowedCard key={i} borrowDate={borrowed.borrow_date} returnDate={borrowed.return_date} bookId={borrowed.book_id} readerId={borrowed.reader_id} needUpdateHandler={needUpdateHandler} />)}
        </div>
    );
}