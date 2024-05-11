
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from "axios"
import React, { useState } from "react";


const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:9001/users', formData);
      console.log('Register successfully:', response.data);
      window.location.href = `http://localhost:3000/auth/login`
      
    } catch (error) {
      console.error('Error Registering:', error.response.data);
    }
  };

  const handleCreate = () => {
    window.location.href = `http://localhost:3000/auth/login`
  }
  
  return (
    <>
      <Col lg="5" md="8" style={{ top: '-50px'}}>
        <Card className="shadow border-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <CardBody className="px-lg-5 py-lg-4.5">
            <div className="mb-4" style={{ fontSize: '25px', color: '#333333', textAlign: 'center', color: 'white'}}>
            <h4 className="mb-0 text-white" style={{ fontSize: '30px' }}>Sign In Form</h4>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                    <Input 
                    placeholder="First Name" 
                    type="text"
                    name="firstname" 
                    value={formData.firstname}
                    onChange={handleChange}
                    />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                  placeholder="Last Name" 
                  type="name" 
                  name="lastname" 
                  value={formData.lastname}
                  onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="name"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center" color="">
              <Button className="mt-2 text-white" color="black" style={{background: '#1d7b76'}} onClick={handleSubmit}>
                LOGIN
              </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <div type="button"className="text-secondary" style={{textDecoration: 'underline',fontSize: '13px', textAlign: 'right', paddingTop: '1px' }} onClick={handleCreate}>
            Already Have an Account?
        </div>
      </Col>
    </>
  );
};

export default Register;
