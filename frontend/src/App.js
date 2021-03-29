import React, { useEffect, useState } from 'react';

import Chocolate from './components/Chocolate';
import Sum from './components/Sum';
import Loading from './components/Loading';

import './App.css';

function App() {

	const [chocolates, setChocolates] = useState(false);
	const [filteredChoco, setfilteredChoco] = useState(false);

	const [colorFilter, setColorFilter] = useState([true, true, true]);
	const [alcohol, setAlcohol] = useState(2);
	const [product, setProduct] = useState(2018);

	useEffect(() => {
		fetch('http://localhost:3023/data/')
			.then(response => response.json())
			.then(data => setChocolates(data))
			.catch(function() {
				setChocolates(false);
			});
	}, []);

	useEffect(() => {
		if(chocolates) {
			// color filter
			setfilteredChoco(chocolates.filter(c =>
				(colorFilter[0] && c.color === 'barna')
				|| (colorFilter[1] && c.color === 'fekete')
				|| (colorFilter[2] && c.color === 'fehér'))
				// alohol filter
				.filter(c => (alcohol === 2)
				|| (alcohol === 1 && !c.contains_liqueur)
				|| (alcohol === 0 && c.contains_liqueur))
				// product date filter
				.filter(c => c.production_year > product)
				);
		}

	}, [chocolates, colorFilter, alcohol, product]);


	function chHandler(n) {
		const tmp = [...colorFilter];
		tmp[n] = !tmp[n];
		setColorFilter(tmp);
	}

  return (
    <div className="App">
		<h1>Gombóc Artúr mai menüje</h1>

		<div className="filters">
			<div>
				<h2>A csokoládé színe</h2>
				<input type="checkbox" id="color1" onChange={() => chHandler(0) } defaultChecked={ colorFilter[1] } />
				<label htmlFor="color1">barna</label>
				<input type="checkbox" id="color2" onChange={() => chHandler(1) } defaultChecked={ colorFilter[1] } />
				<label htmlFor="color2">fekete</label>
				<input type="checkbox" id="color3" onChange={() => chHandler(2) } defaultChecked={ colorFilter[2] } />
				<label htmlFor="color3">fehér</label>
			</div>

			<div>
				<h2>Alkoholt tartalmaz?</h2>
				<div onChange={(e) => setAlcohol(parseInt(e.target.value)) }>
					<input type="radio" value="0" name="alcohol" id="alc1" />
					<label htmlFor="alc1">igen</label>
					<input type="radio" value="1" name="alcohol" id="alc2" />
					<label htmlFor="alc2">nem</label>
					<input type="radio" value="2" name="alcohol" id="alc3" defaultChecked />
					<label htmlFor="alc3">mindegy</label>
				</div>
			</div>

			<div>
				<h2>Gyártva</h2>
				<select onChange={(e) => setProduct(parseInt(e.target.value)) }>
					<option value="2018">2018</option>
					<option value="2019">2019</option>
					<option value="2020">2020</option>
				</select> után
			</div>
		</div>

		<div className="chocolates">
			{ filteredChoco ?
				filteredChoco.map((choco, index) => <Chocolate key={ index } chocolate={ choco }/>)
				: <Loading />
			}
		</div>
		{ filteredChoco && <Sum chocolates={ filteredChoco }/> }
    </div>
  );
}

export default App;
