
  import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput,
    Col,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
  } from "reactstrap";
  import { FaEdit, FaTrash, FaDollarSign, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
  import React, { useState, useEffect } from "react";
  import Header from "components/Headers/Header.js";
  import axios from "axios"
  import { Link, useNavigate } from "react-router-dom";

  const Tables = ({ toggle, refetchData }) => {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [manufacturerOption, setManufacturerOption] = useState([]);
    const [modelOption, setModelOption] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalEntries, setTotalEntries] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
      manufacturername: '',
      modelname: '',
      category: '',
      originalPrice: '',
      sellingPrice: '',
      gearType: '',
      mileAge: '',
      sixEngine: '',
      sevenEngine: '',
      date: '',
      doors: '',
      year: '',
      insuranceID: '',
      seats: '',
      tank: '',
      color: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const categories = [
      "Sedan",
      "SUV",
      "Hatchback",
      "Coupe",
      "Pickup Truck",
      "Convertible",
      "Minivan",
      "Crossover",
      "Electric Vehicle (EV)",
      "Luxury Vehicle",
      "Sports Car"
    ];

    const gearTypes = ["Automatic", "Manual", "CVT", "Semi-Automatic", "Dual-Clutch"];

    useEffect(() => {
      fetchVehicles();
    }, []);


    const fetchVehicles = async () => {
      try {
        const vehiclesResponse = await axios.get(`http://localhost:9001/vehicles`);
        const manufacturersResponse = await axios.get("http://localhost:9001/manufacturers");
        const modelsResponse = await axios.get("http://localhost:9001/models");
        setManufacturerOption(manufacturersResponse.data.map(manufacturer => manufacturer.manufacturer));
        setModelOption(modelsResponse.data.map(model => model.modelname));
        setVehicleData(vehiclesResponse.data.vehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const toggleAddForm = () => {
      setShowAddForm(prevState => !prevState);
    }

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:9001/vehicles', formData);
        console.log('Response:', response); // Log the entire response object
        console.log('Vehicle Added successfully:', response.data);
  
        if (selectedFile) {
          const vehicleId = response.data._id;
          handleSaveImage(vehicleId);
        }
  
        // Clear the form data
        setFormData({
          manufacturername: '',
          modelname: '',
          category: '',
          originalPrice: '',
          sellingPrice: '',
          gearType: '',
          mileAge: '',
          date: '',
          doors: '',
          year: '',
          insuranceID: '',
          seats: '',
          tank: '',
          color: '',
          sold: ''
        });

        window.location.reload();
      } catch (error) {
        console.error('Error adding vehicle: ', error);
      }
    }
  
    const handleSaveImage = async (vehicleId) => {
      try {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
          formData.append('vehicleId', vehicleId); // Include vehicle ID in the form data
    
          // Upload image to server
          const response = await axios.post('http://localhost:9001/vehicles/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
          console.log('Image saved:', response.data);
        } else {
          console.log('No image selected');
        }
      } catch (error) {
        console.error('Error saving image:', error);
      }
    };    

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleSellVehicle = (id) => {
      window.location.href = `http://localhost:3000/admin/sellVehicles/${id}`
    };

    const handleDeleteVehicle = async (id) => {
      try {
        await axios.delete(`http://localhost:9001/vehicles/${id}`);
        setVehicleData(vehicleData.filter(vehicle => vehicle._id !== id));
        window.location.releoad();
      } catch (error) {
        console.error('Error Deleting Vehicle: ', error);
      }
    }

    const handleLimitChange = (e) => {
      setLimit(parseInt(e.target.value));
      setCurrentPage(1);
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleSearch = (e) => {
      setSearchQuery(e.target.value); // Update searchQuery state when input changes
    };

    const filteredData = vehicleData.filter((vehicle) =>
      Object.values(vehicle).some((value) =>
        typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}>
                <CardHeader className="border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0" style={{ fontSize: '18px' }}>All Vehicles</h3>
                    <button className="btn btn" style={{'background': '#1d7b76', 'color': 'white'}} onClick={toggleAddForm}>Add</button>
                  </div>
                </CardHeader>
                {showAddForm && (
                  <CardHeader className="border-0">
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <Label for="manufacturer">Manufacturer Name:</Label>
                            <Input
                              type="select"
                              name="manufacturername"
                              id="manufacturerName"
                              value={formData.manufacturername}
                              onChange={handleChange}
                            >
                              <option value="">Select Manufacturer</option>
                              {manufacturerOption.map((manufacturer, index) => (
                                <option key={index} value={manufacturer}>{manufacturer}</option>
                              ))}
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="originalPrice"> Original Price:</Label>
                            <Input
                              type="text"
                              name="originalPrice"
                              id="originalPrice"
                              value={formData.originalPrice}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="category">Category:</Label>
                            <Input
                              type="select"
                              name="category"
                              id="category"
                              value={formData.category}
                              onChange={handleChange}
                            >
                              <option value="">Select category</option>
                              {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                              ))}
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="gear">Gear Type:</Label>
                            <Input
                              type="select"
                              name="gearType"
                              id="gearType"
                              value={formData.gearType}
                              onChange={handleChange}
                            >
                              <option value="">Select gear type</option>
                              {gearTypes.map((gearType, index) => (
                                <option key={index} value={gearType}>{gearType}</option>
                              ))}
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="date">Add Date:</Label>
                            <Input
                              type="date"
                              name="date"
                              id="date"
                              value={formData.date}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="year">Registration Year:</Label>
                            <Input
                              type="text"
                              name="year"
                              id="year"
                              value={formData.year}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="seats">Number of Seats:</Label>
                            <Input
                              type="text"
                              name="seats"
                              id="seats"
                              value={formData.seats}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="color">Color:</Label>
                            <Input
                              type="text"
                              name="color"
                              id="color"
                              value={formData.color}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          {/* Add other form fields */}
                        </Col>
                        {/* Add other form columns */}
                        <Col>
                          <FormGroup>
                            <Label for="model">Model Name:</Label>
                            <Input
                              type="select"
                              name="modelname"
                              id="modelName"
                              value={formData.modelname}
                              onChange={handleChange}
                            >
                              <option value="">Select Model</option>
                              {modelOption.map((model, index) => (
                                <option key={index} value={model}>{model}</option>
                              ))}
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="sellingPrice"> Selling Price:</Label>
                            <Input
                              type="text"
                              name="sellingPrice"
                              id="sellingPrice"
                              value={formData.sellingPrice}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="mileAge">Mileage(km):</Label>
                            <Input
                              type="text"
                              name="mileAge"
                              id="mileAge"
                              value={formData.mileAge}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="doors">Number of Doors:</Label>
                            <Input
                              type="text"
                              name="doors"
                              id="doors"
                              value={formData.doors}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="year">insuranceID:</Label>
                            <Input
                              type="text"
                              name="insuranceID"
                              id="insuranceID"
                              value={formData.insuranceID}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="tank">Tank Capacity (liter):</Label>
                            <Input
                              type="text"
                              name="tank"
                              id="tank"
                              value={formData.tank}
                              onChange={handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="tank">Image:</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    <div className="text-right mt-4">
                      <Button onClick={handleSubmit} style={{background: '#1d7b76', color: 'white'}}>Submit</Button>
                      <Button style={{'background': 'red', 'color': 'white'}} onClick={toggleAddForm}>Cancel</Button>
                    </div>
                  </CardHeader>
                )}
                <div style={{paddingRight: "10px", paddingLeft: "10px"}}>
                <hr style={{ borderTop: "2px solid #ccc", padding: "5px 5px", marginTop: "1px", marginBottom: "1px" }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Search Form */}
                  <Form className="navbar-search form-inline" style={{paddingRight: "15px"}}>
                    <FormGroup className="mb-2">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>  
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Search" type="text" value={searchQuery} onChange={handleSearch} style={{ width: '150px', height: '40px'}} />
                      </InputGroup>
                    </FormGroup>
                  </Form>
                </div>
                <Table striped className="align-items-center" responsive size="sm" bordered>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Model</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px',}}>Brand</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Category</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Added On</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Status</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Cost Price</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Image</th>
                      <th scope="col" style={{ paddingLeft: '10px', fontSize: '11px', }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleData.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ fontSize: '16px', paddingTop: '1px' }}>No data available</td>
                      </tr>
                    ) : (
                      filteredData.map((vehicle) => (
                        <tr key={vehicle._id}>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>{vehicle.modelname}</td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>{vehicle.manufacturername}</td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>{vehicle.category}</td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>{vehicle.date}</td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>
                            {vehicle.sold ? (
                              <div style={{ color: 'red' }}> <FaTimesCircle /> Sold </div>
                            ) : (
                              <div style={{ color: 'green' }}> <FaCheckCircle /> Available </div>
                            )}
                          </td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>
                            {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(vehicle.sellingPrice)}
                          </td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top', paddingBottom: '2px', paddingTop: '2px' }}>
                            {vehicle.image && ( // Check if image path exists
                              <img
                                alt="Vehicle Image"
                                style={{ maxWidth: '80px',  'boxShadow': '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
                                src={`http://localhost:9001/images/${vehicle.image}`} // Adjust URL as per your backend configuration
                              />
                            )}
                          </td>
                          <td style={{ paddingLeft: '10px', 'verticalAlign': 'top' }}>
                            <Button style={{'background': '#1d7b76', 'color': 'white'}} size='sm' onClick={() => handleSellVehicle(vehicle._id)}> <FaDollarSign /></Button>
                            <Button style={{'background': 'red', 'color': 'white'}} size='sm' onClick={() => handleDeleteVehicle(vehicle._id)}> <FaTrash /></Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                <hr style={{ borderTop: "2px solid #ccc", marginTop: "10px", marginBottom: "1px" }} />
                </div>
                <CardFooter>
                <nav aria-label="...">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Entries count */}
                    <div className="dt-info" style={{ margin: '7px 0' }}>Showing 1 to {vehicleData.length} entries</div>
                    {/* Pagination */}
                  </div>
                </nav>
              </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };

  export default Tables;
