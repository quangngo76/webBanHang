// Thư viện
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'

// Component

function App() {
  

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout || (({ children }) => <>{children}</>)
          const Page = route.element

          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{Page}</Layout>}
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
