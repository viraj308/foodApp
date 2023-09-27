import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useEffect, useState, useRef } from "react";

export default function CardComponent(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          qty: qty,
          size: size,
          img: props.foodItem.img,
          price: finalPrice,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      qty: qty,
      size: size,
      img: props.foodItem.img,
      price: finalPrice,
    });
  };
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div style={{ padding: "2em 0" }}>
      <Container>
        <Card
          /* bg="white" */ /* text="black" */
          style={{
            width: "20rem",
            "background-color": "#414a4c",
            color: "#FFFFF0",
          }}
        >
          <Card.Img
            variant="top"
            src={props.foodItem.img}
            style={{ height: "200px" }}
          />
          <Card.Body>
            <Card.Title>{props.foodItem.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className="container px-0">
              <select name="quantity" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(5), (e, num) => {
                  return (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="proportion ms-3"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
                {/* <option value="half">Half</option>
                <option value="full">Full</option> */}
              </select>
              <span className="price-text fs-5 fw-bold ms-3">
                Total price {finalPrice}
              </span>
              <hr />
              <button
                className="btn bg-white text-black"
                onClick={handleAddCart}
              >
                Add to Cart
              </button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
