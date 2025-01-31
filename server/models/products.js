// C:\Users\amart\Downloads\MERN_Stack_Project_Ecommerce_Adaa Jaipur\MERN_Stack_Project_Ecommerce_Adaa Jaipur\server\models\products.js

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    pDescription: {
      type: String,
      required: true,
    },
    pPrice: {
      type: Number,
      required: true,
    },
    pSold: {
      type: Number,
      default: 0,
    },
    pQuantity: {
      type: Number,
      default: 0,
    },
    pCategory: {
      type: ObjectId,
      ref: "categories",
    },
    pImages: {
      type: Array,
      required: true,
    },
    pOffer: {
      type: String,
      default: null,
    },
    pRatingsReviews: [
      {
        review: String,
        user: { type: ObjectId, ref: "users" },
        rating: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    pStatus: {
      type: String,
      required: true,
    },
    pSizeOptions: {
      type: Array,
      default: ["S", "M", "L", "XL", "XXL"],
    },
    pAttributes: {
      type: Object,
      default: {
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
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;