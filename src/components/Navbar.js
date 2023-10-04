import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/ContextReducer";
import Modal from "../Modal";
import Cart from "./Cart";

export default function NavbarComponent() {
  const [cartView, setCartview] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <Navbar
        /* bg="success" */ data-bs-theme="dark"
        style={{ backgroundColor: "#0e1111" }}
      >
        <Container>
          <Navbar.Brand
            to="/"
            style={{ fontSize: "1.8rem", fontWeight: "500" }}
          >
            Saucey
          </Navbar.Brand>
          <Nav className="w-100 d-flex justify-content-between">
            <div>
              <Link
                to="/"
                className="btn text-white"
                style={{ fontWeight: "500" }}
              >
                Home
              </Link>
              {localStorage.getItem("authToken") ? (
                <Link
                  to="/myorder"
                  className="btn text-white"
                  style={{ fontWeight: "500" }}
                >
                  My Orders
                </Link>
              ) : (
                " "
              )}
            </div>
            <div className="d-flex flex-row">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link to="/login" className="btn bg-white text-black">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn bg-white text-black"
                    style={{ "margin-left": "1em" }}
                  >
                    SignUp
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="btn bg-white text-black me-2"
                    onClick={() => setCartview(true)}
                  >
                    My Cart{" "}
                    <Badge pill bg="danger ms-1">
                      {data.length}
                    </Badge>
                  </Link>
                  {cartView ? (
                    <Modal onClose={() => setCartview(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                  <Link
                    to="/login"
                    className="btn bg-white text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>

            {/* <div className="d-flex flex-row">
              <Link to="/login" className="btn bg-white text-black">
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-white text-black"
                style={{ "margin-left": "1em" }}
              >
                SignUp
              </Link>
            </div> */}

            {/* <div className="d-flex flex-row">
              <Link to="/login" className="btn bg-white text-black">
                Login
              </Link>
              <Link
                to="/signup"
                className="btn bg-white text-black"
                style={{ "margin-left": "1em" }}
              >
                SignUp
              </Link>
            </div> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
