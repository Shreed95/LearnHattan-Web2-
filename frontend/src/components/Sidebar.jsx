import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
import { FaBook, FaUserGroup } from "react-icons/fa6";
import { RiPieChart2Fill } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";


const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const [user, setUser] = useState(null);
  

  const user2 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://learnhattan-mern.vercel.app/api/users/${user2.user}`);
        setUser(response.data.user);


        // const checkResponse = await axios.get(`https://learnhattan-mern.vercel.app/api/dashboard/user/${user2.user}`);
        // setCheck(checkResponse.data);

        
        const profileData = await axios.get(`https://learnhattan-mern.vercel.app/api/dashboard/user/display/${user2.user}`);
        // console.log(profileData.data)
        setUser(profileData.data)
        

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const SignOut = async () => {
    logout();
    navigate("/login");
  };
  const sidebarClass = `fixed top-0 left-0 z-40 w-52 shadow-xl h-screen pt-20 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`;

  const menuItemClass =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
  const iconClass =
    "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";
  return (
    <>
      {/************Topnavbar**********/}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <TiThMenu />
              </button>
              <div className="flex ms-2 md:me-24">
                <img
                  src="/assets/images/logoSymbol.png"
                  className="h-8 me-3"
                  alt="learnhattan Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Learnhattan
                </span>
              </div>
            </div>
            {user && (
              <div className="flex items-center">
                <div className="flex items-center ms-3 relative">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img src={user.photo} alt="userPhoto" className="w-8 h-8 rounded-full" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute z-50 mt-4 top-4 right-10 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                      <div className="px-4 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white">
                          Alice Johnson
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                          AliceJohnson@gmail.com
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <button onClick={() => navigate("/Profile")}
                            className="flex items-center p-2 pr-20 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            role="menuitem"
                          >
                            <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={SignOut}
                            className="flex items-center p-2 pr-20 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                          >
                            <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>  
            )}
          </div>
        </div>
      </nav>
      {/************Sidebar**********/}
      <aside id="logo-sidebar" className={sidebarClass} aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={`/dashboard`} className={menuItemClass}>
                <RiPieChart2Fill className={iconClass} />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/courses" className={menuItemClass}>
                <FaBook className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className={menuItemClass}>
                <FaShoppingCart className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  MarketPlace
                </span>
              </Link>
            </li>
            <li>
              <Link to="/Contributor" className={menuItemClass}>
                <FaUserGroup className={iconClass} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Contributor
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
