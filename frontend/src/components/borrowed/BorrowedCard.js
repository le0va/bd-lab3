import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const BorrowedCard = ({ borrowDate, returnDate, bookId, readerId, needUpdateHandler }) => {

    const [isChangeOpen, setIsChangeOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [returnInput, setReturnInput] = useState(returnDate);
    const returnChangeHandler = (event) => setReturnInput(event.target.value);

    const deleteBorrowedHandler = () => {
        fetch(`https://library-backend-nine.vercel.app/borrowed/${bookId}`, {
            method: 'DELETE'
        });
        setIsDeleted(true);
    }
    const changeBorrowedHandler = async () => {
        if (returnInput.trim() == '') {
            alert("Заповніть поле дата повернення, воно не може бути пустим!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/borrowed/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newReturnDate: returnInput
            })
        });
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
                        <p className="card__info"><span className='card__span'></span>{borrowDate}, {returnDate}, {bookId}, {readerId}</p>
                        <FontAwesomeIcon className="card__change-btn" icon={faPencil} onClick={() => setIsChangeOpen(true)} />
                    </>
                }
                {isChangeOpen
                    &&
                    <>
                        <input placeholder="Дата позичення" className="card__name-input" value={borrowDate} disabled />
                        <input placeholder="Дата повернення" className={"input-margin"} value={returnInput} onChange={returnChangeHandler} />
                        <input placeholder="Id книги" className={"input-small"} value={bookId} disabled />
                        <input placeholder="Id читача" className={"input-small"} value={readerId} disabled />
                        <FontAwesomeIcon className="card__cancel-btn" icon={faTimes} onClick={() => setIsChangeOpen(false)} />
                        <FontAwesomeIcon className="card__save-btn" icon={faFloppyDisk} onClick={changeBorrowedHandler} />
                    </>
                }
                <FontAwesomeIcon className={isChangeOpen ? "card__delete-btn-left" : "card__delete-btn"} icon={faTrashCan} onClick={deleteBorrowedHandler} />
            </div>
        );
    }
}