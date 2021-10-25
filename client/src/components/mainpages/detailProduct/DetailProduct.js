import React, {useContext, useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import { Row, Button, Col } from "react-bootstrap";
import {GlobalState} from "../../../GlobalState";
import { Container } from '@mui/material';
import { Box } from '@mui/system';

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productApi.products;
    const [detailProduct, setDetailProduct] = useState([])
    console.log(params)
    useEffect(() =>{
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id)  {
                    setDetailProduct(product)
                }
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;
    return (
        <div>
                <Container  style={{margin: "5% auto", position:"relative"}}> 
                    <img src={detailProduct.images.url} style={{width: 250, height: 300}} align='left'></img>
                    <div style={{margin: "20px 0px 0px 25%", position: "absolute"}}>
                        <h1>{detailProduct.title}</h1>
                        <h4>Rs. {detailProduct.price}</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Button variant="primary" style={{    backgroundColor: "#E05D5D",  border: "none" }}>Buy Now</Button>
                    </div>
                </Container>
        </div>
    )
}

export default DetailProduct
