import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const VehicleCard = ({ vehicle }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
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
          <h5 className="card-title" style={{ fontSize: '15px' }}>{vehicle.manufacturername}</h5>
          <p style={{ fontSize: '20px' }}>{vehicle.modelname}</p>
          <p className="card-text">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(vehicle.price)}</p>
          <Button color="primary" onClick={toggleModal}>View Details</Button>
        </div>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Vehicle Details</ModalHeader>
        <ModalBody>
          {/* Additional details */}
          {/* Example: */}
          <p>Year: {vehicle.year}</p>
          <p>Mileage: {vehicle.mileage}</p>
          {/* Add more details here */}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VehicleCard;
