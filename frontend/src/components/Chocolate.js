function Chocolate(props) {
  const colorClasses = {'fekete': ' black', 'fehér': ' white', 'barna': ''}
  return (
    <div className={ 'chocolate' + colorClasses[props.chocolate.color] }>
		<h3>{ props.chocolate.shape } csokoládé</h3>
		<p>Súlya: { props.chocolate.weight } gramm</p>
		<p>{ props.chocolate.complete ? 'Nincs megkezdve' : 'Megkezdett' }</p>
		<p>Színe: { props.chocolate.color }</p>
		<p>Gyártási év: { props.chocolate.production_year }</p>
		<p>Likőrös: { props.chocolate.contains_liqueur ? 'igen' : 'nem' }</p>
    </div>
  );
}

export default Chocolate;
