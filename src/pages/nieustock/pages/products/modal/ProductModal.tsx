import React, { useState } from "react";
import axiosInstance from "../../../../../axiosInstance"; // Adjust the import path based on your project structure

interface ProductModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

interface FormData {
  name: string;
  category: string;
  store: string;
  sku: string;
  price: string;
  stock: string;
  type: string;
  usageHistory: string;
  toolHealth: string;
  image: string;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    store: "",
    sku: "",
    price: "",
    stock: "",
    type: "",
    usageHistory: "",
    toolHealth: "",
    image: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, category, store, sku, price, stock, type, usageHistory, toolHealth, image } = formData;

    // Validation
    if (!name || !category || !store || !sku || !price || !stock || !type || !usageHistory || !toolHealth || !image) {
      setError("All fields are required");
      return;
    }

    setError(null);

    try {
      await axiosInstance.post("/products", formData); // Replace "/products" with your API endpoint
      setFormData({
        name: "",
        category: "",
        store: "",
        sku: "",
        price: "",
        stock: "",
        type: "",
        usageHistory: "",
        toolHealth: "",
        image: "",
      });
    } catch (err) {
      console.error("Failed to submit data:", err);
      setError("Failed to submit data. Please try again.");
    }
  };

  return (
    <>
      {show && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={onHide}
        >
          <div
            className="relative p-4 w-[1000px] rounded-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <div className="p-4 text-start">
                {/* Row 1 */}
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Category:
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Category"
                    />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Store:
                    </label>
                    <input
                      type="text"
                      name="store"
                      value={formData.store}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Store"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      SKU:
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter SKU"
                    />
                  </div>
                </div>
                {/* Row 3 */}
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Price:
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Stock:
                    </label>
                    <input
                      type="text"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Stock"
                    />
                  </div>
                </div>
                {/* Row 4 */}
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Type:
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Type"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Usage History:
                    </label>
                    <input
                      type="text"
                      name="usageHistory"
                      value={formData.usageHistory}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Usage History"
                    />
                  </div>
                </div>
                {/* Row 5 */}
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Tool Health:
                    </label>
                    <input
                      type="text"
                      name="toolHealth"
                      value={formData.toolHealth}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Tool Health"
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Image:
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Image URL"
                    />
                  </div>
                </div>
              </div>
              {error && <div className="text-danger text-center mt-2">{error}</div>}
              <div className="text-center mt-3">
                <button
                  className="blue w-52 p-2 px-40 rounded-lg text-white mb-3 font-semibold inter"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
