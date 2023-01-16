import { useState, useEffect } from "react";

import { ReaderCard } from "./ReaderCard";

export const Readers = () => {

    const [loadedReaders, setLoadedReaders] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateHandler = () => setNeedUpdate(!needUpdate);
    const [nameInput, setNameInput] = useState('');
    const nameChangeHandler = (event) => setNameInput(event.target.value);
    const [phoneInput, setPhoneInput] = useState('');
    const phoneChangeHandler = (event) => setPhoneInput(event.target.value);
    const [addressInput, setAddressInput] = useState('');
    const addressChangeHandler = (event) => setAddressInput(event.target.value);

    useEffect(() => {
        const SendRequest = async () => {
            const response = await fetch('https://library-backend-nine.vercel.app/readers');
            const responseData = await response.json();
            setLoadedReaders(responseData.result);
        }
        SendRequest();
    }, [needUpdate]);

    const createReaderHandler = async (event) => {
        event.preventDefault();
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
        if (!/^[А-ЯҐЄІЇа-яґєії0-9]*$/.test(addressInput.split(" ").join(""))) {
            alert("Адреса читача може містити тільки букви українського алфавіту або цифри, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/readers/${nameInput}?phone=${phoneInput}&address=${addressInput}`, { method: 'POST' });
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.message);
        }
        needUpdateHandler();
    }

    return (
        <div>
            <form onSubmit={createReaderHandler}>
                <div className="create__container">
                    <input placeholder="Ім'я читача" value={nameInput} onChange={nameChangeHandler} />
                    <input placeholder="Номер телефона" className="input-margin" value={phoneInput} onChange={phoneChangeHandler} />
                    <input placeholder="Адреса" className="input-margin" value={addressInput} onChange={addressChangeHandler} />
                    <button type="submit" className="create__button">Створити</button>
                </div>
            </form>

            {loadedReaders != undefined && loadedReaders.map((reader, i) => <ReaderCard key={i} name={reader.name} phone={reader.phone} address={reader.address} id={reader.reader_id} needUpdateHandler={needUpdateHandler} />)}
        </div>
    );
}