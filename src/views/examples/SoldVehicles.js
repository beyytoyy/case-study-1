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
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Label
  } from "reactstrap";
  import { FaEdit, FaTrash, FaDollarSign, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
  import React, { useState, useEffect } from "react";
  import Header from "components/Headers/Header.js";
  import axios from "axios";
  
  const Tables = () => {
    const [vehicleData, setVehicleData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
      fetchCustomers();
    }, [limit, currentPage]);
  
    const fetchCustomers = async () => {
      try {
        const vehiclesResponse = await axios.get(`http://localhost:9001/vehicles`);
        const customerResponse = await axios.get("http://localhost:9001/customers");
        const { totalPages, totalVehicles, vehicles } = vehiclesResponse.data;
        setVehicleData(vehicles); // Update to use vehiclesResponse.data.data
        setCustomerData(customerResponse.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
                  </div>
                </CardHeader>
                <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                  <hr style={{ borderTop: "2px solid #ccc", padding: "5px 5px", marginTop: "1px", marginBottom: "1px" }} />
                  <div className="d-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Dropdown */}
                    {/* Search Form */}
                    <Form className="navbar-search form-inline" style={{paddingRight: "15px"}}>
                      <FormGroup className="mb-2">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Search" type="text" value={searchQuery} onChange={handleSearch} style={{ width: '150px', height: '40px' }} />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </div>
                  <Table striped className="align-items-center" responsive size="sm" bordered>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px' }}>Customer Details</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Brand</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Model</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Price & Profit</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Date of Sale</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Warranty End</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Insurance</th>
                        <th scope="col" style={{ paddingLeft: '10px', fontSize: '10px', }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {vehicleData.length === 0 ? (
                            <tr>
                            <td colSpan="8" style={{ fontSize: '16px', paddingTop: '1px' }}>No data available</td>
                            </tr>
                        ) : (
                            filteredData.filter(vehicle => vehicle.sold).map((vehicle, index) => (
                            <tr key={vehicle._id}>
                                {/* Customer Details */}
                                <td style={{paddingLeft: '10px'}}>
                                  <div>Name: {customerData[index].firstname} {customerData[index].lastname}</div>
                                  <div>Email: {customerData[index].email}</div>
                                  <div>Mobile: {customerData[index].mobile}</div>
                                </td>
                                {/* Manufacturer */}
                                <td style={{ paddingLeft: '10px', verticalAlign: 'top' }}>{vehicle.manufacturername}</td>
                                {/* Model */}
                                <td style={{ paddingLeft: '10px', verticalAlign: 'top' }}>{vehicle.modelname}</td>
                                {/* Price & Profit */}
                                <td style={{ paddingLeft: '10px', verticalAlign: 'top' }}>
                                    Original Price: {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(vehicle.originalPrice)} <br />
                                    Selling Price: {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(vehicle.sellingPrice)} <br />
                                    Profit: {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(vehicle.sellingPrice - vehicle.originalPrice)}
                                </td>                             
                                {/* Date of Sale */}
                                <td style={{ paddingLeft: '10px', verticalAlign: 'top' }}>{vehicle.date}</td>
                                {/* Warranty End */}
                                <td style={{ paddingLeft: '10px', verticalAlign: 'top' }}>{customerData[index].warrantEnd}</td>
                                {/* Insurance */}
                                <td style={{ paddingLeft: '10px', verticalAlign: 'top' }}>{vehicle.insuranceID}</td>
                                {/* Action */}
                                <td style={{paddingLeft: '10px', verticalAlign: 'top'}}>
                                <Button style={{ background: 'red', color: 'white' }} size='sm' onClick={() => handleDeleteVehicle(vehicle._id)}> <FaTrash /></Button>
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
                    <div className="dt-info" style={{ margin: '7px 0' }}>Showing 1 to {customerData.length} of entries</div>
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