import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Label, Card, CardHeader, CardFooter, Media, Pagination, PaginationItem, PaginationLink, Table, Container, Row } from "reactstrap";
import Header from "components/Headers/Header.js";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal"; // Import EditUserModal
import axios from "axios";

const Tables = () => {
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, limit]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/users?limit=${limit}&page=${currentPage}`);
      setData(response.data);
      setTotalPages(response.data.totalPages);
      setTotalEntries(response.data.totalUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditUser = (updatedUserData) => {
    // Update the data state with the edited user data
    setData(data.map(user => (user._id === updatedUserData._id ? updatedUserData : user)));
    // Close the edit modal
    toggleEditModal();
  };

  const handleEditClick = (userData) => {
    setEditUserData({ ...userData, id: userData._id } );
    toggleEditModal();

  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:9001/users/${userId}`);
      // Filter out the deleted user from the data array
      setData(data.filter(user => user._id !== userId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#83f28f' : '#ffa590';
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}>
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-1">Manage Employees</h3>
                  <button className="btn btn" style={{ 'color': 'white', 'background': '#1d7b76'}} onClick={toggleAddModal}>Add User</button>
                </div>
              </CardHeader>
              <div style={{ paddingLeft: "15px", paddingRight: "15px"}}>
              <hr style={{ borderTop: "2px solid #ccc", marginTop: "1px", marginBottom: "10px" }} />
              <Table striped className="align-items-center" responsive size="sm">
                <thead className="thead-light" >
                  <tr>
                    <th scope="col" style={{ paddingLeft: '15px'}}>Name</th>
                    <th scope="col" style={{ paddingLeft: '1px'}}>Email</th>
                    <th scope="col" style={{ paddingLeft: '1px'}}>Mobile</th>
                    <th scope="col" style={{ paddingLeft: '1px'}}>Position</th>
                    <th scope="col" style={{ paddingLeft: '1px'}}>Gender</th>
                    <th scope="col" style={{ paddingLeft: '1px'}}>Access</th>
                    <th scope="col" style={{ paddingLeft: '1px'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="7">No data available</td>
                    </tr>
                  ) : (
                    data.map((user) => (
                      <tr key={user._id}>
                        <td scope="row" style={{ paddingLeft: '15px'}}>
                          <Media className="align-items-center">
                            <Media>
                              <span>{user.firstname} {user.lastname}</span>
                            </Media>
                          </Media>
                        </td>
                        <td style={{ width: 'auto', paddingLeft: '1px', paddingRight: '1px'}}>{user.email}</td>
                        <td style={{ paddingLeft: '1px'}}>{user.mobile}</td>
                        <td style={{ paddingLeft: '1px'}}>{user.position}</td>
                        <td style={{ paddingLeft: '1px'}}>{user.gender}</td>
                        <td style={{ paddingLeft: '1px'}}>{user.userType}</td>
                        <td style={{ paddingLeft: '1px', paddingRight: '1px'}}>
                          <>
                          <button className="btn btn-sm" style={{ 'color': 'white', 'background': '#1d7b76'}} onClick={() => handleEditClick(user)}><FaEdit /></button>
                          <button className="btn btn-sm" style={{ 'color': 'white', 'background': 'red'}} onClick={() => handleDeleteUser(user._id)}><FaTrash /></button>
                          </>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              <hr style={{ borderTop: "2px solid #ccc",  marginTop: "10px", marginBottom: "1px" }} />
              </div>
              <CardFooter>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <AddUserModal isOpen={isAddModalOpen} toggle={toggleAddModal} refetchData={fetchData} />
      <EditUserModal isOpen={isEditModalOpen} toggle={toggleEditModal} userData={editUserData} onEditUser={handleEditUser} />
    </>
  );
};



export default Tables;