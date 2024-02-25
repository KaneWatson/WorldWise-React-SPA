import { Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import Footer from "./Footer"
import Logo from "./Logo"
// import styles from "./SideBar.module.css"

function Sidebar() {
  return (
    <div className={"test"}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Sidebar
