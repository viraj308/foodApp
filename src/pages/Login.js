import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [inputText, setInputText] = useState([{ email: "", password: "" }]);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://foodappserver-847f.onrender.com/api/loginuser",
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputText.email,
            password: inputText.password,
          }),
        }
      );
      const result = await response.json();
      console.log("Successs: ", result);
      localStorage.setItem("authToken", result.authToken);
      localStorage.setItem("userEmail", result.email);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link
          to="/signup"
          className="bg-secondary text-white"
          variant="secondary"
          style={{
            padding: "0.58em",
            borderRadius: "5px",
            textDecoration: "none",
            marginLeft: "1em",
          }}
        >
          I'm a new user
        </Link>
      </Form>
    </Container>
  );
}
