// // src/routes/PrivateRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[400px]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (user) {
//     return children;
//   }

//   // Redirect to login page with the return path
//   return <Navigate to="/login" state={{ from: location }} replace />;
// };

// export default PrivateRoute;