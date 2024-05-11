import { Link } from "react-router-dom";
import backgroundImage from "assets/img/brand/login.jpg"
import logoImage from "assets/img/brand/argon-react-white.png"
import axios from "axios";
import { useEffect, useState } from "react";

// reactstrap components
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const AdminNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);


  const fetchVehicles = async () => {
    try {
      const vehiclesResponse = await axios.get(`http://localhost:9001/vehicles`);
      setVehicleData(vehiclesResponse.data.vehicles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    toggleModal();
  };

  const handleLogin = () => {
    window.location.href = `http://localhost:3000/auth/login`
  }

  return (
    <>
        <div className="d-flex flex-column" style={{ backgroundColor: 'white'}}>
          <div
              className="header"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingBottom: '15rem',
                paddingTop: '7rem',
                maxWidth: '100%',
                position: 'relative', // Ensure proper positioning of logo and button
              }}
            >
              {/* Logo */}
              <img
                src={logoImage}
                alt="Logo"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  width: 'auto', // Adjust the width of the logo as needed
                  height: '50px', // Maintain aspect ratio
                }}
              />

              {/* Login Panel button */}
              <button
                className="btn text-white"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'linear-gradient(90deg, rgba(46,91,98,1) 0%, rgba(73,105,119,1) 100%, rgba(29,123,118,1) 100%)',
                }}
                onClick={handleLogin} // Replace handleLoginPanelClick with your actual click handler function
              >
                Login
              </button>
            </div>
            <div className="mt--4 container-fluid">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                  {/* Map over vehicle data and generate card components */}
                  {vehicleData.map((vehicle) => (
                    // Check if the vehicle is not sold
                    !vehicle.sold && (
                      <div key={vehicle._id} className="col">
                        <div className="card" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                          {vehicle.image && (
                            <img
                              alt="Vehicle Image"
                              style={{ maxWidth: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
                              src={`http://localhost:9001/images/${vehicle.image}`}
                            />
                          )}
                          <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: '20px' }}>{vehicle.modelname}</h5>
                            <p className="card-title" style={{ fontSize: '15px' }}>{vehicle.manufacturername}</p>
                            <p className="card-text">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(vehicle.sellingPrice)}</p>
                            <button className="btn text-white" onClick={() => handleViewDetails(vehicle)} style={{ background: 'linear-gradient(90deg, rgba(46,91,98,1) 0%, rgba(73,105,119,1) 100%, rgba(29,123,118,1) 100%)' }}>View Details</button>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
              </div>
          </div>
          <div className="footer">

          </div>
        </div>
        <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} style={{ paddingBottom: '1px' }}>Vehicle Details</ModalHeader>
        <ModalBody>
          {selectedVehicle && (
            <div className="row">
              <p>
                {selectedVehicle.image && (
                  <img
                    alt="Vehicle Image"
                    style={{ maxWidth: '480px', 'boxShadow': '0px 0px 10px rgba(0, 0, 0, 0.2)'}}
                    src={`http://localhost:9001/images/${selectedVehicle.image}`}
                  />
                )}
              </p>
              <div className="col-md-6">
                <p>Price: {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(selectedVehicle.sellingPrice)}</p>
                <p>Manufacturer: {selectedVehicle.manufacturername}</p>
                <p>Category: {selectedVehicle.category}</p>
                <p>Mileage: {selectedVehicle.mileAge}km</p>
                <p>Number of Seats: {selectedVehicle.seats}</p>
                <p>Year Manufactured: {selectedVehicle.year}</p>
                {/* Add more details here as needed */}
              </div>
              <div className="col-md-6">
                <p>Model: {selectedVehicle.modelname}</p>
                <p>Transmission: {selectedVehicle.gearType}</p>
                <p>Color: {selectedVehicle.color}</p>
                <p>Number of Doors: {selectedVehicle.doors}</p>
                <p>tank: {selectedVehicle.tank}L</p>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
);

};

export default AdminNavbar;
