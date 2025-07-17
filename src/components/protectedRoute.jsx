import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (!session || error) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      // Get user email from session
      const userEmail = session.user.email;

      // Get user role from Supabase `users` table
      const { data, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('email', userEmail)
        .single();

      if (roleError || !data) {
        console.error('Error fetching role:', roleError);
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const userRole = data.role;

      // Check if route path matches role
      const isUserRoute = location.pathname.startsWith('/dashboard/user');
      const isPARoute = location.pathname.startsWith('/dashboard/pa');

      if (
        (userRole === 'user' && isUserRoute) ||
        (userRole === 'pa' && isPARoute)
      ) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
