import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const AuthorCard = ({ name, id, needUpdateHandler }) => {

    const [isChangeOpen, setIsChangeOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [nameInput, setNameInput] = useState(name);
    const nameChangeHandler = (event) => setNameInput(event.target.value);

    const deleteAuthorHandler = () => {
        fetch(`https://library-backend-nine.vercel.app/authors/${id}`, {
            method: 'DELETE'
        });
        setIsDeleted(true);
    }
    const changeAuthorHandler = async () => {
        if (nameInput.trim() == '') {
            alert("Заповніть поле ім'я автора, воно не може бути пустим!");
            return;
        }
        if (/[^а-яґєіїА-ЯҐЄІЇ]/.test(nameInput.split(" ").join(""))) {
            alert("Ім'я автора може містити тільки букви українського алфавіту, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/authors/${name}?authorNewName=${nameInput}`, { method: 'PUT' });
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
                        <p className="card__info"><span className='card__span'></span>#{id}, {name}</p>
                        <FontAwesomeIcon className="card__change-btn" icon={faPencil} onClick={() => setIsChangeOpen(true)} />
                    </>
                }
                {isChangeOpen
                    &&
                    <>
                        <input placeholder="name" className="card__name-input" value={nameInput} onChange={nameChangeHandler} />
                        <FontAwesomeIcon className="card__cancel-btn" icon={faTimes} onClick={() => setIsChangeOpen(false)} />
                        <FontAwesomeIcon className="card__save-btn" icon={faFloppyDisk} onClick={changeAuthorHandler} />
                    </>
                }
                <FontAwesomeIcon className={isChangeOpen ? "card__delete-btn-left" : "card__delete-btn"} icon={faTrashCan} onClick={deleteAuthorHandler} />
            </div>
        );
    }
}