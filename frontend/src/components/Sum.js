function Sum(props) {
  return (
	<p>
		Összesen { props.chocolates.reduce((acc, curr) => acc + curr.weight, 0) } gramm csokoládé.
	</p>);
}

export default Sum;
