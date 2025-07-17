import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './pages/login'
import Signup from './pages/signup'
import UserDashboard from './pages/userDashboard'
import PADashboard from './pages/paDashboard'
import ProtectedRoute from './components/protectedRoute'



function App() {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const getRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('email', user?.email)
        .single()

      if (data) {
        setRole(data.role)
      }
    }

    getRole()
  }, [])

 return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pa"
          element={
            <ProtectedRoute>
              <PADashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App