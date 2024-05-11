import React, { useState } from 'react';
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
import axios from "axios";

const AddUserModal = ({ isOpen, toggle, refetchData }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    mobile: '',
    position: '',
    gender: '',
    birth: '',
    address: '',
    userType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9001/users', formData);
      console.log('User added successfully:', response.data);
      // Close the modal
      toggle();
      // Reset form data
      setFormData({
        email: '',
        firstname: '',
        lastname: '',
        mobile: '',
        position: '',
        gender: '',
        birth: '',
        address: '',
        userType: ''
      });
      // Optionally, you can trigger a refresh of the user list in the parent component
      refetchData();
    } catch (error) {
      console.error('Error adding user:', error.response.data);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}> Add User </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstname" id="firstName" value={formData.firstname} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastname" id="lastName" value={formData.lastname} onChange={handleChange} />
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
              <CustomInput type="radio" id="Male" name="gender" value="Male" label="Male" color='success'  onChange={handleChange} />
              <CustomInput type="radio" id="Female" name="gender" value="Female" label="Female" onChange={handleChange} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="dob">Date of Birth</Label>
            <Input type="date" name="birth" id="dob" value={formData.birth} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="userType">User Type</Label>
            <div>
              <CustomInput type="radio" id="Admin" name="userType" value="Admin" label="Admin" onChange={handleChange} />
              <CustomInput type="radio" id="Employee" name="userType" value="Employee" label="Employee" onChange={handleChange} />
            </div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button style={{'background': '#1d7b76', 'color': 'white'}} onClick={handleSubmit}>Add</Button>{' '}
        <Button style={{'background': 'red', 'color': 'white'}} onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUserModal;