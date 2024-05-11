import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from "reactstrap";
import axios from "axios";

const AddModelModal = ({ isOpen, toggle, refetchData }) => {
  const [modelData, setModelData] = useState({ modelname: '', manufacturername: '' });
  const [manufacturerOptions, setManufacturerOptions] = useState([]);

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get('http://localhost:9001/manufacturers');
      setManufacturerOptions(response.data.map(manufacturer => manufacturer.manufacturer));
    } catch (error) {
      console.error('Error fetching manufacturers: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModelData({ ...modelData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9001/models', modelData);
      console.log('Response:', response); // Log the entire response object
      console.log('Model Added successfully:', response.data);
      toggle();
      setModelData({ modelname: '', manufacturername: '' });
      refetchData();
    } catch (error) {
      console.error('Error adding model: ', error.response.data);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Model</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="model">Model Name:</Label>
            <Input
              type="text"
              name="modelname"
              id="modelName"
              value={modelData.modelname}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="manufacturer">Manufacturer Name:</Label>
            <Input
              type="select"
              name="manufacturername"
              id="manufacturerName"
              value={modelData.manufacturername}
              onChange={handleChange}
            >
              <option value="">Select Manufacturer</option>
              {manufacturerOptions.map((manufacturer, index) => (
                <option key={index} value={manufacturer}>{manufacturer}</option>
              ))}
            </Input>
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

export default AddModelModal;