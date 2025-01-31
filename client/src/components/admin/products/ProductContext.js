// client\src\components\admin\products\ProductContext.js

export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    pAttributes: {}, // Initialize with an empty object
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    /* Get all product */
    case "fetchProductsAndChangeState":
      return {
        ...state,
        products: action.payload,
      };
    /* Create a product */
    case "addProductModal":
      return {
        ...state,
        addProductModal: action.payload,
      };
    /* Edit a product */
    case "editProductModalOpen":
      const product = action.product;
      return {
        ...state,
        editProductModal: {
          modal: true,
          pId: product._id,
          pName: product.pName,
          pDescription: product.pDescription,
          pImages: product.pImages,
          pStatus: product.pStatus,
          pCategory: product.pCategory,
          pQuantity: product.pQuantity,
          pPrice: product.pPrice,
          pOffer: product.pOffer,
          pAttributes: { ...state.editProductModal.pAttributes, ...product.pAttributes }, // Merge existing attributes
        }
      };
    case "editProductModalClose":
      return {
        ...state,
        editProductModal: {
          modal: false,
          pId: "",
          pName: "",
          pDescription: "",
          pImages: null,
          pStatus: "",
          pCategory: "",
          pQuantity: "",
          pPrice: "",
          pOffer: "",
          pAttributes: {}, // Reset to empty object
        },
      };
    default:
      return state;
  }
};