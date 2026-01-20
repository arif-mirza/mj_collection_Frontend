import React from 'react'
import "../contact/contact.css";


function Contact() {
  return (
    <>
    <section class="contact-us">
  <div class="container">
    <div class="contact-header">
      <h1 className='text-dark display-4'>Contact MJ Collection</h1>
      <p>We'd Love to Hear From You</p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <h2 className='text-dark display-4'>Get in Touch</h2>
        <p>
          Whether you have questions, feedback, or just want to say hello, we're here to help! Reach out to us using any of the methods below, and we'll get back to you as soon as possible.
        </p>
        <ul>
          <li><i class="fas fa-map-marker-alt"></i> 123 Fashion Avenue, New York, NY 10001</li>
          <li><i class="fas fa-phone-alt"></i> +1 (555) 123-4567</li>
          <li><i class="fas fa-envelope"></i> support@mjcollection.com</li>
        </ul>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </div>
      </div>

      <div class="contact-form">
        <h2 className='text-dark'>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" class="input-field" required />
          <input type="email" placeholder="Your Email" class="input-field" required />
          <textarea placeholder="Your Message" class="textarea-field" required></textarea>
          <button type="submit" class="btn-dark">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</section>
    
    </>
  )
}

export default Contact