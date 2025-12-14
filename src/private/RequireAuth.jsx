import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
