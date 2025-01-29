import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contextAuth/AuthContext";
import CarCard from "./CarCard";
import { MainHeader } from "../header/MainHeader";
import { BASE_URL } from "../../config/Config";

const FrontPage = () => {
  const [cars, setCars] = useState([]);
  const [openBidModal, setOpenBidModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [isBidWithPaper, setIsBidWithPaper] = useState(true); // Track bid type
  const [maxBid, setMaxBid] = useState("");
  const [showAllCars, setShowAllCars] = useState(false); // Track if user is logged in and wants to see all cars
  const {
    user,
    bidCounts,
    setBidCounts,
    bidCountWithoutPaper,
    setBidCountWithoutPaper,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/car`);
        const visibleCars = response.data.filter((car) => car.visible === true);
        setCars(visibleCars);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenBidModal = (car, withPaper) => {
    if (user && new Date(car.auctionEndTime).getTime() > new Date().getTime()) {
      setSelectedCar(car);
      setIsBidWithPaper(withPaper);
      setOpenBidModal(true);
    } else {
      if (!user) {
        navigate("/login");
      } else {
        console.log("Auction time has ended for this car.");
      }
    }
  };

  const getBidCount = (carId) => {
    const bidCountObj = bidCounts.find((item) => item.carId === carId);
    return bidCountObj ? bidCountObj.bidCount : 0;
  };

  const getBidCountWithoutPaper = (carId) => {
    const bidCountObj = bidCountWithoutPaper.find(
      (item) => item.carId === carId
    );
    return bidCountObj ? bidCountObj.bidCount : 0;
  };

  const handleCloseBidModal = () => {
    setOpenBidModal(false);
    setBidAmount("");
    setMaxBid("");
    setSelectedCar(null);
  };

  const handleBidSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken");
    const url = isBidWithPaper
      ? `${BASE_URL}/bids`
      : `${BASE_URL}/bids/withoutPaper`;

    try {
      const response = await axios.post(
        url,
        {
          carId: selectedCar.id,
          amount: bidAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Bid submitted:", response.data);

      const updatedBidCounts = isBidWithPaper
        ? bidCounts
        : bidCountWithoutPaper;
      const updateBidCounts = updatedBidCounts.map((ele) =>
        ele.carId === selectedCar.id
          ? { ...ele, bidCount: ele.bidCount + 1 }
          : ele
      );

      if (isBidWithPaper) {
        setBidCounts(updateBidCounts);
      } else {
        setBidCountWithoutPaper(updateBidCounts);
      }

      const isMaxBid = response.data.isMaxBid;
      if (isMaxBid) {
        setMaxBid(
          `🎉 Congratulations! You are currently winning this car with a bid of ${bidAmount}! 🚗👑`
        );
      } else {
        setMaxBid(
          `📉 Your bid of ${bidAmount} was placed, but you are not currently winning this car. 😔`
        );
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      setMaxBid("❌ There was an error placing your bid. Please try again. 🔄");
    }
  };

  const isBidLimitReached = (carId) => getBidCount(carId) >= 20;
  const isBidLimitReachedWithoutPaper = (carId) =>
    getBidCountWithoutPaper(carId) >= 20;

  return (
    <div className="font-source-sans-pro bg-white min-h-screen">
      <MainHeader />
      <section
        className="bg-cover bg-center h-screen bg-no-repeat box-border"
        style={{
          backgroundImage:
            'url("https://www.infinity-group.in/wp-content/uploads/2021/07/5-Benefits-of-Buying-A-Pre-Owned-Luxury-Car.jpg")',
        }}
      >
        {/* <div className="top-0 left-0 right-0 bottom-0"></div> */}
        <div className="flex flex-col justify-center items-center text-black h-full">
          <h2 className="text-6xl xs:text-3xl sm:text-5xl font-bold">
            Welcome to Bid Cars India
          </h2>
          <p className="text-xl">Bid With Us, Grow With Us</p>
        </div>
      </section>
      <div
        className="bg-black text-white py-16 px-8 flex bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://wallpapercat.com/w/full/5/b/6/1756484-2560x1600-desktop-hd-rolls-royce-cullinan-wallpaper-photo.jpg")',
        }}
      >
        <div className="max-w-7xl mx-auto flex max-lg:flex-col">
          <div className="mb-8">
            <h3 className="text-red-500 text-lg font-semibold uppercase">
              Who We Are ?
            </h3>
            <h1 className="text-4xl font-bold mt-4">
            Your trusted platform for hassle-free automobile auctions!
            </h1>
            <p className="mt-6 font-bold text-gray-300 max-w-3xl mx-auto leading-relaxed">
              At Bids Car India, we are revolutionizing the automobile auction
              industry, offering a dynamic platform where buyers and sellers
              connect seamlessly for exceptional deals on vehicles. With a
              steadfast commitment to transparency, innovation, and customer
              satisfaction, we empower individuals and businesses to bid with
              confidence. Our passion lies in creating a fair and competitive
              marketplace that bridges the gap between vehicle owners and
              aspiring buyers. At Bids Car India, we are your trusted partner,
              redefining the future of automobile auctions with integrity and
              excellence.
            </p>
          </div>

          {/* Vehicle Categories */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 max-w-5xl mx-auto cursor-pointer">
            {[
              {
                src: "https://images.tv9hindi.com/wp-content/uploads/2022/05/kia-sedan-car.jpg",
                name: "Sedan",
              },
              {
                src: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Ertiga/10293/1687252933647/rear-left-view-121.jpg",
                name: "Ertiga",
              },
              {
                src: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-20.jpeg?isig=0&q=80",
                name: "SUV",
              },
              {
                src: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202408/mahindra-thar-roxx-200912599-16x9_0.jpg?VersionId=8gFUdclSl6.epCT95iSrtU5MCXzyDyRR&size=690:388",
                name: "Thar",
              },
              {
                src: "https://static1.topspeedimages.com/wordpress/wp-content/uploads/2023/01/mercedes-g-wagen.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
                name: "G-Wagon",
              },
              {
                src: "https://cdn.motor1.com/images/mgl/zxVvnK/s1/mercedes-amg-cle-53-cabriolet-2024.webp",
                name: "Cabriolet",
              },
            ].map((car, index) => (
              <div
                key={index}
                className="relative bg-white text-center rounded-lg shadow-lg overflow-hidden ... transform-3d rotate-x-51 rotate-z-43 transition-all duration-500 hover:-translate-y-4 hover:rotate-x-49 hover:rotate-z-38 hover:shadow-2xl"
              >
                <img
                  src={car.src}
                  alt={car.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-xl font-semibold">
                    {car.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`flex flex-wrap justify-center -m-4 ${
            !user && !showAllCars ? "blur-sm" : ""
          }`}
        >
          {(user || showAllCars ? cars : cars.slice(0, 6)).map((car) => (
            <CarCard
              key={car.id}
              car={car}
              handleOpenBidModal={handleOpenBidModal}
              getBidCount={getBidCount}
              isBidLimitReached={isBidLimitReached}
              handleOpenWithoutPaperBidModal={handleOpenBidModal} // Modified to use the same function
              getBidCountWithoutPaper={getBidCountWithoutPaper}
              isBidLimitReachedWithoutPaper={isBidLimitReachedWithoutPaper}
            />
          ))}
        </div>
        {!user && cars.length > 2 && !showAllCars && (
          <div className="text-center mt-6">
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-white rounded-full px-4 sm:px-6 py-2 font-bold bg-blue-800 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              View All Cars
            </button>
          </div>
        )}
      </main>

      {openBidModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">
              Place Your Bid for {selectedCar.carName}
            </h2>
            <form onSubmit={handleBidSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="bidAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Bid Amount
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => {
                    setBidAmount(e.target.value);
                  }}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white rounded-full px-4 py-2 mr-2"
                  onClick={handleCloseBidModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
                >
                  Submit Bid
                </button>
              </div>
              <div className="text-center mt-4 text-gray-700 font-semibold">
                {maxBid}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
