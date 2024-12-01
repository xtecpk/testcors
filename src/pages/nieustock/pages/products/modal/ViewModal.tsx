import React, { useState } from "react";
import { Product } from "../Products";

interface ViewModalProps {
  show: boolean;
  onHide: () => void;
  product: Product | null; // Add this line to include the product prop
}

const ViewModal: React.FC<ViewModalProps> = ({ show, onHide, product }) => {
  // Define tabContent with a type that infers keys correctly
  const tabContent = {
    Description: (
      <div>
        <p>
          Festool LHS 2 225 Planex Drywall Sander + CT36AC Dust Extractor Set
        </p>
        <ul>
          <li>
            Sanding with integrated light: all-round LED light ring to reveal
            unevenness
          </li>
          <li>
            Individual adjustment: variable working length – up to two
            extensions can be added
          </li>
          <li>
            Digital extension: Festool Work App connection for additional
            functions
          </li>
          <li>Eccentric sanding motion for scratch-free surface quality.</li>
        </ul>
      </div>
    ),
    Document: (
      <div>
        <p>
          Here you can upload or view relevant documents related to the product.
        </p>
      </div>
    ),
    History: (
      <div>
        <p>History of changes or updates made to the product description.</p>
      </div>
    ),
    Comments: (
      <div>
        <p>Read or add comments about the product.</p>
      </div>
    ),
  };

  // Ensure activeTab is typed as a key of tabContent
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>("Description");

  return (
    <>
      {show && product && (
        <div
          id="authentication-modal"
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={onHide}
        >
          <div
            className="relative p-4 w-[98rem] h-[58rem] rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container">
              {/* Top Row */}
              <div className="row">
                {/* Left: Image Section */}
                <div className="col-md-7">
                  {/* Featured Image */}
                  <img
                    src="https://images.unsplash.com/photo-1731331095592-c86db3fa1d51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Featured"
                    className="w-100 h-60 object-cover rounded-lg mb-3"
                  />
                  {/* Gallery Images */}
                  <div className="row">
                    <div className="col-4">
                      <img
                        src="https://images.unsplash.com/photo-1731331095592-c86db3fa1d51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Gallery 1"
                        className="w-100 h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="col-4">
                      <img
                        src="https://images.unsplash.com/photo-1731331095592-c86db3fa1d51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Gallery 2"
                        className="w-100 h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="col-4">
                      <img
                        src="https://images.unsplash.com/photo-1731331095592-c86db3fa1d51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Gallery 3"
                        className="w-100 h-32 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Product Information */}
                <div className="col-5">
                  <div className="bg-light p-5 rounded shadow-sm h-[24rem] text-start">
                    <h5 className="fw-bold">Product Information</h5>
                    <hr className="my-3 " />
                    <p className="mb-1 my-2">
                      <strong>Type:</strong> Spare Part
                    </p>
                    <p className="mb-1 my-2">
                      <strong>Category:</strong> Electrical / Hazardous
                      (Flammable, Chemical)
                    </p>
                    <p className="mb-1 my-2">
                      <strong>Locations:</strong> 3 onboard (Deck 1, Deck 2,
                      etc.)
                    </p>
                    <div className="shadow-md rounded-md p-3 mt-5">
                      <p className="text-danger">
                        This product is classified as highly flammable. Please
                        handle with care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row */}
              <div className="container">
                <div className="row mt-4">
                  <div className="col-12">
                    <h3 className="mb-4 text-2xl fw-bold text-start">
                      Product Title: Festool Dry Vacuum
                    </h3>
                    <div className="row text-center align-items-center">
                      <div className="col-md-3 border-end">
                        <p className="mb-0">
                          <strong>Last updated by:</strong>
                        </p>
                        <p>John Doe</p>
                      </div>
                      <div className="col-md-3 border-end">
                        <p className="mb-0">
                          <strong>Category:</strong>
                        </p>
                        <p>Marketing</p>
                      </div>
                      <div className="col-md-3 border-end">
                        <p className="mb-0">
                          <strong>Last updated:</strong>
                        </p>
                        <p>14 Aug 2024</p>
                      </div>
                      <div className="col-md-3">
                        <p className="mb-0">
                          <strong>Usage History:</strong>
                        </p>
                        <p>Total Used: 5 / 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                {/* Bottom Row */}
                <div className="row mt-4">
                  {/* Tabs */}
                  <div className="row mt-4">
                    {/* Tabs */}
                    <div className="col-7">
                      <ul className="nav nav-tabs">
                        {Object.keys(tabContent).map((tab) => (
                          <li className="nav-item" key={tab}>
                            <button
                              className={`nav-link ${
                                activeTab === tab
                                  ? "bg-blue text-white"
                                  : "bg-white text-black"
                              }`}
                              onClick={() => setActiveTab(tab as keyof typeof tabContent)}
                            >
                              {tab}
                            </button>
                          </li>
                        ))}
                      </ul>
                      {/* Tab Content */}
                      <div className="mt-3">{tabContent[activeTab]}</div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="col-5">
                    <div className="bg-light p-3 rounded shadow-sm h-[18rem] text-start">
                      <h5 className="fw-bold">Product Information</h5>
                      <hr className="my-3 " />
                      <h5 className="fw-bold">Locations</h5>
                      <hr className="my-3 " />
                      <p className="mb-1 my-2">
                        <strong>
                          Location 1: <br />
                        </strong>{" "}
                        Deck 1-Bridge A
                      </p>
                      <p className="mb-1 my-2">
                        <strong>
                          Location 2: <br />
                        </strong>{" "}
                        Deck 2-Bridge B
                      </p>
                      <p className="mb-1 my-2">
                        <strong>
                          Location 3: <br />
                        </strong>{" "}
                        Deck 3-Bridge C
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
