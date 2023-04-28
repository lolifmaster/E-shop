import axiosInstance from "../axios.js";
import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline/index.js";

const DeleteOrder = ({ show, setShow, orderId, refresh }) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`http://localhost:8000/api/orders/${orderId}/`);
      refresh();
      setShow(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`fixed top-20 w-screen h-screen bg-gray-900 bg-opacity-50 z-50 ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-md bg-white rounded-md mx-auto mt-20 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Delete Order</h3>
          <button onClick={() => setShow(false)}>
            <XCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete this order?
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrder;
