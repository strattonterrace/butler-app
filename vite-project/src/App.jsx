// src/App.jsx
import { useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let result

    if (isSignUp) {
      result = await supabase.auth.signUp({
  email,
  password,
})

if (result.data?.user) {
  await supabase.from('users').insert([
    {
      auth_id: result.data.user.id,
      role: isSignUp ? 'user' : 'user', // defaulting to "user" for now
    },
  ])
}

    } else {
      result = await supabase.auth.signInWithPassword({ email, password })
    }

    if (result.error) {
      setMessage(result.error.message)
    } else {
      setMessage('Success! Check your email if signing up.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Log In'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
        <input
          className="w-full px-4 py-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 underline w-full text-center"
        >
          {isSignUp ? 'Switch to Log In' : 'Switch to Sign Up'}
        </button>
        {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  )
}

export default App