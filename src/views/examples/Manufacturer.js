import React, { useState, useEffect } from "react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row
} from "reactstrap";
import Header from "components/Headers/Header.js";
import AddManufacturerModal from "./AddManufacturerModal";
import AddModelModal from "./AddModelModal"
import axios from "axios";
import { FaTrash } from "react-icons/fa"

const Tables = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [isAddManufacturerModalOpen, setIsAddManufacturerModalOpen] = useState(false);
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get('http://localhost:9001/manufacturers');
      console.log("Manufacturers response:", response.data); // Check response data
      setManufacturers(response.data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
    }
  };
  
  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:9001/models');
      console.log("Models response:", response.data); // Check response data
      setModels(response.data);
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };
  
  useEffect(() => {
    fetchManufacturers();
    fetchModels();
  }, []);  

  const toggleAddManufacturerModal = () => {
    setIsAddManufacturerModalOpen(!isAddManufacturerModalOpen);
  }
  const toggleAddModelModal = () => {
    setIsAddModelModalOpen(!isAddModelModalOpen)
  }

  const handleDeleteManufacturer = async (manufacturerId) => {
    try {
      await axios.delete(`http://localhost:9001/manufacturers/${manufacturerId}`);
      // Filter out the deleted user from the data array
      setManufacturers(manufacturers.filter(manufacturer => manufacturer._id !== manufacturerId));
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteModel = async (modelId) => {
    try {
      await axios.delete(`http://localhost:9001/models/${modelId}`);
      // Filter out the deleted user from the data array
      setModels(models.filter(model => model._id !== modelId));
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {/* Manufacturers Table */}
          <div className="col" style={{ width: "50%", paddingRight: "15px" }}>
            <Card style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}>
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Manufacturers</h3>
                  <button className="btn btn" style={{'background': '#1d7b76', 'color': 'white'}} onClick={toggleAddManufacturerModal}>Add</button>
                </div>
              </CardHeader>
              <div style={{ paddingRight: "15px", paddingLeft: "15px "}}>
              <hr style={{ borderTop: "2px solid #ccc", marginTop: "1px", marginBottom: "10px" }} />
                <Table striped responsive style={{ width: "100%"}} size="sm">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Manufacturer</th>
                        <th scope="col" />
                        <th scope="col" />
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manufacturers.length === 0 ? (
                      <tr>
                        <td colSpan="4">No data available</td>
                      </tr>
                    ) : (
                      manufacturers.map((manufacturer) => (
                        <tr key={manufacturer._id} >
                          <td>{manufacturer.manufacturer}</td>
                          <td></td>
                          <td></td>
                          <td>
                          <Button style={{'background': 'red', 'color': 'white'}} size='sm' onClick={() => handleDeleteManufacturer(manufacturer._id)}> <FaTrash /></Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                <hr style={{ borderTop: "2px solid #ccc", marginTop: "10px", marginBottom: "1px" }} />
              </div>
              <CardFooter >
              </CardFooter>
            </Card>
          </div>
          {/* Models Table */}
          <div className="col" style={{ width: "50%", paddingLeft: "15px" }}>
            <Card style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}>
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Models</h3>
                  <button className="btn btn" style={{'background': '#1d7b76', 'color': 'white'}} onClick={toggleAddModelModal}>Add</button>
                </div>
              </CardHeader>
              <div style={{ paddingRight: "15px", paddingLeft: "15px "}}>
              <hr style={{ borderTop: "2px solid #ccc", marginTop: "1px", marginBottom: "10px" }} />
                <Table striped className="table-flush" responsive style={{ width: "100%" }} size="sm">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Model Name</th>
                      <th scope="col">Manufacturer</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.length === 0 ? (
                      <tr>
                        <td colSpan="2">No data available</td>
                      </tr>
                    ) : (
                      models.map(model => (
                        <tr key={model._id}>
                          <td>{model.modelname}</td>
                          <td>{model.manufacturername}</td>
                          <td>
                            <Button style={{'background': 'red', 'color': 'white'}} size='sm' onClick={() => handleDeleteModel(model._id)}> <FaTrash /></Button>
                          </td> 
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                <hr style={{ borderTop: "2px solid #ccc", marginTop: "10px", marginBottom: "1px" }} />
              </div>
              <CardFooter>
                {/* Pagination */}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <AddManufacturerModal isOpen={isAddManufacturerModalOpen} toggle={toggleAddManufacturerModal} refetchData={fetchManufacturers} />
      <AddModelModal isOpen={isAddModelModalOpen} toggle={toggleAddModelModal} refetchData={fetchModels}/>
    </>  
  );
};

export default Tables;