import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

import Login from './pages/login'
import UserDashboard from './pages/userDashboard'
import PaDashboard from './pages/paDashboard'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Login />
  } else {
    const userRole = session.user.user_metadata?.role

    return (
      <Router>
        <Routes>
          <Route path="/" element={<h1>Welcome to Butler</h1>} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/pa" element={<PaDashboard />} />
        </Routes>
      </Router>
    )
  }
}

export default App