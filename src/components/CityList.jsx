import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import Message from "./Message"

import CityItem from "./CityItem"

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message={"Add your first city by clicking on a city in the map"} />
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  )
}

export default CityList
