import React, { useState } from "react";

interface ChipModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const ChipModal: React.FC<ChipModalProps> = ({ show, onHide }) => {
  // State hooks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [svgx, setSvgx] = useState<string>("");
  const [svgy, setSvgy] = useState<string>("");
  const [svgPath, setSvgPath] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [vessel, setVessel] = useState<string>("");
  const [deckId, setDeckId] = useState<string>("");
  const [zoneId, setZoneId] = useState<string>("");
  const [storageAreaId, setStorageAreaId] = useState<string>("");
  const [positionId, setPositionId] = useState<string>("");
  const [placementId, setPlacementId] = useState<string>("");
  const [subZoneId, setSubZoneId] = useState<string>("");

  // Dummy options for ParentID dropdown
  const options = [
    "None",
    "Atria",
    "Callisto",
    "Dione",
    "Ganymede",
    "Hangouts Call",
    "Luna",
  ];

  // Prevent early return before hooks are called
  if (!show) return null;

  const handleSave = () => {
    // Handle save logic here (e.g., sending data to an API)
    const formData = {
      title,
      description,
      parentId,
      type,
      svgx,
      svgy,
      svgPath,
      width,
      height,
      vessel,
      deckId,
      zoneId,
      storageAreaId,
      positionId,
      placementId,
      subZoneId,
    };
    console.log(formData);
  };


  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ml-4"
        onClick={onHide} 
      >
        <div
          className="relative p-4 max-w-full w-[1100px] mx-auto rounded-lg bg-white shadow-md"
          onClick={(e) => e.stopPropagation()} 
        >
          {/* Modal content */}
          <div className="text-start p-4">
            <div className="row">
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Title:</label>
                <input
                  type="text"
                  className="form-control input bg-white"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Description:</label>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Parent ID</label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Type</label>
                <select
                  value={parentId}
                  onChange={(e) => setType(e.target.value)}
                  className="form-select input "
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option} className="input">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Svg X</label>
                <select
                  value={parentId}
                  onChange={(e) => setSvgx(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Svg Y</label>
                <select
                  value={parentId}
                  onChange={(e) => setSvgy(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Svg Path</label>
                <select
                  value={parentId}
                  onChange={(e) => setSvgPath(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Width</label>
                <select
                  value={parentId}
                  onChange={(e) => setWidth(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Height</label>
                <select
                  value={parentId}
                  onChange={(e) => setHeight(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Vessel</label>
                <select
                  value={parentId}
                  onChange={(e) => setVessel(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Deck Id</label>
                <select
                  value={parentId}
                  onChange={(e) => setDeckId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Zone Id</label>
                <select
                  value={parentId}
                  onChange={(e) => setZoneId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Storage Area Id</label>
                <select
                  value={parentId}
                  onChange={(e) => setStorageAreaId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Position Id</label>
                <select
                  value={parentId}
                  onChange={(e) => setPositionId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4">
                <label className="inter fw-bold pt-2 pb-2">Placement Id</label>
                <select
                  value={parentId}
                  onChange={(e) => setPlacementId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label className="inter fw-bold pt-2 pb-2">SubZone Id</label>
                <select
                  value={parentId}
                  onChange={(e) => setSubZoneId(e.target.value)}
                  className="form-select input"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Save button */}

              <div className="text-center mt-3">
                  <button className="green w-48 p-2 px-40 rounded-lg text-white font-semibold inter" onClick={handleSave}>
                    Add
                  </button>
                </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ChipModal;
