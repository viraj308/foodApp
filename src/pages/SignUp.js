import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

import { Link } from "react-router-dom";

export default function SignUp() {
  const [inputText, setInputText] = useState([
    { name: "", email: "", password: "", address: "" },
  ]);

  const handleChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://foodappserver-847f.onrender.com/api/createuser",
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputText.name,
            email: inputText.email,
            password: inputText.password,
            location: inputText.address,
          }),
        }
      );
      const result = await response.json();
      console.log("Successs: ", result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
            name="name"
            value={inputText.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={inputText.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={inputText.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            onChange={handleChange}
            name="address"
            value={inputText.address}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link
          to="/login"
          className="bg-secondary text-white"
          variant="secondary"
          style={{
            padding: "0.58em",
            borderRadius: "5px",
            textDecoration: "none",
            marginLeft: "1em",
          }}
        >
          Already a user
        </Link>
      </Form>
    </Container>
  );
}
