import React from 'react';
import logo from './car-auction.jpg';

const About = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="relative mb-">
        <img 
          src={logo} 
          alt="Cars in showroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black flex flex-col justify-center items-center text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Welcome to Bid Cars India</h1>
          <p className="text-white text-lg mb-6">
            Your Trusted Partner in Premium Automotive Auctions
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
            Explore Auctions
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Bid Cars India</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          At Bid Cars India, we connect car enthusiasts and serious buyers through a transparent, efficient, and dynamic automotive auction platform. 
          Based in New Delhi, our mission is to revolutionize the car auction experience in India, making it simple and secure for everyone.
        </p>
        <p className="text-gray-600 leading-relaxed">
          From expert-verified vehicles to seamless online auctions, we ensure a reliable process for both buyers and sellers.
        </p>
      </div>

      {/* Our Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To create a secure, user-friendly, and transparent digital auction platform that connects automotive buyers and sellers with confidence.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To be India's leading automotive auction platform by setting new standards in quality, innovation, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 p-12 rounded-lg shadow-lg mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Bid Cars India?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h4 className="font-semibold mb-2">Expert Verification</h4>
            <p className="text-gray-600">Thorough inspection and verification of all vehicles.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h4 className="font-semibold mb-2">Digital Innovation</h4>
            <p className="text-gray-600">State-of-the-art online bidding platform for seamless auctions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h4 className="font-semibold mb-2">Customer Support</h4>
            <p className="text-gray-600">Dedicated support throughout your auction journey.</p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Integrity</h4>
            <p className="text-gray-600">Building trust with transparent processes.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Innovation</h4>
            <p className="text-gray-600">Continuously improving our platform and services.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Excellence</h4>
            <p className="text-gray-600">Delivering top-notch customer experiences.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "Bid Cars India made it incredibly easy for me to sell my old car. Their process was quick, and the support team was fantastic!"
            </p>
            <h4 className="font-semibold">- Ravi Kumar</h4>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "I was able to buy a verified car at an amazing price. The platform is super easy to use!"
            </p>
            <h4 className="font-semibold">- Neha Sharma</h4>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg">
        <h3 className="text-3xl font-bold mb-4">Ready to Join the Auction Revolution?</h3>
        <p className="text-lg mb-6">
          Sign up today to discover quality vehicles and start bidding now!
        </p>
        <button className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
