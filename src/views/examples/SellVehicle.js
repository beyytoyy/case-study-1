import React, { useState, useEffect } from 'react';
import Header from "components/Headers/Header.js";
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from 'reactstrap';
import axios from "axios";

const SellVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    sellingPrice: '',
    mobile: '',
    paymentMethod: '',
    warrantStart: '',
    warrantEnd: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const handleSubmit = async () => {
        try {
        const response = await axios.post('http://localhost:9001/customers', formData);
        console.log('Vehicle Added successfully:', response.data);


        const soldOn = formData.warrantStart;

        const customerId = response.data._id;

        await axios.put(`http://localhost:9001/vehicles/${id}`, { sold: true, soldOn, customerId });

        setFormData({ 
            firstname: '',
            lastname: '',
            email: '',
            sellingPrice: '',
            mobile: '', 
            paymentMethod: '',
            warrantStart: '',
            warrantEnd: ''
        });

        } catch (error) {
        console.error('Error selling vehicle: ', error);
        }
    };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0" style={{ fontSize: '18px' }}>Sell Vehicle</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>First Name:</Label>
                        <Input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Last Name:</Label>
                        <Input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Price:</Label>
                        <Input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Mobile:</Label>
                        <Input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Payment Method:</Label>
                        <Input type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Warranty Start:</Label>
                        <Input type="date" name="warrantStart" value={formData.warrantStart} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Warranty End:</Label>
                        <Input type="date" name="warrantEnd" value={formData.warrantEnd} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-right mt-4">
                    <Button type="submit" style={{background: '#1d7b76', color: 'white'}}>Sell Vehicle</Button>
                  </div>
                </Form>
              </CardBody>
              <CardFooter className="py-4">
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SellVehicle;
