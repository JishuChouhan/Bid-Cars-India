import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="relative h-64 mb-12">
        <img 
          src="/api/placeholder/1200/400"
          alt="Cars in showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">About Us</h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Bid Cars India</h2>
        <p className="text-gray-600 mb-6">
          At Bid Cars India, we are New Delhi's premier destination for premium automotive auctions. 
          Our platform brings together passionate car enthusiasts and serious buyers in a dynamic 
          marketplace designed for transparent and efficient vehicle trading.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            We strive to revolutionize the automotive auction industry in India by providing 
            a secure and transparent platform where buyers and sellers can connect with confidence. 
            Our mission is to make quality vehicles accessible through a seamless digital auction 
            experience, backed by comprehensive support and expertise.
          </p>
        </div>
        <div>
          <img 
            src="/api/placeholder/600/400" 
            alt="Auction in progress"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
        <p className="text-gray-600">
          We envision becoming India's leading automotive auction platform, known for our 
          commitment to excellence, technological innovation, and customer satisfaction. 
          Through our dedication to transparency and fairness, we aim to build lasting 
          relationships within the automotive community and set new standards for the industry.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 p-8 rounded-lg mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Bid Cars India?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold mb-2">Expert Verification</h4>
              <p className="text-gray-600">Thorough inspection and verification of all vehicles</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold mb-2">Digital Innovation</h4>
              <p className="text-gray-600">State-of-the-art online bidding platform</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold mb-2">Customer Support</h4>
              <p className="text-gray-600">Dedicated assistance throughout the process</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-12">
        <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
          Start Bidding Today
        </button>
      </div>
    </div>
  );
};

export default About;