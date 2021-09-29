import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import "./products.css"

export default function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productApi.products;

  return (
    <div className="products">
      <Container>
        <Row>
            {products.map((product) => {
              return <ProductItem key={product._id} product={product}></ProductItem>;
            })}
            {products.map((product) => {
              return <ProductItem key={product._id} product={product}></ProductItem>;
            })}

            {products.map((product) => {
              return <ProductItem key={product._id} product={product}></ProductItem>;
            })}
            {products.map((product) => {
              return <ProductItem key={product._id} product={product}></ProductItem>;
            })}
        </Row>
      </Container>
    </div>
  );
}
