import React, { useState } from "react";
import axiosInstance from "../../../../../axiosInstance"; // Adjust the import path based on your project structure

interface ProductModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

interface FormData {
  name: string;
  price: number;
  description: string;
  featuredimg: File | null;
  maxstock: number;
  symbol: string;
  hazmat: string;
  hazmattype: string;
  precaution: string;
  useageinstructions: string;
  avgToolHealth: number;
  mfgDate: string;
  expiryDate: string;
  minimumstock: number;
  maximumstock: number;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    description: "",
    featuredimg: null,
    maxstock: 0,
    symbol: "",
    hazmat: "",
    hazmattype: "",
    precaution: "",
    useageinstructions: "",
    avgToolHealth: 0,
    mfgDate: "",
    expiryDate: "",
    minimumstock: 0,
    maximumstock: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files ? e.target.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? (parseFloat(value) || 0) : value,
      }));
    }
  };

  const handleSubmit = async () => {
    const {
      name,
      price,
      description,
      featuredimg,
      maxstock,
      symbol,
      hazmat,
      hazmattype,
      precaution,
      useageinstructions,
      avgToolHealth,
      mfgDate,
      expiryDate,
      minimumstock,
      maximumstock,
    } = formData;

    // Validation
    if (
      !name ||
      price <= 0 ||
      !description ||
      !featuredimg ||
      maxstock <= 0 ||
      !symbol ||
      !hazmat ||
      !hazmattype ||
      !precaution ||
      !useageinstructions ||
      avgToolHealth <= 0 ||
      !mfgDate ||
      !expiryDate ||
      minimumstock < 0 ||
      maximumstock < 0
    ) {
      setError("Please fill out all fields with valid data.");
      return;
    }

    // Validate dates
    if (new Date(mfgDate) > new Date(expiryDate)) {
      setError("Manufacturing date cannot be later than expiry date.");
      return;
    }

    setError(null);

    try {
      // Prepare form data for POST request (if `featuredimg` needs to be sent as FormData)
      const form = new FormData();
      form.append("name", name);
      form.append("price", price.toString());
      form.append("description", description);
      form.append("featuredimg", featuredimg);
      form.append("maxstock", maxstock.toString());
      form.append("symbol", symbol);
      form.append("hazmat", hazmat);
      form.append("hazmattype", hazmattype);
      form.append("precaution", precaution);
      form.append("useageinstructions", useageinstructions);
      form.append("avgToolHealth", avgToolHealth.toString());
      form.append("mfgDate", mfgDate);
      form.append("expiryDate", expiryDate);
      form.append("minimumstock", minimumstock.toString());
      form.append("maximumstock", maximumstock.toString());

      // Send POST request to your backend API endpoint
      await axiosInstance.post("product/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form data after successful submission
      setFormData({
        name: "",
        price: 0,
        description: "",
        featuredimg: null,
        maxstock: 0,
        symbol: "",
        hazmat: "",
        hazmattype: "",
        precaution: "",
        useageinstructions: "",
        avgToolHealth: 0,
        mfgDate: "",
        expiryDate: "",
        minimumstock: 0,
        maximumstock: 0,
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
                {/* Render form fields */}
                <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Name:</label>
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
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Featured Image:</label>
                    <input
                      type="file"
                      name="featuredimg"
                      onChange={handleInputChange}
                      className="form-control input"
                    />
                  </div></div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Max Stock:</label>
                    <input
                      type="number"
                      name="maxstock"
                      value={formData.maxstock}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Max Stock"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Symbol:</label>
                    <input
                      type="text"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Symbol"
                    />
                  </div></div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Hazmat:</label>
                    <input
                      type="text"
                      name="hazmat"
                      value={formData.hazmat}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Hazmat"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Hazmat Type:</label>
                    <input
                      type="text"
                      name="hazmattype"
                      value={formData.hazmattype}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Hazmat Type"
                    />
                  </div></div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Precaution:</label>
                    <input
                      type="text"
                      name="precaution"
                      value={formData.precaution}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Precaution"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Usage Instructions:</label>
                    <input
                      type="text"
                      name="useageinstructions"
                      value={formData.useageinstructions}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Usage Instructions"
                    />
                  </div></div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Average Tool Health:</label>
                    <input
                      type="number"
                      name="avgToolHealth"
                      value={formData.avgToolHealth}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Average Tool Health"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Manufacturing Date:</label>
                    <input
                      type="date"
                      name="mfgDate"
                      value={formData.mfgDate}
                      onChange={handleInputChange}
                      className="form-control input"
                    />
                  </div></div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Expiry Date:</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="form-control input"
                    />
                  </div>
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Minimum Stock:</label>
                    <input
                      type="number"
                      name="minimumstock"
                      value={formData.minimumstock}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Minimum Stock"
                    />
                  </div></div>
                  <div className="row">
                  <div className="col">
                    <label className="text-[#000] pt-2 pb-2 fw-bold">Maximum Stock:</label>
                    <input
                      type="number"
                      name="maximumstock"
                      value={formData.maximumstock}
                      onChange={handleInputChange}
                      className="form-control input"
                      placeholder="Enter Maximum Stock"
                    />
                  </div></div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
