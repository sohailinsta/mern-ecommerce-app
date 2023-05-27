import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        let result = response.data.products.slice(10, 22);
        // console.log(result);
        setItems(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="scrollable-container">
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {items.map((item) => {
            return (
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
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
}

export default ProductList;
