import React, { useEffect, useState } from 'react';

import Chocolate from './components/Chocolate';
import Loading from './components/Loading';

import './App.css';

function App() {

	const [chocolates, setChocolates] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3023/data/')
			.then(response => response.json())
			.then(data => setChocolates(data))
			.catch(function() {
				setChocolates(false);
			});
	}, []);


  return (
    <div className="App">
		{ chocolates ?
			chocolates.map((choco, index) => <Chocolate key={ index } chocolate={ choco }/>)
			: <Loading /> }
    </div>
  );
}

export default App;
