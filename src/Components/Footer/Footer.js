import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#3E2723', color: '#f5f5f5', padding: '40px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontWeight: '600', letterSpacing: '1px', marginBottom: '10px' }}>
          Blissful Bites
        </h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '25px', color: '#ddd' }}>
          Crafting premium desserts with passion and perfection.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '25px' }}>
          <a href="https://www.facebook.com" style={{ color: '#f5f5f5', fontSize: '1.2rem' }}><FaFacebookF /></a>
          <a href="https://www.instagram.com" style={{ color: '#f5f5f5', fontSize: '1.2rem' }}><FaInstagram /></a>
          <a href="https://www.twitter.com" style={{ color: '#f5f5f5', fontSize: '1.2rem' }}><FaTwitter /></a>
          <a href="mailto:contact@blissfulbites.com" style={{ color: '#f5f5f5', fontSize: '1.2rem' }}><FaEnvelope /></a>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#bbb', marginBottom: '5px' }}>
          Email: contact@blissfulbites.com | Phone: +91 98765 43210
        </p>
        <p style={{ fontSize: '0.9rem', color: '#bbb', marginBottom: '25px' }}>
          Address: 123 Dessert Street, Sweet City, India
        </p>

        <hr style={{ borderColor: '#555', margin: '20px 0' }} />

        <p style={{ fontSize: '0.85rem', color: '#aaa', margin: 0 }}>
          © {new Date().getFullYear()} Blissful Bites. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
