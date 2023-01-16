import { useState, useEffect } from "react";

import { BookCard } from './BookCard';

export const Books = () => {

    const [loadedBooks, setLoadedBooks] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateHandler = () => setNeedUpdate(!needUpdate);
    const [nameInput, setNameInput] = useState('');
    const nameChangeHandler = (event) => setNameInput(event.target.value);
    const [genreInput, setGenreInput] = useState('');
    const genreChangeHandler = (event) => setGenreInput(event.target.value);
    const [authorIdInput, setAuthorIdInput] = useState('');
    const authorIdChangeHandler = (event) => setAuthorIdInput(event.target.value);

    useEffect(() => {
        const SendRequest = async () => {
            const response = await fetch('https://library-backend-nine.vercel.app/books');
            const responseData = await response.json();
            setLoadedBooks(responseData.result);
        }
        SendRequest();
    }, [needUpdate]);

    const createBookHandler = async (event) => {
        event.preventDefault();
        if (nameInput.trim() == '') {
            alert("Заповніть поле назва книги, воно не може бути пустим!");
            return;
        }
        if (genreInput.trim() == '') {
            alert("Заповніть поле жанр книги, воно не може бути пустим!");
            return;
        }
        if (authorIdInput.trim() == '') {
            alert("Заповніть поле ID автора, воно не може бути пустим!");
            return;
        }
        if (/[^а-яґєіїА-ЯҐЄІЇ]/.test(nameInput.split(" ").join(""))) {
            alert("Назва книги може містити тільки букви українського алфавіту, перевірте правильність вводу!");
            return;
        }
        if (/[^а-яґєіїА-ЯҐЄІЇ]/.test(genreInput.split(" ").join(""))) {
            alert("Жанр книги може містити тільки букви українського алфавіту, перевірте правильність вводу!");
            return;
        }
        if (!/^\d+$/.test(authorIdInput)) {
            alert("ID автора книги може містити тільки цифри, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/books/${nameInput}?genre=${genreInput}&authorId=${authorIdInput}`, { method: 'POST' });
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.message);
        }
        needUpdateHandler();
    }

    return (
        <div>

            <form onSubmit={createBookHandler}>
                <div className="create__container">
                    <input placeholder="Назва книги" value={nameInput} onChange={nameChangeHandler} />
                    <input placeholder="Жанр" className="input-margin" value={genreInput} onChange={genreChangeHandler} />
                    <input placeholder="ID автора" className="input-margin" value={authorIdInput} onChange={authorIdChangeHandler} />
                    <button type="submit" className="create__button">Створити</button>
                </div>
            </form>

            {loadedBooks != undefined && loadedBooks.map((book, i) => <BookCard key={i} name={book.name} genre={book.genre} authorId={book.author_id} id={book.book_id} needUpdateHandler={needUpdateHandler} />)}
        </div>
    );
}