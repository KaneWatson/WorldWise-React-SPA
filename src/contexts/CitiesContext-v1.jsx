import { createContext, useCallback, useContext, useEffect, useReducer } from "react"

const BASE_URL = "http://localhost:8000"

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {}
}

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Unknown action")
    case "loading":
      return { ...state, isLoading: true }
    case "loaded":
      return { ...state, isLoading: false }
    case "cities/loaded":
      return { ...state, cities: action.payload }
    case "city/loaded":
      return { ...state, currentCity: action.payload }
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload], currentCity: action.payload }
    case "city/deleted":
      return { ...state, cities: state.cities.filter(city => city.id !== action.payload), currentCity: initialState.currentCity }
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)

  useEffect(function () {
    async function getCities() {
      try {
        dispatch({ type: "loading" })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        if (!data) throw new Error("Something went wrong. Please try again later.")
        // setCities(data)
        dispatch({ type: "cities/loaded", payload: data })
      } catch (error) {
        console.log(error.message)
      } finally {
        dispatch({ type: "loaded" })
      }
    }
    getCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (currentCity.id === Number(id)) return

      try {
        dispatch({ type: "loading" })
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        if (!data) throw new Error("Something went wrong. Please try again later.")
        dispatch({ type: "city/loaded", payload: data })
      } catch (error) {
        console.log(error.message)
      } finally {
        dispatch({ type: "loaded" })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" })
      const res = await fetch(`${BASE_URL}/cities/`, { method: "POST", body: JSON.stringify(newCity), headers: { "Content-Type": "application/json" } })
      const data = await res.json()
      if (!data) throw new Error("There was an error creating city.")
      dispatch({ type: "city/created", payload: data })
    } catch (error) {
      console.log(error.message)
    } finally {
      dispatch({ type: "loaded" })
    }
  }
  async function deleteCity(id) {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        dispatch({ type: "loading" })
        if (!id) throw new Error("There was an error deleting city.")
        await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" })

        dispatch({ type: "city/deleted", payload: id })
      } catch (error) {
        console.log(error.message)
      } finally {
        dispatch({ type: "loaded" })
      }
    }
  }

  return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>{children}</CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider.")
  return context
}

export { CitiesProvider, useCities }
