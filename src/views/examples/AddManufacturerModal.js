import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from "reactstrap";
import axios from "axios";

const AddManufacturerModal = ({ isOpen, toggle, refetchData }) => {
  const [manufacturerData, setManufacturerData] = useState( {manufacturer: ''});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManufacturerData({ ...manufacturerData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9001/manufacturers', manufacturerData);
      console.log('Response:', response); // Log the entire response object
      console.log('User Added successfully:', response.data);
      toggle();
      setManufacturerData({ manufacturer: ''})
      refetchData();
    } catch (error) {
      console.error('Error adding manufacturer: ', error.response.data)
    }
  };
  

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Manufacturer</ModalHeader>
      <ModalBody>
        <Form>
            <FormGroup>
                <Label for="manufacturer">Manufacturer Name:</Label>
                <Input
                type="text"
                name="manufacturer"
                id="manufacturerName"
                value={manufacturerData.manufacturer}
                onChange={handleChange}
                />
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

export default AddManufacturerModal;
