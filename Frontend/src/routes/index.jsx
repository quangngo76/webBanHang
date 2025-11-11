//Layout
import DefaultLayout from '../layouts/DefaultLayout'
import AuthLayout from '../layouts/AuthLayout'
import AdminLayout from '../layouts/AdminLayout'

//Page
import Home from '../pages/UserPages/Home'
import ProductCategory from '../pages/UserPages/ProductCategory'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'
import Cart from '../pages/UserPages/Cart'
import Contact from '../pages/UserPages/Contact'
import Blogs from '../pages/TechInfor'
import ProductManagement from '../pages/AdminPages/ProductManagement'
import OrderPage from '../pages/UserPages/OrderPage'
import StoreSystem from '../pages/UserPages/StoreSystem'
import Dashboard from '../pages/AdminPages/Dashboard'
import UserManagement from '../pages/AdminPages/UserManagement'
import OrderManagement from '../pages/AdminPages/OrderManagement'


export const routes = [
  { path: '/', element: <Home />, layout: DefaultLayout },
  { path: '/productCategory', element: <ProductCategory />, layout: DefaultLayout },
  { path: '/auth/login', element: <Login />, layout: AuthLayout },
  { path: '/auth/register', element: <Register />, layout: AuthLayout },
  { path: '/cart', element: <Cart />},
  { path: '/contact', element: <Contact />, layout: DefaultLayout },
  { path: '/blogs', element: <Blogs />, layout: DefaultLayout },
  { path: '/productManagement', element: <ProductManagement />, layout: AdminLayout },
  { path: '/OrderPage', element: <OrderPage />},
  { path: '/StoreSystem', element: <StoreSystem />, layout: DefaultLayout },
  { path: '/Dashboard', element: <Dashboard />, layout: AdminLayout },
  { path: '/UserManagement', element: <UserManagement />, layout: AdminLayout },
  { path: '/OrderManagement', element: <OrderManagement />, layout: AdminLayout },
]
