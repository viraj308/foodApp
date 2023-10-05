import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavbarComponent from "../components/Navbar";
import ControlledCarousel from "../components/ControlledCarousel.js.js";
import Container from "react-bootstrap/esm/Container";
import CardComponent from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setfoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch(
      "https://foodappserver-847f.onrender.com/api/fooditems"
    );

    response = await response.json();

    setfoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div style={{ "background-color": "#232b2b" }}>
      <NavbarComponent />

      <div style={{ position: "relative" }}>
        <ControlledCarousel />
        <input
          placeholder="Enter foodname here"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "50%",
            position: "absolute",
            bottom: "20px",
            left: "0",
            right: "0",
            margin: "0 auto",
          }}
        />
      </div>
      <Container className="mt-4">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row">
                  <h2 key={data.id} style={{ color: "white" }}>
                    {data.CategoryName}
                  </h2>
                  <hr style={{ color: "white" }} />
                  {foodItems !== [] ? (
                    foodItems
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filteredItems) => {
                        return (
                          <CardComponent
                            key={filteredItems}
                            foodItem={filteredItems}
                            options={filteredItems.options[0]}
                          />
                        );
                      })
                  ) : (
                    <div>No such Data found</div>
                  )}
                </div>
              );
            })
          : ""}
      </Container>
      <Footer />
    </div>
  );
}
