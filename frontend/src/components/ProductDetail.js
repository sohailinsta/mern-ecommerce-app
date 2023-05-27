import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        let result = response.data;
        console.log(result);
        setDetail(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const response = await axios.post('http://localhost:8000/api/checkout', {
      detail: detail
    });
    console.log(response.data);
    // Redirect to checkout page
    window.location = response.data.checkoutUrl;
  };
  

  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={detail.thumbnail}
            alt={detail.brand}
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              {detail.brand}
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {detail.title}
            </h1>
            <p class="leading-relaxed">{detail.description}</p>
            <div class="flex mt-5">
              <span class="title-font font-medium text-2xl text-gray-900">
                ${detail.price} Only
              </span>
              <button onClick={handleSubmit} class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Buy Now
              </button>
              <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
