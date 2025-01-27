// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
// import { Users, Building2, ChevronDown, LayoutDashboard } from 'lucide-react';
// import { AuthProvider } from './contexts/AuthContext';
// import AdminSignupForm from './components/auth/AdminSignupForm';
// import AdminLoginForm from './components/auth/AdminLoginForm';
// import UserLoginForm from './components/auth/UserLoginForm';
// import CustomerList from './components/customers/CustomerList';
// import CustomerForm from './components/customers/CustomerForm';
// import UserList from './components/users/UserList';
// import UserForm from './components/users/UserForm';
// import InteractionList from './components/interactions/InteractionList';
// import InteractionForm from './components/interactions/InteractionForm';
// import TaskList from './components/tasks/TaskList';
// import TaskForm from './components/tasks/TaskForm';
// import PrevisitList from './components/previsit/PrevisitList';
// import PrevisitReport from './components/previsit/PrevisitReport';
// import DataSourcesList from './components/datasources/DataSourcesList';
// import UserMainPage from './components/UserMainPage';
// import MslDashboard from './components/dashboard/MslDashboard';
// import ManagerDashboard from './components/dashboard/ManagerDashboard';
// import { supabase } from './lib/supabase';
// import { useAuth } from './contexts/AuthContext';
// import MainDashboard from './components/Main_Dashboard/MainDashboard';

// function AdminContent() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = React.useState(false);

//   async function handleSignOut() {
//     try {
//       await supabase.auth.signOut();
//       navigate('/admin/login');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <Building2 className="h-8 w-8 text-indigo-600" />
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 <Link
//                   to="/users"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Users
//                 </Link>
//               </div>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:items-center">
//               <div className="ml-3 relative">
//                 <div>
//                   <button
//                     type="button"
//                     className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     onClick={() => setIsOpen(!isOpen)}
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <Users className="h-8 w-8 rounded-full" />
//                   </button>
//                 </div>
//                 {isOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <button
//                       onClick={handleSignOut}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <Routes>
//           <Route path="/users" element={<UserList />} />
//           <Route path="/users/new" element={<UserForm />} />
//           <Route path="/users/:id" element={<UserForm />} />
//           <Route path="/" element={<Navigate to="/users" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function UserContent() {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [isDashboardOpen, setIsDashboardOpen] = React.useState(false);
//   const { user } = useAuth();
//   const [userRole, setUserRole] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     async function getUserRole() {
//       if (user) {
//         const { data, error } = await supabase
//           .from('users')
//           .select('role')
//           .eq('id', user.id)
//           .single();
        
//         if (!error && data) {
//           setUserRole(data.role);
//         }
//       }
//     }
//     getUserRole();
//   }, [user]);

//   async function handleSignOut() {
//     try {
//       await supabase.auth.signOut();
//       navigate('/login');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <Building2 className="h-8 w-8 text-indigo-600" />
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 <Link
//                   to="/"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/customers"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Customers
//                 </Link>
//                 <Link
//                   to="/interactions"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Interactions
//                 </Link>
//                 <Link
//                   to="/tasks"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Tasks
//                 </Link>
//                 <Link
//                   to="/previsit"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Pre-visit Reports
//                 </Link>
//                 <Link
//                   to="/datasources"
//                   className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                 >
//                   Data Sources
//                 </Link>
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsDashboardOpen(!isDashboardOpen)}
//                     className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                   >
//                     <LayoutDashboard className="h-4 w-4 mr-1" />
//                     Dashboard
//                     <ChevronDown className="h-4 w-4 ml-1" />
//                   </button>
//                   {isDashboardOpen && (
//                     <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                       <div className="py-1">
//                         <Link
//                           to="/dashboard/msl"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={() => setIsDashboardOpen(false)}
//                         >
//                           MSL Dashboard
//                         </Link>
//                         {userRole === 'MSL Manager' && (
//                           <Link
//                             to="/dashboard/manager"
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => setIsDashboardOpen(false)}
//                           >
//                             Manager Dashboard
//                           </Link>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:items-center">
//               <div className="ml-3 relative">
//                 <div>
//                   <button
//                     type="button"
//                     className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     onClick={() => setIsOpen(!isOpen)}
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <Users className="h-8 w-8 rounded-full" />
//                   </button>
//                 </div>
//                 {isOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <button
//                       onClick={handleSignOut}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <Routes>
//           <Route path="/" element={<UserMainPage />} />
//           <Route path="/customers" element={<CustomerList />} />
//           <Route path="/customers/:id" element={<CustomerForm />} />
//           <Route path="/interactions" element={<InteractionList />} />
//           <Route path="/interactions/new" element={<InteractionForm />} />
//           <Route path="/interactions/:id" element={<InteractionForm />} />
//           <Route path="/tasks" element={<TaskList />} />
//           <Route path="/tasks/new" element={<TaskForm />} />
//           <Route path="/tasks/:id" element={<TaskForm />} />
//           <Route path="/previsit" element={<PrevisitList />} />
//           <Route path="/previsit/:id" element={<PrevisitReport />} />
//           <Route path="/datasources" element={<DataSourcesList />} />
//           <Route path="/dashboard/msl" element={<MslDashboard />} />
//           <Route path="/dashboard/manager" element={<ManagerDashboard />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function AppContent() {
//   const { user } = useAuth();
//   const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     async function checkAdminStatus() {
//       try {
//         if (!user) {
//           setIsAdmin(false);
//           setIsLoading(false);
//           return;
//         }

