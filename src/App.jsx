import { useLocation } from 'react-router-dom'
import AppRoutes from './AppRoutes'

function App() {
  const location = useLocation()
  
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow">
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
