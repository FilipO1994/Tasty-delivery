import useHttp from '../hooks/useHttp'
import MealItem from './MealItem'
import Error from './Error'

const requestConfig = {}

const Meals = () => {
	const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, [])

	if (isLoading) {
		return <p className="center">Featching meals</p>
	}
	if (error) {
		return <Error title="Failed to fetch " message={error}></Error>
	}

	return (
		<ul id="meals">
			{loadedMeals.map(meal => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	)
}
export default Meals
