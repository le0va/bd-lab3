import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export const ReaderCard = ({ name, phone, address, id, needUpdateHandler }) => {

    const [isChangeOpen, setIsChangeOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [nameInput, setNameInput] = useState(name);
    const nameChangeHandler = (event) => setNameInput(event.target.value);
    const [phoneInput, setPhoneInput] = useState(phone);
    const phoneChangeHandler = (event) => setPhoneInput(event.target.value);
    const [addressInput, setAddressInput] = useState(address);
    const addressChangeHandler = (event) => setAddressInput(event.target.value);

    const deleteReaderHandler = () => {
        fetch(`https://library-backend-nine.vercel.app/readers/${id}`, {
            method: 'DELETE'
        });
        setIsDeleted(true);
    }
    const changeReaderHandler = async () => {
        if (nameInput.trim() == '') {
            alert("Заповніть поле ім'я читача, воно не може бути пустим!");
            return;
        }
        if (phoneInput.trim() == '') {
            alert("Заповніть поле номер телефона читача, воно не може бути пустим!");
            return;
        }
        if (addressInput.trim() == '') {
            alert("Заповніть поле адреса читача, воно не може бути пустим!");
            return;
        }
        if (/[^а-яґєіїА-ЯҐЄІЇ]/.test(nameInput.split(" ").join(""))) {
            alert("Ім'я читача може містити тільки букви українського алфавіту, перевірте правильність вводу!");
            return;
        }
        if (!/^\d+$/.test(phoneInput)) {
            alert("Номер телефона читача може містити тільки цифри, перевірте правильність вводу!");
            return;
        }
        console.log(addressInput.split(" ").join(""));
        if (!/^[А-ЯҐЄІЇа-яґєії0-9]*$/.test(addressInput.split(" ").join(""))) {
            alert("Адреса читача може містити тільки букви українського алфавіту або цифри, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/readers/${name}?readerNewName=${nameInput}&newPhone=${phoneInput}&newAddress=${addressInput}`, { method: 'PUT' });
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
                        <p className="card__info"><span className='card__span'></span>#{id}, {name}, {phone}, {address}</p>
                        <FontAwesomeIcon className="card__change-btn" icon={faPencil} onClick={() => setIsChangeOpen(true)} />
                    </>
                }
                {isChangeOpen
                    &&
                    <>
                        <input placeholder="Ім'я" value={nameInput} onChange={nameChangeHandler} />
                        <input placeholder="Номер телефона" value={phoneInput} onChange={phoneChangeHandler} />
                        <input placeholder="Адреса" value={addressInput} onChange={addressChangeHandler} />
                        <FontAwesomeIcon className="card__cancel-btn" icon={faTimes} onClick={() => setIsChangeOpen(false)} />
                        <FontAwesomeIcon className="card__save-btn" icon={faFloppyDisk} onClick={changeReaderHandler} />
                    </>
                }
                <FontAwesomeIcon className={isChangeOpen ? "card__delete-btn-left" : "card__delete-btn"} icon={faTrashCan} onClick={deleteReaderHandler} />
            </div>
        );
    }
}