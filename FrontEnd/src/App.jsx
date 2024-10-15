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
import UploadFishCard from './Components/Cards/UploadCards';
import CategorySwipeCards from './Components/Cards/CategorySwipeCards';
import HomePage from './Pages/HomePage';

const App = () => {
    return (
        <Router>
            <Navbar />
            {/* <HeroSection /> */}

            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/upload" element={<UploadFishCard />} />

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
            {/* <Carousel/>
            <CategorySwipeCards/> */}
        </Router>
    );
};

export default App;
