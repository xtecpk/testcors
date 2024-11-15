import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { GrSubtractCircle } from 'react-icons/gr';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlanedModel from './modal/PlanedModel';

type SubTask = {
  id: string;
  title: string;
  status: string;
  assignee: string;
  complete: number;
  subtasks?: SubTask[];
};

type TaskProps = {
  task: SubTask;
};

// Sample data for tasks
const sampleTasks: SubTask[] = [
  {
    id: "1",
    title: "Parent Task A",
    status: "In Progress",
    assignee: "John Doe",
    complete: 40,
    subtasks: [
      {
        id: "1.1",
        title: "Sub-task 1 of Parent Task A",
        status: "To Do",
        assignee: "Jane Doe",
        complete: 0,
        
  
      },
      {
        id: "1.2",
        title: "Sub-task 2 of Parent Task A",
        status: "To Do",
        assignee: "",
        complete: 0,
      },
      {
        id: "1.3",
        title: "Sub-task 2 of Parent Task A",
        status: "To Do",
        assignee: "",
        complete: 0,
      },
    ],
  },
  {
    id: "2",
    title: "Parent Task B",
    status: "In Progress",
    assignee: "John Doe",
    complete: 40,
    subtasks: [
      {
        id: "2.1",
        title: "Sub-task 1 of Parent Task B",
        status: "To Do",
        assignee: "Jane Doe",
        complete: 0,
      },
      {
        id: "2.2",
        title: "Sub-task 2 of Parent Task B",
        status: "To Do",
        assignee: "",
        complete: 0,
      },
    ],
  },
];

// Task component to display a single task and its subtasks
const Task: React.FC<TaskProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="ml-5 p-3">
      <div className="d-flex align-items-center">
        <button 
          onClick={handleToggle} 
          className="btn p-0 mr-2 d-flex align-items-center" 
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        >
          {isExpanded ? <GrSubtractCircle size={30} /> : <IoAddCircleOutline size={30} />}
        </button>
        <span><strong className='nunito text-base font-bold'>{task.title}</strong></span>
      </div>
      <div className="d-flex mt-2 gap-20 ml-7">
        <span className='nunito text-sm font-semibold'>Status: {task.status}</span>
        <span className='nunito text-sm font-semibold'>Assignee: {task.assignee}</span>
        <span className='nunito text-sm font-semibold'>Complete: {task.complete}%</span>
      </div>
      {isExpanded && task.subtasks && (
        <div className="ml-5">
          {task.subtasks.map((subtask) => (
            <Task key={subtask.id} task={subtask} />
          ))}
        </div>
      )}
    </div>
  );
};

const PlanedMaintenance: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div>
        <div className="d-flex justify-content-end  m-3 align-items-center mx-4">
          <button 
            className="btn blue d-flex align-items-center rounded-xl w-54 text-white text-lg font-semibold inter p-3  gap-4 align-items-lg-center" 
            onClick={() => setShowDetails(true)}
          >
            Add Planned Maintenance
            <img src="./add.png" alt="add.png"/>
          </button>
        </div>
        <div className="bg-light mt-4 rounded-lg h-screen pt-10 pl-10">
          {sampleTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
      <PlanedModel show={showDetails} onHide={() => setShowDetails(false)} />
    </>
  );
};

export default PlanedMaintenance;
