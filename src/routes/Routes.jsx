import { createBrowserRouter } from "react-router";
import Roots from "../pages/Roots";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Bills from "../pages/Plants";
import Profile from "../pages/Profile";
import BillDetails from "../pages/PlantDetails";
import Login from './../pages/Login';
import Register from './../pages/Register';
import AuthLayout from "../layout/AuthLayout";
// import PrivateRoute from "../components/PrivateRoute";
 import PrivateRoute from "../provider/PrivateRoute";
import Lodding from "../components/Lodding";
import AddPlant from "../pages/AddPlant";
import Plants from "../pages/Plants";
import UpdatePlant from './../pages/UpdatePlant';
import PlantDetails from "../pages/PlantDetails";
import MyPlants from "../pages/MyPlants";


export const router = createBrowserRouter([
    {
      path: "/",
      Component:Roots,
      errorElement:<Error></Error>,
      children:[
        {   
            path:'/',
            index:true,
            
            
            Component:Home

        },
        {
        path: '/plants',
        element: (
           <PrivateRoute>
           
            <Plants />
          
          </PrivateRoute>
        ),
        loader: () => fetch(`http://localhost:3000/plants`),
        hydrateFallbackElement:<Lodding></Lodding>
        
      }, 
      {
         path: '/add-plant',
         element: <AddPlant/>
      },
        {
          path:'/profile',
         
         element:
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
          
        
        },
        {
          path:'/plantDetails/:id',
          element: <PrivateRoute>
             <PlantDetails/>
          </PrivateRoute>,
          loader: ({ params }) => fetch(`http://localhost:3000/plants/${params.id}`),
          hydrateFallbackElement:<Lodding></Lodding>
        },
        {
          path:'/updatePlant/:id',
          element:<UpdatePlant/>,

          loader: ({ params }) => fetch(`http://localhost:3000/plants/${params.id}`),
          hydrateFallbackElement:<Lodding></Lodding>
        },
        {
          path:'/my-Plants',
          Component:MyPlants,
          loader: () => fetch(`http://localhost:3000/plants`),
          hydrateFallbackElement:<Lodding></Lodding>
        }
        
       
      ]
    },
    {
      path : "/Auth",
      Component : AuthLayout,
      children : [
         {
          path:'/Auth/register',
         
          Component:Register
        },
        {
          path:'/Auth/login',
         
          Component:Login
        }
      ]
  
    }
  ]);