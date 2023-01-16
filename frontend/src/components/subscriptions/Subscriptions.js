import { useState, useEffect } from "react";

import { SubscriptionCard } from "./SubscriptionCard";

export const Subscriptions = () => {

    const [loadedSubscriptions, setLoadedSubscriptions] = useState();
    const [needUpdate, setNeedUpdate] = useState(false);
    const needUpdateHandler = () => setNeedUpdate(!needUpdate);
    const [issueInput, setIssueInput] = useState('');
    const issueChangeHandler = (event) => setIssueInput(event.target.value);
    const [delayInput, setDelayInput] = useState('');
    const delayChangeHandler = (event) => setDelayInput(event.target.value);
    const [readerIdInput, setReaderIdInput] = useState('');
    const readerIdChangeHandler = (event) => setReaderIdInput(event.target.value);

    useEffect(() => {
        const SendRequest = async () => {
            const response = await fetch('https://library-backend-nine.vercel.app/subscriptions');
            const responseData = await response.json();
            setLoadedSubscriptions(responseData.result);
        }
        SendRequest();
    }, [needUpdate]);

    const createSubscriptionHandler = async (event) => {
        event.preventDefault();
        if (issueInput.trim() == '') {
            alert("Заповніть поле дата видачі, воно не може бути пустим!");
            return;
        }
        if (delayInput.trim() == '') {
            alert("Заповніть поле дата просрочення, воно не може бути пустим!");
            return;
        }
        if (readerIdInput.trim() == '') {
            alert("Заповніть поле ID читача, воно не може бути пустим!");
            return;
        }
        if (!/^\d+$/.test(readerIdInput)) {
            alert("ID читача може містити тільки цифри, перевірте правильність вводу!");
            return;
        }
        const response = await fetch(`https://library-backend-nine.vercel.app/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                issueDate: issueInput,
                delayDate: delayInput,
                readerId: readerIdInput 
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
            <form onSubmit={createSubscriptionHandler}>
                <div className="create__container">
                    <input placeholder="Дата видачі" value={issueInput} onChange={issueChangeHandler} />
                    <input placeholder="Дата просрочення" className={"input-margin"} value={delayInput} onChange={delayChangeHandler} />
                    <input placeholder="ID читача" className={"input-margin"} value={readerIdInput} onChange={readerIdChangeHandler} />
                    <button type="submit" className="create__button">Створити</button>
                </div>
            </form>

            {loadedSubscriptions != undefined && loadedSubscriptions.map((subscription, i) => <SubscriptionCard key={i} issueDate={subscription.issue_date} delayDate={subscription.delay_date} readerId={subscription.reader_id} id={subscription.subscription_id} needUpdateHandler={needUpdateHandler} />)}
        </div>
    );
}