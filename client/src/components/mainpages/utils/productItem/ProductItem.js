import React from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Ruppee from "../../../headers/icons/rupee-sign-solid.svg";
import "./productItem.css";


export default function ProductItem(props) {
  const product = props.product;
  const cardImage = {
    objectFit: "cover",
    width: "100%",
    height: "30vh",
  };
  return (
    <Col xl={3} lg={4} md={6} style={{marginTop: "24px"}}>
      <Card style={{ width: "18rem", margin: "2%" }}>
        <Card.Img
          src={product.images.url}
          style={cardImage}
        ></Card.Img>
        <Card.Body>
          <Card.Title style={{color: "#282c3f", fontWeight: "600"}}>{product.title}</Card.Title>
          
          <Card.Text style={{color: "#282c3f", fontWeight: "600", marginBottom: "0.5rem"}}><span><img src={Ruppee} alt="ruppe" width="8"></img></span> {product.price}</Card.Text>
          <p style={{marginBottom: "1rem", fontSize: "14px"}}>{product.description}</p>
          <Button variant="secondary" href={`/detail/${product._id}`} style={{ backgroundColor: "#112031" , border: "none"}}>View</Button>
          <Button variant="primary" style={{    backgroundColor: "#E05D5D",  border: "none", position: "absolute", right: "10px"}}>Buy Now</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
