import React, { useState, useEffect } from 'react';
import { listEmployees, createEmployee } from '../services/employeeService';

const Employees = () => {
    // start - show list of employee section 
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        listEmployees()
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);
    // end - show list of employee section 

    // start - add employee section 
    const [showModal, setShowModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    
    const handleAddEmployee = () => {
        createEmployee(newEmployee)
            .then(response => {
                setEmployees([...employees, response.data]);
                setShowModal(false); // Close the modal
                setNewEmployee({ firstName: '', lastName: '', email: '' }); // Reset form
            })
            .catch(error => {
                // Handle error
            });
    };

    const handleInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };
    
    // end - add employee section 

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
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr className="bg-gray-800 border-b border-gray-700" key={employee.id}>
                                <td className="py-4 px-6">{employee.id}</td>
                                <td className="py-4 px-6">{employee.firstName}</td>
                                <td className="py-4 px-6">{employee.lastName}</td>
                                <td className="py-4 px-6">{employee.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* start - add employee section */}
                <div className="mt-4">
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New Employee
                </button>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Add New Employee</h2>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                name="firstName" 
                                value={newEmployee.firstName} 
                                onChange={handleInputChange}
                                className="mb-2 p-2 border"
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                name="lastName" 
                                value={newEmployee.lastName} 
                                onChange={handleInputChange}
                                className="mb-2 p-2 border"
                            />
                            <input 
                                type="text" 
                                placeholder="Email" 
                                name="email" 
                                value={newEmployee.email} 
                                onChange={handleInputChange}
                                className="mb-2 p-2 border"
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
                {/* start - add employee section */}
                
            </div>
        </div>
    );
};

export default Employees;
