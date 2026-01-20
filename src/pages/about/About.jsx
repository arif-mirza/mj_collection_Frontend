import React from 'react'
import "../about/about.css";
import aboutImg from "../../assets/images/info-img.jpg"

function About() {
  return (
    <>
    <section class="about-us">
  <div class="container">
    <div class="about-header">
      <h1>Welcome to MJ Collection</h1>
      <p>Your Fashion, Our Passion</p>
    </div>
    <div class="about-content">
      <div class="about-image">
        <img src={aboutImg} alt="MJ Collection" />
      </div>
      <div class="about-text">
        <h2 className='text-dark display-1'>Our Story</h2>
        <p>
          At MJ Collection, we believe that fashion is more than just clothing – it's an expression of individuality, a way to make a statement. Founded with a passion for timeless designs and contemporary style, we bring you a curated collection of premium clothing that blends comfort, elegance, and modern aesthetics.
        </p>
        <p>
          Whether you're looking for classic wardrobe staples or the latest trends, MJ Collection offers something for everyone. With a keen eye for detail and a commitment to quality, each piece is crafted to elevate your everyday look and celebrate your unique style.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to provide our customers with the finest selection of clothing and accessories, while delivering an exceptional shopping experience. From the moment you browse our store to the second you wear our designs, we are here to ensure you feel confident, comfortable, and chic.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>High-Quality Fabrics and Designs</li>
          <li>Hand-Picked Collections to Reflect the Latest Trends</li>
          <li>Affordable Prices without Compromising on Style</li>
          <li>Exceptional Customer Service and Easy Returns</li>
        </ul>
      </div>
    </div>
  </div>
</section>
    
    </>
  )
}

export default About