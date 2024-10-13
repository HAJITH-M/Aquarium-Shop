// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SwipeCards from './Components/Cards/SwipeCards';
import Navbar from './Components/NavBar/Navbar';
import HeroSection from './Components/HeroSection/HeroSection';
import Login from './Auth/Login';
import ProtectedRoute from './Auth/ProtectedRoute';
import Checkout from './Components/CheckOut/Checkout';
import FishDetails from './Components/FishDetails/FishDetails';
import Cart from './Components/Cart/CartSection';
import Carousel from './Components/CarouselSection/Carousel';
import Demo from './Components/demo';

const App = () => {
    return (
        <Router>
            <Navbar />
            <HeroSection />

            <Routes>
                <Route path="/" element={<SwipeCards />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                } />

<Route path="/fish/:id" element={<FishDetails />} /> {/* New route for fish details */}
<Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                } />

            </Routes>
            <Carousel/>
            <Demo/>
        </Router>
    );
};

export default App;
