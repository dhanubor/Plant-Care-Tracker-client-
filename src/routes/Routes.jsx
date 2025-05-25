import { createBrowserRouter } from "react-router";
import Roots from "../pages/Roots";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthLayout from "../layout/AuthLayout";
import PrivateRoute from "../provider/PrivateRoute";
import Lodding from "../components/Lodding";
import AddPlant from "../pages/AddPlant";
import Plants from "../pages/Plants";
import UpdatePlant from '../pages/UpdatePlant';
import PlantDetails from "../pages/PlantDetails";
import MyPlants from "../pages/MyPlants";

const API_BASE_URL = "https://mango-care-tracker-server.vercel.app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    errorElement: <Error />,
    children: [
      {   
        path: '/',
        index: true,
        element: <Home />
      },
      {
        path: '/plants',
        element: (
          <PrivateRoute>
            <Plants />
          </PrivateRoute>
        ),
        loader: () => fetch(`https://mango-care-tracker-server.vercel.app/plants`),
        hydrateFallbackElement: <Lodding />
      }, 
      {
        path: '/add-plant',
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: '/plantDetails/:id',
        element: (
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${API_BASE_URL}/plants/${params.id}`),
        hydrateFallbackElement: <Lodding />
      },
      {
        path: '/updatePlant/:id',
        element: (
          <PrivateRoute>
            <UpdatePlant />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${API_BASE_URL}/plants/${params.id}`),
        hydrateFallbackElement: <Lodding />
      },
      {
        path: '/my-plants',
        element: (
          <PrivateRoute>
            <MyPlants />
          </PrivateRoute>
        ),
        loader: () => fetch(`${API_BASE_URL}/plants`),
        hydrateFallbackElement: <Lodding />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/register',
        element: <Register />
      },
      {
        path: '/auth/login',
        element: <Login />
      }
    ]
  }
]);