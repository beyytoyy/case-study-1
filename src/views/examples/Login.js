import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Col,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
        const response = await axios.post('http://localhost:9001/users/login', {
            email: email,
            password: password
        });
        
        const message = response.data.message;
        if (message === "Login successful") {
            // Redirect or handle successful login
            window.location.href = `http://localhost:3000/admin/index`
        } else {
            setError("Invalid email or password");
        }
    } catch (error) {
        console.error("Error occurred while signing in:", error);
        // Handle error, e.g., show error message to user
    }
  };

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCreate = () => {
    window.location.href = `http://localhost:3000/auth/register`
  }
  
  return (
    <Col lg="5" md="7">
      <Card className="shadow border-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <div className="text-center" style={{ paddingTop: '25px' }}>
          <h4 className="mb-0 text-white" style={{ fontSize: '30px' }}>Login Form</h4>
        </div>
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form">
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
                    autoComplete="new-email"
                    value={email}
                    onChange={handleUsernameChange}
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
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
              </FormGroup>
            <div className="text-center">
              <Button className="mt-2 text-white" color="black" type="button" style={{background: '#1d7b76'}}onClick={handleSignIn}>
                LOGIN
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <div type="button"className="text-secondary" style={{textDecoration: 'underline',fontSize: '13px', textAlign: 'right', paddingTop: '1px' }} onClick={handleCreate}>
            Create an Account
      </div>
    </Col>
  );
};

export default Login;