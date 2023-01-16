import { useState, useEffect } from "react";

import { AuthorCard } from "./AuthorCard";

export const Authors = () => {

    const [loadedAuthors, setLoadedAuthors] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateHandler = () => setNeedUpdate(!needUpdate);
    const [nameInput, setNameInput] = useState('');
    const nameChangeHandler = (event) => setNameInput(event.target.value);

    useEffect(() => {
        const SendRequest = async () => {
            const response = await fetch('https://library-backend-nine.vercel.app/authors');
            const responseData = await response.json();
            setLoadedAuthors(responseData.result);
        }
        SendRequest();
    }, [needUpdate]);

    const createAuthorHandler = async (event) => {
        event.preventDefault();
        if (nameInput.trim() == '') {
            alert("Заповніть поле ім'я автора, воно не може бути пустим!");
            return;
        }
        if (/[^а-яґєіїА-ЯҐЄІЇ]/.test(nameInput.split(" ").join(""))) {
            alert("Ім'я автора може містити тільки букви українського алфавіту, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/authors/${nameInput}`, { method: 'POST' });
        const responseData = await response.json();
        if (!response.ok) {
            alert(responseData.message);
        }
        needUpdateHandler();
    }

    return (
        <div>
            <form onSubmit={createAuthorHandler}>
                <div className="create__container">
                    <input placeholder="Ім'я автора" className="create__name-input" value={nameInput} onChange={nameChangeHandler} />
                    <button type="submit" className="create__button">Створити</button>
                </div>
            </form>

            {loadedAuthors != undefined && loadedAuthors.map((author, i) => <AuthorCard key={i} name={author.name} id={author.author_id} needUpdateHandler={needUpdateHandler} />)}
        </div>
    );
}