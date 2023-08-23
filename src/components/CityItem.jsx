import { Link, useNavigate } from "react-router-dom"
import styles from "./CityItem.module.css"
import { useCities } from "../contexts/CitiesContext"

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const navigate = useNavigate()
  const { id, cityName, date, emoji, position } = city
  const { lat, lng } = position
  const formatDate = date =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(date))

  function handleDelete(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={e => handleDelete(e)}>
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
new Date().to
