import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from 'reactstrap';
import axios from 'axios';

const EditUserModal = ({ isOpen, toggle, userData, onEditUser }) => {
  const { id } = userData ?? {}; // Destructure userData to get id
  const [formData, setFormData] = useState({ ...userData }); // Initialize formData with userData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error('ID is undefined. Cannot submit form.');
      return;
    }
    try {
      // Only submit form if there are changes
      if (JSON.stringify(formData) !== JSON.stringify(userData)) {
        const response = await axios.put(`http://localhost:9001/users/${id}`, formData);
        console.log('User updated successfully:', response.data);
        // Pass updated data to parent component
        onEditUser(formData);
        // Refresh the page
        window.location.reload();
      } else {
        console.log('No changes made. Not submitting form.');
      }
      // Close the modal
      toggle();
    } catch (err) {
      console.error('Error updating user:', err.response.data);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="mobile">Mobile</Label>
            <Input type="tel" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="position">Position</Label>
            <Input type="text" name="position" id="position" value={formData.position} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender</Label>
            <div>
              <CustomInput type="radio" id="Male" name="gender" value="Male" label="Male" onChange={handleChange} checked={formData.gender === 'Male'} />
              <CustomInput type="radio" id="Female" name="gender" value="Female" label="Female" onChange={handleChange} checked={formData.gender === 'Female'} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="dob">Date of Birth</Label>
            <Input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="userType">User Type</Label>
            <div>
              <CustomInput type="radio" id="Admin" name="userType" value="Admin" label="Admin" onChange={handleChange} checked={formData.userType === 'Admin'} />
              <CustomInput type="radio" id="Amployee" name="userType" value="Employee" label="Employee" onChange={handleChange} checked={formData.userType === 'Employee'} />
            </div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button style={{'background': '#1d7b76', 'color': 'white'}} onClick={handleSubmit}>Save</Button>{' '}
        <Button style={{'background': 'red', 'color': 'white'}} onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditUserModal;