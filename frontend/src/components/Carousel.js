import React from "react";
import { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carousel.css";
import axios from "axios";

function Carousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      let result = response.data.products.slice(0, 10);
      setProducts(result);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="slider-container">
      <Slider className="slick-slider"
       dots={true}
       infinite={true}
       speed={500}
       slidesToShow={3}
       slidesToScroll={1}
       autoplay={true}
      >
          {products.map((product)=> (
            <div key={product.id}>
            <img src={product.thumbnail} alt={product.brand} />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default Carousel;
