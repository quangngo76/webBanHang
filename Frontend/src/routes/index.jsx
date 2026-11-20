//Layout
import DefaultLayout from '../layouts/DefaultLayout'
import AuthLayout from '../layouts/AuthLayout'
import AdminLayout from '../layouts/AdminLayout'

//Page
import Home from '../pages/user/Home'
import ProductCategory from '../pages/user/ProductCategory'
import Login from '../pages/Auth/login'
import Register from '../pages/Auth/register'
import Cart from '../features/Cart'
import Contact from '../pages/user/Contact'
import Blogs from '../pages/user/TechInfor'
import ProductManagement from '../pages/admin/ProductManagement'
import OrderPage from '../features/order'
import StoreSystem from '../pages/user/StoreSystem'
import Dashboard from '../pages/admin/Dashboard'
import UserManagement from '../pages/admin/UserManagement'
import OrderManagement from '../pages/admin/OrderManagement'
import BankPayment from '../features/payment'


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
  { path: '/BankPayment', element: <BankPayment />},
]