//         const { data, error } = await supabase
//           .from('admins')
//           .select('*')
//           .eq('auth_id', user.id);

//         if (error) throw error;
//         setIsAdmin(data && data.length > 0);
//         setError(null);
//       } catch (error) {
//         console.error('Error checking admin status:', error);
//         setError('Unable to verify admin status. Please try again later.');
//         setIsAdmin(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     checkAdminStatus();
//   }, [user]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
//           <div className="text-center">
//             <h2 className="text-xl font-semibold text-red-600 mb-2">Connection Error</h2>
//             <p className="text-gray-600 mb-4">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Retry Connection
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <Routes>
//         <Route path="/admin/signup" element={<AdminSignupForm />} />
//         <Route path="/admin/login" element={<AdminLoginForm />} />
//         <Route path="/login" element={<UserLoginForm />} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     );
//   }

//   return isAdmin ? <AdminContent /> : <UserContent />;
// }

// export default function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </Router>
//   );
// }

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminSignupForm from './components/auth/AdminSignupForm';
import AdminLoginForm from './components/auth/AdminLoginForm';
import UserLoginForm from './components/auth/UserLoginForm';
import CustomerList from './components/customers/CustomerList';
import CustomerForm from './components/customers/CustomerForm';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import InteractionList from './components/interactions/InteractionList';
import InteractionForm from './components/interactions/InteractionForm';
import TaskList from './components/tasks/TaskList';
import TaskForm from './components/tasks/TaskForm';
import PrevisitList from './components/previsit/PrevisitList';
import PrevisitReport from './components/previsit/PrevisitReport';
import DataSourcesList from './components/datasources/DataSourcesList';
import UserMainPage from './components/UserMainPage';
import MslDashboard from './components/dashboard/MslDashboard';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import { supabase } from './lib/supabase';
import { useAuth } from './contexts/AuthContext';
import MainDashboard from './components/Main_Dashboard/MainDashboard';
// import UserNavbar from './components/UserNavbar';
import ChatWithRAG from './components/chat/ChatWithRAG';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CustomerDetails from './components/customers/CustomerDetails';

function AdminContent() {
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      navigate('/maindashboard');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id" element={<UserForm />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard handleSignOut={handleSignOut} />}/>
          <Route path="/userdash" element={<UserList />} />
          <Route path="/adminlogin" element={<AdminLoginForm />} />
          <Route path="/" element={<UserMainPage />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerForm />} />
          <Route path="/interactions" element={<InteractionList />} />
          <Route path="/interactions/new" element={<InteractionForm />} />
          <Route path="/interactions/:id" element={<InteractionForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
          <Route path="/previsit" element={<PrevisitList />} />
          <Route path="/previsit/:id" element={<PrevisitReport />} />
          <Route path="/datasources" element={<DataSourcesList />} />
          <Route path="/dashboard/msl" element={<MslDashboard />} />
          <Route path="/dashboard/manager" element={<ManagerDashboard />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/admin/signup" element={<AdminSignupForm />} />
          <Route path="/chat" element={<ChatWithRAG />} />
          <Route path="/customerdetails/:id" element={<CustomerDetails />} />
        </Routes>
      </div>
    </div>
  );
}

function UserContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getUserRole() {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setUserRole(data.role);
        }
      }
    }
    getUserRole();
  }, [user]);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
        <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id" element={<UserForm />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard handleSignOut={handleSignOut} />}/>
          <Route path="/userdash" element={<UserList />} />
          <Route path="/adminlogin" element={<AdminLoginForm />} />
          <Route path="/" element={<UserMainPage />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerForm />} />
          <Route path="/interactions" element={<InteractionList />} />
          <Route path="/interactions/new" element={<InteractionForm />} />
          <Route path="/interactions/:id" element={<InteractionForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
          <Route path="/previsit" element={<PrevisitList />} />
          <Route path="/previsit/:id" element={<PrevisitReport />} />
          <Route path="/datasources" element={<DataSourcesList />} />
          <Route path="/dashboard/msl" element={<MslDashboard />} />
          <Route path="/dashboard/manager" element={<ManagerDashboard />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/admin/signup" element={<AdminSignupForm />} />
          <Route path="/chat" element={<ChatWithRAG />} />
          <Route path="/customerdetails/:id" element={<CustomerDetails />} />
          
       </Routes>
      </div>
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function checkAdminStatus() {
      try {
        if (!user) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('admins')
          .select('*')
          .eq('auth_id', user.id);

        if (error) throw error;
        setIsAdmin(data && data.length > 0);
        setError(null);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setError('Unable to verify admin status. Please try again later.');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAdminStatus();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/admin/signup" element={<AdminSignupForm />} />
        <Route path="/adminlogin" element={<AdminLoginForm />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return isAdmin ? <AdminContent /> : <UserContent />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
