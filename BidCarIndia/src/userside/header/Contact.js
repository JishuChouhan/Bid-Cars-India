const Contact = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="relative h-64 mb-12">
        <img 
          src="https://as1.ftcdn.net/v2/jpg/05/89/92/50/1000_F_589925063_ecQvtkwNAEnB7Nd9ad3hM7GOP0lae694.jpg"
          alt="Contact us"
          className="w-full h-96 object-cover box-border mt-16 mb-16"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-10">
          <h1 className="text-white text-5xl font-bold">Contact Us</h1>
        </div> */}
      </div>

      {/* Contact Grid */}
      <div className="grid md:grid-cols-2 gap-12 mb-12 mt-24">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors w-full">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Address</h3>
                <p className="text-gray-600">Office No.101 DSIIDC<br />Narela Delhi-110040</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-gray-600">auction@bidcarsindia.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <p className="text-gray-600">+91 8882451292</p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Business Hours</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
