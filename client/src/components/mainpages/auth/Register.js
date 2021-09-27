import axios from "axios";
import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const styles = {
    containerStyle: {
      width: "400px",
      backgroundColor: "#f4f4f4",
      padding: "20px",
      margin: "10% auto 0",
    },
    formStyle: {
      margin: "0 auto !important",
    },
    primaryBtnStyle: {
        margin: "30px auto 10px",
        width: "60%"
    },
    colStyle: {
        margin: "0 auto",
    },
    inputStyle: {
        border: "none",
    }
  };

  const onChangeInput = (event) => {
      const {name, value} = event.target;
      setUser({...user, [name]:value });
  }

  const registerHandle = async (event) => {
      event.preventDefault();
      try {
          await axios.post('/user/register', {...user})
          localStorage.setItem('firstLogin', true);

          window.location.href ='/'

      } catch (err) {
          alert(err.response.data.msg)
      }

  }
  return (
    <Container style={styles.containerStyle}>
        <h2 style={{marginBottom: "1.5rem", paddingLeft:"16px"}}>Sign Up</h2>
      <Form style={styles.formStyle} onSubmit={registerHandle}>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm="2">Email Address</Form.Label> */}
          <Col sm="11" style={styles.colStyle}>
            <Form.Control style={styles.inputStyle} type="text" name= "name" placeholder="Full name" value={user.name || ""} onChange={onChangeInput}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm="2">Email Address</Form.Label> */}
          <Col sm="11" style={styles.colStyle}>
            <Form.Control style={styles.inputStyle} type="email" name= "email" placeholder="Email ID" value={user.email || ""} onChange={onChangeInput}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm="2">Password</Form.Label> */}
          <Col sm="11" style={styles.colStyle}>
            <Form.Control style={styles.inputStyle} type="password" name="password" placeholder="Password" value={user.password || ""} onChange={onChangeInput} />
          </Col>
        </Form.Group>
        <Row>
        <Button variant="primary" type="submit" style={styles.primaryBtnStyle}>Register Now</Button>
        <Button variant="link" href="/login">Existing user? Sign In</Button>
        </Row>

      </Form>
    </Container>
  );
}
