import { useState } from 'react';

import './App.css';
import './CardStyles.css';
import { Authors } from './components/authors/Authors';
import { Books } from './components/books/Books';
import { Borrowed } from './components/borrowed/Borrowed';
import { Readers } from './components/readers/Readers';
import { Subscriptions } from './components/subscriptions/Subscriptions';

function App() {

	const [displayData, setDisplayData] = useState('authors');
	const setDisplayAuthors = () => setDisplayData('authors');
	const setDisplayBooks = () => setDisplayData('books');
	const setDisplayReaders = () => setDisplayData('readers');
	const setDisplaySubscriptions = () => setDisplayData('subscriptions');
	const setDisplayBorrowed = () => setDisplayData('borrowed');

	return (
		<div className='App-container'>
			<div className='App'>
				<div className='switch-buttons'>
					<p onClick={setDisplayAuthors}>Автори</p>
					<p onClick={setDisplayBooks}>Книги</p>
					<p onClick={setDisplayReaders}>Читачі</p>
					<p onClick={setDisplaySubscriptions}>Абонементи</p>
					<p onClick={setDisplayBorrowed}>Позичення</p>
				</div>

				{displayData == 'authors' && <Authors />}
				{displayData == 'books' && <Books />}
				{displayData == 'readers' && <Readers />}
				{displayData == 'subscriptions' && <Subscriptions />}
				{displayData == 'borrowed' && <Borrowed />}
			</div>
		</div>
	);
}

export default App;
