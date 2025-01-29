import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-10 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">About Us</h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg mb-6">
            <strong>Bids Cars India</strong> is the leading platform in Delhi for buying and selling salvage vehicles. We provide a seamless and dynamic auction experience that connects buyers and sellers with incredible value and trust.
          </p>
          <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            At <strong>Bids Cars India</strong>, our mission is to revolutionize the salvage vehicle auction industry in India. We are dedicated to offering an exceptional customer experience, ensuring transparency, and fostering an engaging, trustworthy environment for all participants.
          </p>
          <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Our Vision</h2>
          <p className="text-lg mb-6">
            We aspire to become the premier destination for salvage vehicle auctions, known for our unwavering integrity, innovative approaches, and commitment to sustainability. Our goal is to build a vibrant community of buyers and sellers who share our passion for turning salvage goods into valuable assets. By setting new standards of excellence, we aim to redefine the market and create lasting positive impacts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
