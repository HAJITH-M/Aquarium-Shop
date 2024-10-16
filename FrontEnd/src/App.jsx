import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipeCards from './Components/Cards/SwipeCards';
import Navbar from './Components/NavBar/Navbar';
import Login from './Auth/Login';
import ProtectedRoute from './Auth/ProtectedRoute';
import Checkout from './Components/CheckOut/Checkout';
import FishDetails from './Components/FishDetails/FishDetails';
import Cart from './Components/Cart/CartSection';
import HomePage from './Pages/HomePage';
import GalleryPage from './Pages/GalleryPage';
import Orders from './Pages/UserOrderPage';
import FooterSection from './Components/Footer/FooterSection';
// import NotFound from './Pages/NotFound'; // Create this component

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                } />
                <Route path="/fish/:id" element={<FishDetails />} />
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route path="/userorder" element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                } />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <FooterSection/>
        </Router>
    );
};

export default App;
