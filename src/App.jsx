import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { CitiesProvider } from "./contexts/CitiesContext"

import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import CityList from "./components/CityList"
import City from "./components/City"
import CountryList from "./components/CountryList"
import Form from "./components/Form"

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

export default App
