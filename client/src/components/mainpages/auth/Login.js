import axios from "axios";
import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";

export default function Login() {
  const [user, setUser] = useState({
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
        width: "60%",
    },
    colStyle: {
        margin: "0 auto",
        padding: "0",
    },
    inputStyle: {
        border: "none",
    }
  };

  const onChangeInput = (event) => {
      const {name, value} = event.target;
      setUser({...user, [name]:value });
  }

  const loginHandle = async (event) => {
      event.preventDefault();
      try {
          await axios.post('/user/login', {...user})
          localStorage.setItem('firstLogin', true);

          window.location.href ='/'

      } catch (err) {
          alert(err.response.data.msg)
      }

  }
  return (
    <Container style={styles.containerStyle}>
        <h2 style={{marginBottom: "1.5rem", paddingLeft:"16px"}}>Login</h2>
      <Form style={styles.formStyle} onSubmit={loginHandle}>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm="2">Email Address</Form.Label> */}
          <Col sm="10" style={styles.colStyle}>
            <Form.Control style={styles.inputStyle} type="email" name= "email" placeholder="Email ID" value={user.email || ""} onChange={onChangeInput}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          {/* <Form.Label column sm="2">Password</Form.Label> */}
          <Col sm="10" style={styles.colStyle}>
            <Form.Control style={styles.inputStyle} type="password" name="password" placeholder="Password" value={user.password || ""} onChange={onChangeInput} />
          </Col>
        </Form.Group>
        <Row>
        <Button variant="primary" type="submit" style={styles.primaryBtnStyle}>Login Now</Button><br></br>
        <Button variant="link" href="/register">New user? Sign Up</Button>
        </Row>

      </Form>
    </Container>
  );
}
