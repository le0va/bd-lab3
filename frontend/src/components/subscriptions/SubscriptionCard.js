import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const SubscriptionCard = ({ issueDate, delayDate, readerId, id, needUpdateHandler }) => {

    const [isChangeOpen, setIsChangeOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [delayInput, setDelayInput] = useState(delayDate);
    const delayChangeHandler = (event) => setDelayInput(event.target.value);

    const deleteSubscriptionHandler = () => {
        fetch(`https://library-backend-nine.vercel.app/subscriptions/${id}`, {
            method: 'DELETE'
        });
        setIsDeleted(true);
    }
    const changeSubscriptionHandler = async () => {
        if (delayInput.trim() == '') {
            alert("Заповніть поле дата просрочення, воно не може бути пустим!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/subscriptions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newDelayDate: delayInput
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
                        <p className="card__info"><span className='card__span'></span>{issueDate}, {delayDate}, {readerId}</p>
                        <FontAwesomeIcon className="card__change-btn" icon={faPencil} onClick={() => setIsChangeOpen(true)} />
                    </>
                }
                {isChangeOpen
                    &&
                    <>
                        <input placeholder="Дата видачі" value={issueDate} disabled />
                        <input placeholder="Дата просрочення" className={"input-margin"} value={delayInput} onChange={delayChangeHandler} />
                        <input placeholder="ID читача"  value={readerId} disabled />
                        <FontAwesomeIcon className="card__cancel-btn" icon={faTimes} onClick={() => setIsChangeOpen(false)} />
                        <FontAwesomeIcon className="card__save-btn" icon={faFloppyDisk} onClick={changeSubscriptionHandler} />
                    </>
                }
                <FontAwesomeIcon className={isChangeOpen ? "card__delete-btn-left" : "card__delete-btn"} icon={faTrashCan} onClick={deleteSubscriptionHandler} />
            </div>
        );
    }
}