import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";
import SidebarDrawer from './SidebarDrawer';

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    return (
        <div className="h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0">
            <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} />
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
                <div className="flex items-center">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <FaStore className="mr-2 text-3xl" />
                    <span className="font-[Poppins]">E-Shop</span>
                </Link>
                    <button
                        className="flex items-center px-3 py-2 bg-[#232f3e] text-white rounded ml-4"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <svg width="24" height="24" fill="currentColor" className="mr-2"><rect y="4" width="24" height="2"/><rect y="11" width="24" height="2"/><rect y="18" width="24" height="2"/></svg>
                        All
                    </button>
                </div>

                <div className="hidden md:flex items-center mx-4">
                    <FaMapMarkerAlt className="mr-1 text-lg" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs">Deliver to</span>
                        <span className="font-bold text-sm">
                            {selectedUserCheckoutAddress?.receiverName ? `${selectedUserCheckoutAddress.receiverName}, ${selectedUserCheckoutAddress.city}` : "Select Address"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-1 mx-4 max-w-xl">
                    <input className="flex-1 px-2 py-1 text-black rounded-l" placeholder="Search products..." />
                    <button className="bg-yellow-400 px-3 rounded-r">
                        <FaSearch className="text-black" />
                    </button>
                </div>

                <div className="flex items-center space-x-6">
                    {(user && user.username) ? (
                        <div className="flex flex-col leading-tight text-right">
                            <span className="text-xs">Hello, {user.username}</span>
                            <Link to="/profile" className="font-bold hover:underline">Account & Lists</Link>
                        </div>
                    ) : (
                        <Link to="/login" className="flex flex-col leading-tight text-right">
                            <span className="text-xs">Hello, Sign in</span>
                            <span className="font-bold hover:underline">Account & Lists</span>
                   </Link> 
                    )}
                    <Link to="/profile/orders" className="flex flex-col leading-tight text-right">
                        <span className="text-xs">Returns</span>
                        <span className="font-bold hover:underline">& Orders</span>
                   </Link> 
                    <Link to="/cart" className="relative flex items-center">
                        <Badge
                            showZero
                            badgeContent={cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}
                            color="primary"
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <FaShoppingCart size={25} />
                        </Badge>
                        <span className="ml-1">Cart</span>
                   </Link> 
                </div>
            </div>
        </div>
    )
}

export default Navbar;