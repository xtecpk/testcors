import { useState } from "react";

interface PlanedModalProps {
  show: boolean;
  onHide: (e: React.MouseEvent) => void;
}

const PlanedModel: React.FC<PlanedModalProps> = ({ show, onHide }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deck, setDeck] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [assignees, setAssignees] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const formData = {
      title,
      description,
      location,
      deck,
      department,
      date,
      assignees,
      deadline,
    };

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setLocation("");
        setDeck("");
        setDepartment("");
        setDate("");
        setAssignees("");
        setDeadline("");
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to submit the form.");
      }
    } catch (error) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      console.error("Error:", error);
    }
  };

  return (
    <>
      {show && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={onHide}
        >
          <div
            className="relative p-4 w-[1000px] rounded-lg "
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal content */}
            <div className="relative bg-white w-[1000px] rounded-lg shadow dark:bg-gray-700">
              {/* Modal body */}
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <div className="p-4">
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Description:
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Location:
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Enter Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Deck:
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Enter Deck"
                      value={deck}
                      onChange={(e) => setDeck(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Department:
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Enter Department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Date:
                    </label>
                    <input
                      type="date"
                      className="form-control input"
                      placeholder="Enter Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Assignees:
                    </label>
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Enter Assignees"
                      value={assignees}
                      onChange={(e) => setAssignees(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">
                      Deadline:
                    </label>
                    <input
                      type="date"
                      className="form-control input"
                      placeholder="Enter Deadline"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label className="inter fw-bold pt-2 pb-2">Assignees:</label>
                  <input
                    type="text"
                    className="form-control input"
                    placeholder="Enter Assignees"
                    value={assignees}
                    onChange={(e) => setAssignees(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label className="inter fw-bold pt-2 pb-2">Deadline:</label>
                  <input
                    type="text"
                    className="form-control input"
                    placeholder="Enter Deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="green w-48 p-2 px-40 rounded-lg text-white font-semibold inter"
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

export default PlanedModel;
