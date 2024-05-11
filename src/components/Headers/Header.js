
// reactstrap components
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import backgroundImage from "assets/img/brand/background1.png";
import axios from "axios";

const Header = () => {  
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSoldVehicles, setTotalSoldVehicles] = useState(0);

  useEffect(() => {
    fetchTotalVehicles();
    fetchTotalEmployees();
    fetchTotalCustomers();
    fetchTotalSoldVehicles();
  }, []);

  const fetchTotalVehicles = async () => {
      const response = await axios.get("http://localhost:9001/vehicles");
      const vehicles = response.data.vehicles;
      const total = vehicles.length;
      setTotalVehicles(total);
  };

  const fetchTotalCustomers = async () => {
    const response = await axios.get("http://localhost:9001/customers");
    const customers = response.data;
    const total = customers.length;
    setTotalCustomers(total);
  };

  const fetchTotalEmployees = async () => {
      const response = await axios.get("http://localhost:9001/users");
      const users = response.data;
      const totalEmployees = users.filter(user => user.userType === "Employee").length;
      setTotalEmployees(totalEmployees);
  };
  
  const fetchTotalSoldVehicles = async () => {
      const response = await axios.get("http://localhost:9001/vehicles");
      const vehicles = response.data.vehicles;
      const totalSoldVehicles = vehicles.filter(vehicle => vehicle.sold).length;
      setTotalSoldVehicles(totalSoldVehicles);
  };  



  return (
    <>
      <div
          className="header"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingBottom: '6rem',
            paddingTop: '7rem',
          }}
        >
        <Container fluid>
          <div className="mb-5 header-body" style={{ 'paddingBottom' : '20px'}}>
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0" style={{background: ''}}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Vehicles
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalVehicles}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape text-white rounded-circle shadow" style={{'background': 'red'}}>
                          <i className="ni ni-delivery-fast" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Employees
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalEmployees}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape text-white rounded-circle shadow" style={{'background': '#0725b5'}}>
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Customers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalCustomers}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape text-white rounded-circle shadow" style={{'background': '#dca600'}}>
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Sold Vehicles
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalSoldVehicles}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape text-white rounded-circle shadow" style={{'background': '#239e0f'}}>
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap"></span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
