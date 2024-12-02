import React, { useState } from "react";
import axiosInstance from "../../../../../axiosInstance"; // Adjust the import path based on your project structure
import { Oval } from "react-loader-spinner";

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
  galleryImage1: File | null;
  galleryImage2: File | null;
  galleryImage3: File | null;
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
    galleryImage1: null,
    galleryImage2: null,
    galleryImage3: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      galleryImage1,
      galleryImage2,
      galleryImage3,
    } = formData;

    // Validation checks
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
      maximumstock < 0 ||
      !galleryImage1 ||
      !galleryImage2 ||
      !galleryImage3
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
    setLoading(true);

    try {
      // Step 1: Upload the product data
      const productData = {
        name,
        price,
        description,
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
      };

      const productResponse = await axiosInstance.post("product/add", productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Product uploaded successfully:", productResponse);
      const productId = productResponse.data?.productId;
      if (!productId) {
        setError("Failed to upload the product.");
        return;
      }

      // Step 2: Upload the featured image
      const imageFormData = new FormData();
      imageFormData.append("file", featuredimg); // Featured image
      imageFormData.append("folderType", "public");
      imageFormData.append("category", "Images");
      imageFormData.append("", "1");
      imageFormData.append("productdid", productId); // Attach product ID

      console.log("Image FormData being sent:", imageFormData);

      const imageResponse = await axiosInstance.post("uploads/upload/", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully:", imageResponse);
      const imagePath = imageResponse.data?.file?.path;
      if (!imagePath) {
        setError("Failed to upload the image.");
        return;
      }

      // Step 3: Update the product with the image path
      if (productId && imagePath) {
        console.log("Updating product:", productId, "with image path:", imagePath);
        await axiosInstance.patch("product/update", {
          productid: productId,
          imagepath: imagePath,
        });

        console.log("Product updated with featured image successfully.");
      } else {
        setError("Product ID or image path is missing.");
        return;
      }

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
        galleryImage1: null,
        galleryImage2: null,
        galleryImage3: null,
      });

      alert("Product added and featured image updated successfully!");
    } catch (err) {
      console.error("Failed to submit data:", err);
      setError("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
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
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <form method="post" className="p-4">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Oval
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <>
                    <div className="p-4 text-start">
                      {/* Form fields */}
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
                      </div>
                      <div className="row">
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
                        </div>
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
                      </div>
                      <div className="row">
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
                        </div>
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
                      </div>
                      <div className="row">
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
                        </div>
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
                      </div>
                      <div className="row">
                        <div className="col">
                          <label className="text-[#000] pt-2 pb-2 fw-bold">Manufacturing Date:</label>
                          <input
                            type="date"
                            name="mfgDate"
                            value={formData.mfgDate}
                            onChange={handleInputChange}
                            className="form-control input"
                          />
                        </div>
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
                      </div>
                      <div className="row">
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
                        </div>
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label className="text-[#000] pt-2 pb-2 fw-bold">Featured Image:</label>
                          <input
                            type="file"
                            name="featuredimg"
                            onChange={handleInputChange}
                            className="form-control input"
                          />
                        </div>
                        <div className="col">
                          <label className="text-[#000] pt-2 pb-2 fw-bold">Gallery Image 1:</label>
                          <input
                            type="file"
                            name="galleryImage1"
                            onChange={handleInputChange}
                            className="form-control input"
                          />
                        </div></div>
                        <div className="row">
                        <div className="col">
                          <label className="text-[#000] pt-2 pb-2 fw-bold">Gallery Image 2:</label>
                          <input
                            type="file"
                            name="galleryImage2"
                            onChange={handleInputChange}
                            className="form-control input"
                          />
                        </div>
                        <div className="col">
                          <label className="text-[#000] pt-2 pb-2 fw-bold">Gallery Image 3:</label>
                          <input
                            type="file"
                            name="galleryImage3"
                            onChange={handleInputChange}
                            className="form-control input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn bg-[#1E90FF] text-white fw-bold px-6 py-2"
                      >
                        Add Product
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
