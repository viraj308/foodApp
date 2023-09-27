import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import img_1 from "../images/berries.jpg";
import img_2 from "../images/ice-cream.jpg";
import img_3 from "../images/vegetables.jpg";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="Carousel" style={{ position: "relative" }}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        data-bs-theme="dark"
        controls={false}
        indicators={false}
      >
        <Carousel.Item>
          <img
            src={img_1}
            text="First slide"
            style={{
              width: "100%",
              maxHeight: "610px",
              objectFit: "cover",
              minHeight: "350px",
            }}
          />
          {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={img_2}
            text="Second slide"
            style={{
              width: "100%",
              "max-height": "610px",
              objectFit: "cover",
              "min-height": "350px",
            }}
          />

          {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={img_3}
            text="Third slide"
            style={{
              width: "100%",
              "max-height": "610px",
              objectFit: "cover",
              "min-height": "350px",
            }}
          />

          {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
