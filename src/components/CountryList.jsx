import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import Message from "./Message"

import CountryItem from "./CountryItem"

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message={"Add your first city by clicking on a city in the map"} />

  const countries = cities.reduce((accu, curCity) => (accu.map(el => el.country).includes(curCity.country) ? accu : [...accu, { country: curCity.country, emoji: curCity.emoji }]), [])

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList
