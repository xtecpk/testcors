import { useState } from "react";
import { Modal } from "react-bootstrap";

interface PlanedModalProps {
  show: boolean;
  onHide: () => void;
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
        onHide();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Failed to submit the form.");
      }
    } catch (error) {
      setError("An error occurred while submitting the form. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} className="modal" centered dialogClassName="custom-modal-width">
        <div className="custom-container">
          <div className="custom-body1 p-3">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="row">
              <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Title:</label>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Description:</label>
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
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Location:</label>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Deck:</label>
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
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Department:</label>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Enter Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Date:</label>
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
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Assignees:</label>
                <input
                  type="text"
                  className="form-control input"
                  placeholder="Enter Assignees"
                  value={assignees}
                  onChange={(e) => setAssignees(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="inter text-[#000] pt-2 pb-2 text-base fw-bold">Deadline:</label>
                <input
                  type="date"
                  className="form-control input"
                  placeholder="Enter Deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center mt-3">
              <button className="green w-48 p-2 px-40 rounded-lg text-white font-semibold inter" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlanedModel;
