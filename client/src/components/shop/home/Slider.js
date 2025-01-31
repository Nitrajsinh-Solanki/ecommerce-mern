import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Fetch slider images on component mount
  useEffect(() => {
    sliderImages(dispatch);
  }, [dispatch]);

  // Automatic slider functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 2000); // Slide changes every 2 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slide, data.sliderImages]);

  const handleNextSlide = () => {
    if (slide === data.sliderImages.length) {
      // Temporarily disable transitions and reset to first cloned image
      setIsTransitioning(false);
      setSlide(1);
    } else {
      setIsTransitioning(true); // Enable transitions
      setSlide((prevSlide) => prevSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (slide === 0) {
      // Temporarily disable transitions and move to last cloned image
      setIsTransitioning(false);
      setSlide(data.sliderImages.length - 1);
    } else {
      setIsTransitioning(true); // Enable transitions
      setSlide((prevSlide) => prevSlide - 1);
    }
  };

  // Add clones for circular sliding
  const sliderImagesWithClones =
    data.sliderImages.length > 0
      ? [
          data.sliderImages[data.sliderImages.length - 1], // Clone of last image at the beginning
          ...data.sliderImages,
          data.sliderImages[0], // Clone of first image at the end
        ]
      : [];

  const sliderStyles = {
    wrapper: {
      position: "relative",
      marginTop: "6rem",
      backgroundColor: "#f3f4f6",
      border: "2px solid #e5e7eb",
      height: "400px",
      overflow: "hidden",
    },
    sliderContainer: {
      display: "flex",
      transition: isTransitioning ? "transform 0.8s ease-in-out" : "none",
      transform: `translateX(-${slide * 100}%)`,
    },
    image: {
      minWidth: "100%",
      height: "400px",
      objectFit: "cover",
      objectPosition: "center",
    },
    navigationButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "48px",
      height: "48px",
      cursor: "pointer",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
      transition: "all 0.3s ease",
    },
  };

  // Handle transition end for resetting cloned slides
  const handleTransitionEnd = () => {
    if (slide === data.sliderImages.length + 1) {
      setIsTransitioning(false); // Temporarily disable transitions
      setSlide(1); // Reset to the first real slide
    }
    if (slide === 0) {
      setIsTransitioning(false); // Temporarily disable transitions
      setSlide(data.sliderImages.length); // Reset to the last real slide
    }
  };

  return (
    <Fragment>
      <div style={sliderStyles.wrapper}>
        <div
          style={sliderStyles.sliderContainer}
          onTransitionEnd={handleTransitionEnd}
        >
          {sliderImagesWithClones.map((item, index) => (
            <img
              key={index}
              style={sliderStyles.image}
              src={`${apiURL}/uploads/customize/${item.slideImage}`}
              alt={`slider-${index}`}
            />
          ))}
        </div>

        {data?.sliderImages?.length > 0 && (
          <>
            <div
              onClick={handlePrevSlide}
              style={{ ...sliderStyles.navigationButton, left: "20px" }}
            >
              <svg
                style={{ width: "24px", height: "24px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>

            <div
              onClick={handleNextSlide}
              style={{ ...sliderStyles.navigationButton, right: "20px" }}
            >
              <svg
                style={{ width: "24px", height: "24px" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </>
        )}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
