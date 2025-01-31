import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { createProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";

const AddProductDetail = ({ categories }) => {
  const { data, dispatch } = useContext(ProductContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    pName: "",
    pDescription: "",
    pStatus: "Active",
    pImage: null,
    pCategory: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
    success: false,
    error: false,
    pSizeOptions: [],
    pAttributes: {
      styleCode: "",
      fabricCare: "",
      pattern: "",
      type: "",
      fabric: "",
      lengthType: "",
      idealFor: "",
      style: "",
      neck: "",
      sleeve: "",
    },
  });

  const fetchData = async () => {
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();
  
    if (!fData.pImage || fData.pImage.length < 2) {
      setFdata({ ...fData, error: "Please upload at least 2 images" });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 2000);
      return;
    }
  
    try {
      let responseData = await createProduct(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          pName: "",
          pDescription: "",
          pImage: null,
          pStatus: "Active",
          pCategory: "",
          pPrice: "",
          pQuantity: "",
          pOffer: 0,
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFdata({
            ...fData,
            pName: "",
            pDescription: "",
            pImage: null,
            pStatus: "Active",
            pCategory: "",
            pPrice: "",
            pQuantity: "",
            pOffer: 0,
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div
        onClick={(e) => dispatch({ type: "addProductModal", payload: false })}
        className={`${data.addProductModal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      <div
        className={`${data.addProductModal ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div
          style={{
            marginTop: '32px',
            maxWidth: '90%',
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            margin: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              Add Product
            </span>
            <span
              style={{
                backgroundColor: '#303031',
                color: '#fff',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={(e) => dispatch({ type: "addProductModal", payload: false })}
            >
              <svg
                style={{
                  width: '24px',
                  height: '24px',
                  fill: 'none',
                  stroke: 'currentColor',
                }}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error && (
            <div
              style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '10px',
                marginBottom: '16px',
              }}
            >
              {fData.error}
            </div>
          )}
          {fData.success && (
            <div
              style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '10px',
                marginBottom: '16px',
              }}
            >
              {fData.success}
            </div>
          )}
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            onSubmit={(e) => submitForm(e)}
          >
            <div
              style={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}
                  htmlFor="name"
                >
                  Product Name *
                </label>
                <input
                  value={fData.pName}
                  onChange={(e) => setFdata({ ...fData, pName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  type="text"
                />
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}
                  htmlFor="price"
                >
                  Product Price *
                </label>
                <input
                  value={fData.pPrice}
                  onChange={(e) => setFdata({ ...fData, pPrice: e.target.value })}
                  type="number"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  id="price"
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
                htmlFor="description"
              >
                Product Description *
              </label>
              <textarea
                value={fData.pDescription}
                onChange={(e) => setFdata({ ...fData, pDescription: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  height: '100px',
                }}
                name="description"
                id="description"
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
                htmlFor="image"
              >
                Product Images *
              </label>
              <span
                style={{
                  fontSize: '12px',
                  color: '#666',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Must need 2 images
              </span>
              <input
                onChange={(e) => setFdata({ ...fData, pImage: [...e.target.files] })}
                type="file"
                accept=".jpg, .jpeg, .png"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                id="image"
                multiple
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
                htmlFor="sizeOptions"
              >
                Size Options *
              </label>
              <input
                value={fData.pSizeOptions.join(", ") || ""}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    pSizeOptions: e.target.value.split(",").map(size => size.trim()),
                  })
                }
                type="text"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                id="sizeOptions"
                placeholder="S,M,L,XL,XXL"
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontWeight: 'bold',
                }}
                htmlFor="attributes"
              >
                Product Attributes *
              </label>
              <div>
                {Object.keys(fData.pAttributes).map((key, index) => (
                  <div key={index}>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '4px',
                        fontWeight: 'bold',
                      }}
                      htmlFor={key}
                    >
                      {key}
                    </label>
                    <input
                      value={fData.pAttributes[key]}
                      onChange={(e) =>
                        setFdata({
                          ...fData,
                          pAttributes: {
                            ...fData.pAttributes,
                            [key]: e.target.value,
                          },
                        })
                      }
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                      type="text"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}
                  htmlFor="status"
                >
                  Product Status *
                </label>
                <select
                  value={fData.pStatus}
                  onChange={(e) => setFdata({ ...fData, pStatus: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  id="status"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}
                  htmlFor="category"
                >
                  Product Category *
                </label>
                <select
                  value={fData.pCategory}
                  onChange={(e) => setFdata({ ...fData, pCategory: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  id="category"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.cName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}
                  htmlFor="quantity"
                >
                  Product in Stock *
                </label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) => setFdata({ ...fData, pQuantity: e.target.value })}
                  type="number"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  id="quantity"
                />
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}
                  htmlFor="offer"
                >
                  Product Offer (%) *
                </label>
                <input
                  value={fData.pOffer}
                  onChange={(e) => setFdata({ ...fData, pOffer: e.target.value })}
                  type="number"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  id="offer"
                />
              </div>
            </div>
            <div
              style={{
                marginTop: '16px',
              }}
            >
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal = (props) => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [allCat, setAllCat] = useState([]);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData && responseData.Categories) {
      setAllCat(responseData.Categories);
    }
  };

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;