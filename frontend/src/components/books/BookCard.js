import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faTimes, faFloppyDisk, faArrowUp, faArrowDown, faAngleUp, faAngleDown, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export const BookCard = ({ name, genre, authorId, id, needUpdateHandler }) => {

    const [isChangeOpen, setIsChangeOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [nameInput, setNameInput] = useState(name);
    const nameChangeHandler = (event) => setNameInput(event.target.value);
    const [genreInput, setGenreInput] = useState(genre);
    const genreChangeHandler = (event) => setGenreInput(event.target.value);
    const [authorIdInput, setAuthorIdInput] = useState(authorId);
    const authorIdChangeHandler = (event) => setAuthorIdInput(event.target.value);

    const deleteBookHandler = () => {
        fetch(`https://library-backend-nine.vercel.app/books/${id}`, {
            method: 'DELETE'
        });
        setIsDeleted(true);
    }
    const changeBookHandler = async () => {
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
        const response = await fetch(`https://library-backend-nine.vercel.app/books/${name}?bookNewName=${nameInput}&newGenre=${genreInput}&newAuthorId=${authorIdInput}`, { method: 'PUT' });
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.message);
        }
        setIsChangeOpen(false);
        needUpdateHandler();
    }

    if (isDeleted) {
        return <></>
    }
    else {
        return (
            <div className="card__container">
                {!isChangeOpen
                    &&
                    <>
                        <p className="card__info"><span className='card__span'></span>#{id}, {name}, {genre}, {authorId}</p>

                        <FontAwesomeIcon className="card__change-btn" icon={faPencil} onClick={() => setIsChangeOpen(true)} />
                    </>
                }
                {isChangeOpen
                    &&
                    <>
                        <input placeholder="Назва" value={nameInput} onChange={nameChangeHandler} />
                        <input placeholder="Жанр" className="input-margin" value={genreInput} onChange={genreChangeHandler} />
                        <input placeholder="ID автора" className="input-margin" value={authorIdInput} onChange={authorIdChangeHandler} />
                        <FontAwesomeIcon className="card__cancel-btn" icon={faTimes} onClick={() => setIsChangeOpen(false)} />
                        <FontAwesomeIcon className="card__save-btn" icon={faFloppyDisk} onClick={changeBookHandler} />
                    </>
                }
                <FontAwesomeIcon className={isChangeOpen ? "card__delete-btn-left" : "card__delete-btn"} icon={faTrashCan} onClick={deleteBookHandler} />
            </div>
        );
    }

}