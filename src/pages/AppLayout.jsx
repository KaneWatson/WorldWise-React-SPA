import Map from "../components/Map"
import Sidebar from "../components/Sidebar"
import User from "../components/User"
import { useAuth } from "../contexts/FakeAuthContext"
import styles from "./AppLayout.module.css"

function AppLayout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {isAuthenticated && <User />}
    </div>
  )
}

export default AppLayout
