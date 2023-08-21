import { Link } from "react-router-dom"
import styles from "./CityItem.module.css"

function CityItem({ city }) {
  const { id, cityName, date, emoji, position } = city
  const { lat, lng } = position
  const formatDate = date =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(date))

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem
new Date().to
