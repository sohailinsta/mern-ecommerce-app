import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState([]);
  

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
  if (!jwt && location.pathname !== '/') {
    navigate('/');
  }

    async function fetchProducts() {
      try {
        const promise = await axios.get("https://dummyjson.com/products");
        setProduct(promise.data.products);
        console.log(promise.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [location.pathname, navigate]);

  function handleInputChange(e) {
    setQuery(e.target.value);
    console.log(e.target.value);
  }

  const filteredData = product.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            href="#s"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 pt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a href="#s" className="mr-5 hover:text-gray-900">
              First Link
            </a>
            <a href="#s" className="mr-5 hover:text-gray-900">
              Second Link
            </a>
            <a href="#s" className="mr-5 hover:text-gray-900">
              Third Link
            </a>
            <a href="#s" className="mr-5 hover:text-gray-900">
              Fourth Link
            </a>
          </nav>
        
          <button onClick={handleSignOut} class="flex mr-48 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Sign Out
              </button>

          <form>
            <div class="flex">
              <div class="relative w-full">
                <input
                  type="text"
                  id="search-dropdown"
                  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search"
                  value={query}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="submit"
                  class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
      <div class="container px-5 mx-auto">
      <div class="flex flex-wrap -m-4">
        {filteredData.map((item) => {
          return query.length >= 1 ? (
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link to={`/ProductDetail/${item.id}`}>
                <a
                  href="#s"
                  class="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    class="object-cover object-center w-full h-full block"
                    src={item.thumbnail}
                    alt={item.brand}
                  />
                </a>
             
              <div class="mt-4">
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {item.category}
                </h3>
                <h2 class="text-gray-900 title-font text-lg font-medium">
                  {item.title}
                </h2>
                <h5 class="text-gray-900 title-font">{item.description}</h5>
                <div className="d-flex justify-between">
                  <p class="mt-1 font-bold">${item.price} Only</p>
                  <p class="mt-1 font-bold">${item.discountPercentage} OFF</p>
                </div>
              </div>
              <button class="flex mr-auto mt-2 text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded">
                Add To Cart
              </button>
              </Link>
            </div>
          ) : (
            <></>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default Header;
