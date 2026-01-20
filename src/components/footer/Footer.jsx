import "../footer/footer.css";

function Footer() {

  return (
    <>
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-column">
            <h3>About MJ Collection</h3>
            <p>
              At MJ Collection, we bring the latest trends in fashion to elevate
              your style. Discover high-quality clothing, accessories, and more.
              Experience the best in fashion with us.
            </p>
          </div>
          <div class="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: support@mjcollection.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Fashion Ave, New York, NY</li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MJ Collection. All Rights Reserved.</p>
      
        </div>
      </footer>
    </>
  );
}

export default Footer;
