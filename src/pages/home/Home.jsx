import { useEffect } from "react";
import bg from "../../assets/images/bg.jpg";
import "../home/home.css";
import Products from "../products/Products";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import AOS from "aos";
function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1300, // Set global animation duration
      offset: 190, // Set the offset (trigger point for animations)
      once: false,
      easing: "easeInOut", // Easing function (linear, ease, ease-in-out, etc.)
      delay: 100, // Global delay for all animations (in milliseconds)

      mirror: true, // Should the animation happen again when scrolling up?
      anchorPlacement: "top-bottom", // Ensure animations only happen once per scroll
    });
  }, []);

  return (
    <>
      <div className="hero">
        <div class="card text-bg-dark border-0">
          <img src={bg} class="card-img" alt="Background" />
          <div className="overlay"></div>
          <div class="card-img-overlay d-flex flex-column justify-content-center">
            <div className="container">
              <h5
                className="card-title display-3 fw-bolder mb-0"
                data-aos="slide-right"
              >
                New Season Arrival
              </h5>
              <p className="card-text leads fs-2" data-aos="fade-flip">
                Check Out All Trends.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Products />
    </>
  );
}

export default Home;
