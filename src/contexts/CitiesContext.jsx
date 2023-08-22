import { createContext, useContext, useEffect, useState } from "react"

const BASE_URL = "http://localhost:8000"

const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        if (!data) throw new Error("Something went wrong. Please try again later.")
        setCities(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    getCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      if (!data) throw new Error("Something went wrong. Please try again later.")
      setCurrentCity(data)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>{children}</CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error("CitiesContext was used outside of the post provider.")
  return context
}

export { CitiesProvider, useCities }
