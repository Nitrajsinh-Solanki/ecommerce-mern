import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
  }, []);

  const sliderStyles = {
    wrapper: {
      position: 'relative',
      marginTop: '4rem',
      backgroundColor: '#f3f4f6',
      border: '2px solid #e5e7eb',
      height: '400px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      objectPosition: 'center'
    },
    navigationButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      cursor: 'pointer',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      transition: 'all 0.3s ease'
    },
    shopNowButton: {
      background: '#303031',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <Fragment>
      <div style={sliderStyles.wrapper}>
        {data.sliderImages.length > 0 && (
          <img
            style={sliderStyles.image}
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="slider"
          />
        )}

        {data?.sliderImages?.length > 0 && (
          <>
            <div
              onClick={() => prevSlide(data.sliderImages.length, slide, setSlide)}
              style={{...sliderStyles.navigationButton, left: '20px'}}
            >
              <svg
                style={{width: '24px', height: '24px'}}
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
              onClick={() => nextSlide(data.sliderImages.length, slide, setSlide)}
              style={{...sliderStyles.navigationButton, right: '20px'}}
            >
              <svg
                style={{width: '24px', height: '24px'}}
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

            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <a
                href="#shop"
                style={sliderStyles.shopNowButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#404042';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#303031';
                }}
              >
                Shop Now
              </a>
            </div>
          </>
        )}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
