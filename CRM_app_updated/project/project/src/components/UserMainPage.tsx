//import React from 'react';
import { BrowserRouter as Navigate, useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
//import { Users, MessageSquare, ListTodo, FileText, Database, LayoutDashboard } from 'lucide-react';
//import Chatbot from './chat/Chatbot';
import UserNavbar from './UserNavbar';
import { supabase } from '../lib/supabase';

export default function UserMainPage() {
    const userRole = "Admin"; // Replace this with actual logic to determine the user's role
    const navigate = useNavigate();
    const handleSignOut = async () => {
      try {
        await supabase.auth.signOut();
        navigate('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
  
  return (
    <>
      <UserNavbar userRole={userRole} handleSignOut={handleSignOut} />
      <div className="bg-white shadow rounded-lg">
        
      </div>  
          
    </>
  );
}