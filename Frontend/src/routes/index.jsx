//Layout
import DefaultLayout from '../layouts/DefaultLayout'
import AuthLayout from '../layouts/AuthLayout'
import AdminLayout from '../layouts/AdminLayout'

//Page
import Home from '../pages/Home'
import ProductCategory from '../pages/ProductCategory'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'
import Cart from '../pages/Cart'
import Contact from '../pages/Contact'
import Blogs from '../pages/TechInfor'
import ProductManagement from '../pages/ProductManagement'
import OrderPage from '../pages/OrderPage'
import StoreSystem from '../pages/StoreSystem'
import Dashboard from '../pages/Dashboard'
import UserManagement from '../pages/UserManagement'
import OrderManagement from '../pages/OrderManagement'


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
