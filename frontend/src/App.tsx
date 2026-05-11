import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminAddProductPage from "./pages/admin/AdminAddProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";







function App() {
  return (
    <div
      style={{
        background: "#f8f8f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/add" element={<AdminAddProductPage />} />
          <Route path="/admin/products/edit/:id" element={<AdminEditProductPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;