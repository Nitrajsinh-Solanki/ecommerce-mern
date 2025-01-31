import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import { createCategory, getAllCategory } from "./FetchApi";

const AddCategoryModal = () => {
  const { data, dispatch } = useContext(CategoryContext);

  const Alert = ({ msg, type }) => (
    <div className={`rounded-lg mb-4 px-6 py-3 text-sm font-medium ${
      type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      {msg}
    </div>
  );

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 2000);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading", payload: true });

    if (!fData.cImage) {
      dispatch({ type: "loading", payload: false });
      return setFdata({ ...fData, error: "Please upload a category image" });
    }

    try {
      let responseData = await createCategory(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });
        dispatch({ type: "loading", payload: false });
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: "loading", payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        onClick={() => dispatch({ type: "addCategoryModal", payload: false })}
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity`}
      />

      {/* Modal */}
      <div
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed inset-0 z-50 flex items-center justify-center p-4`}
      >
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl transform transition-all">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-2xl font-semibold text-gray-900">
              Add Category
            </h3>
            <button
              onClick={() => dispatch({ type: "addCategoryModal", payload: false })}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {fData.error && <Alert msg={fData.error} type="error" />}
            {fData.success && <Alert msg={fData.success} type="success" />}

            <form onSubmit={submitForm} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={fData.cName}
                  onChange={(e) => setFdata({ ...fData, cName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={fData.cDescription}
                  onChange={(e) => setFdata({ ...fData, cDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setFdata({ ...fData, cImage: e.target.files[0] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={fData.cStatus}
                  onChange={(e) => setFdata({ ...fData, cStatus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;
