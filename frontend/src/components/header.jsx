import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchTerm}`); // Suppose you have a route that handles search
        setSearchTerm('');
    };

    return (
        <>
            <header className="bg-blue-500 text-white">
                <nav className="flex items-center justify-between p-4">
                    <div className="text-lg">CiNeFun</div>
                    <div>
                        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                className="px-4 py-2 w-full rounded text-black focus:ring-2 focus:ring-blue-300 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-300">
                                Search
                            </button>
                        </form>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                    <ul className={`md:flex md:items-center md:justify-between absolute md:relative bg-blue-500 md:bg-transparent w-full md:w-auto ${isOpen ? "flex" : "hidden"} flex-col md:flex-row`}>
                        <li className="p-2"><Link className="hover:text-blue-300" to="home" onClick={() => setIsOpen(false)}>Home</Link></li>
                        <li className="p-2"><Link className="hover:text-blue-300" to="favoris" onClick={() => setIsOpen(false)}>Favorites</Link></li>
                        <li className="p-2"><Link className="hover:text-blue-300" to="vus" onClick={() => setIsOpen(false)}>Seen</Link></li>
                        <li className="p-2"><Link className="hover:text-blue-300" to="avoir" onClick={() => setIsOpen(false)}>To Watch</Link></li>
                        <li className="p-2"><Link className="hover:text-blue-300" to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
                        <li className="p-2"><Link className="hover:text-blue-300" to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
                    </ul>
                </nav>
            </header>

            <section>
                <Outlet />
            </section>
        </>
    );
};

export default Header;
