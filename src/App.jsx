import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import FilterProducts from "./pages/FilterProducts";
import Navbar from "./components/layouts/Navbar";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import Shipping from "./pages/Shipping";
import ConfirmOrder from "./pages/ConfirmOrder";
import OrderPayment from "./pages/OrderPayment";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup"; 
import AdminProtectedRoutes from "./protectedRoutes/AdminProtectedRoutes";
import UserLayout from "./components/layouts/UserLayout";
import { useDispatch } from "react-redux";
import { loadUser } from "./api/features/user";
import ProtectedUserRoute from "./protectedRoutes/ProtectedUserRoute";
import { fetchCategoryProducts } from "./api/features/product";
import { getAllCart } from "./api/features/cart"; 
import AddUser from "./components/admin/users/AddUser";
import UsersList from "./components/admin/users/UsersList";
import ProductList from "./components/admin/product/ProductList";
import CreateProduct from "./components/admin/product/CreateProduct";
import OrderListAdmin from "./components/admin/orders/OrderList";
import ViewSingleOrder from "./components/admin/orders/ViewSingleOrder";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";


function App() {
const [count, setCount] = useState(0);
const dispatch = useDispatch()
 

 useEffect(()=> { // load user, product and cart data in website 
    dispatch(loadUser())
    dispatch(fetchCategoryProducts())
    dispatch(getAllCart())
 }, [])

  return (
    <div className="para smax-w-[1450px] mx-auto overflow-hidden">   
      <Router>
        <Routes>
          {/* routes for user  */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product-detail/product/:id" element={<ProductDetails />}/>
            <Route path="products" element={<FilterProducts />} />
            <Route path="user" element={<ProtectedUserRoute />}>
              <Route path="profile" element={<UserProfile  />} />
            </Route>

            <Route path="order" element={<ProtectedUserRoute />}>
              <Route path="shipping" element={<Shipping />} />
              <Route path="confirmOrder" element={<ConfirmOrder />} />
              <Route path="paymentStep" element={<OrderPayment />} />
              <Route path="orderSuccess" element={<OrderSuccess />} />
            </Route>
          </Route>

            {/* auth routes  */}
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

          {/* routes for admin  */}
          <Route path="/admin" element={<AdminProtectedRoutes />}> 
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="update-user/:id" element={<AddUser />} />
            <Route path="all-users" element={<UsersList />} />
            <Route path="all-products" element={<ProductList />} />
            <Route path="create-porduct" element={<CreateProduct />} /> 
            <Route path="update-porduct/:id" element={<CreateProduct />} /> 
            <Route path="all-orders" element={<OrderListAdmin />} />
            <Route path="order-details/:id" element={<ViewSingleOrder />} />
          </Route>        
          
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
