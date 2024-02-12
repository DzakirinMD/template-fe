import React, { useState, useEffect } from "react";
import {
  createEmployee,
  listEmployees,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

const Employees = () => {
  // start - show list of employee section
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);
  // end - show list of employee section

  // start - add employee section
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleAddEmployee = () => {
    createEmployee(newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data]);
        setShowModal(false); // Close the modal
        setNewEmployee({ firstName: "", lastName: "", email: "" }); // Reset form
      })
      .catch((error) => {
        if (error.message.includes("CORS")) {
          alert("CORS error: Cannot access the server.");
        } else {
          // Handle other errors
        }
      });
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };
  // end - add employee section

  // start - update employee section
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    if (editingEmployee && editingEmployee.id) {
      updateEmployee(editingEmployee.id, editingEmployee)
        .then((response) => {
          // Update the local state to reflect the changes
          setEmployees(
            employees.map((emp) =>
              emp.id === editingEmployee.id ? response.data : emp
            )
          );
          setIsEditModalOpen(false); // Close the modal
        })
        .catch((error) => {
          if (error.message.includes("CORS")) {
            alert("CORS error: Cannot access the server.");
          } else {
            // Handle other errors
          }
        });
    }
  };
  // end - update employee section

  // start - delete employee section
  const [deletingEmployee, setDelitingEmployee] = useState(null);

  const handleDeleteClick = (employeeId) => {
    deleteEmployee(employeeId)
      .then(() => {
        // Filter out the deleted employee from the local state
        setEmployees(employees.filter((emp) => emp.id !== employeeId));
      })
      .catch((error) => {
        if (error.message.includes("CORS")) {
          alert("CORS error: Cannot access the server.");
        } else {
          // Handle other errors
        }
      });
  };
  // end - delete employee section

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-semibold text-white mb-6">Employees</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6 text-gray-200">
                ID
              </th>
              <th scope="col" className="py-3 px-6 text-gray-200">
                First Name
              </th>
              <th scope="col" className="py-3 px-6 text-gray-200">
                Last Name
              </th>
              <th scope="col" className="py-3 px-6 text-gray-200">
                Email
              </th>
              <th scope="col" className="py-3 px-6 text-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                className="bg-gray-800 border-b border-gray-700"
                key={employee.id}
              >
                <td className="py-4 px-6">{employee.id}</td>
                <td className="py-4 px-6">{employee.firstName}</td>
                <td className="py-4 px-6">{employee.lastName}</td>
                <td className="py-4 px-6">{employee.email}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleEditClick(employee)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* start - add employee section */}
        <div className="mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Employee
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Add New Employee
              </h2>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                className="mb-2 p-2 text-black border"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                className="mb-2 p-2 text-black border"
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                className="mb-2 p-2 text-black border"
              />
              <div>
                <button
                  onClick={handleAddEmployee}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* end - add employee section */}
        {/* start - edit employee section */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Edit Employee
              </h2>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={editingEmployee.firstName}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    firstName: e.target.value,
                  })
                }
                className="mb-2 p-2 text-black border"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={editingEmployee.lastName}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    lastName: e.target.value,
                  })
                }
                className="mb-2 p-2 text-black border"
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={editingEmployee.email}
                onChange={(e) =>
                  setEditingEmployee({
                    ...editingEmployee,
                    email: e.target.value,
                  })
                }
                className="mb-2 p-2 text-black border"
              />
              <div>
                <button
                  onClick={handleEditSubmit}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* end - edit employee section */}
      </div>
    </div>
  );
};

export default Employees;
