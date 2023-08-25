import styled from "styled-components";
import "../App.css";
import { useState } from "react";
import { useAuth } from "../components/StateProvider";
import axios from "axios";
const BASE_URL = "https://recorderapi.onrender.com";
const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;
  display: flex;
`;
const Section1 = styled.section`
  flex: 1;
  background-image: url("https://img.freepik.com/free-vector/men-success-laptop-relieve-work-from-home-computer-great_10045-646.jpg?w=2000");
  background-size: cover;
`;
const Section = styled.section`
  flex: 1;
  background-color: #2b57bf;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background-color: white;
  width: 70%;
  height: 80vh;
  border-radius: 5px;
`;
const AvatarImage = styled.img`
  display: block;
  margin: 50px auto;
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  padding: 10px;
  margin: 10px auto;
  width: 60%;
  border: 1px solid lightgray;
`;
const Button = styled.button`
  font-size: 15px;
  padding: 15px 10px;
  margin: 10px auto;
  width: 60%;
  border-radius: 10px;
  background-color: #86a5c8;
  color: white;
  border: none;
`;
export const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const {authState, dispatch} = useAuth();
  const user = { email, name };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        `${BASE_URL}/api/login`,
        user
      );
      response.status == "201" && dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      console.log("Res : ",response)
    } catch (error) {
      dispatch({ type: "LOGIN_FAILED", payload: error });
    }
  };

  return (
    <>
      <Container>
        <Section1></Section1>
        <Section>
          <Wrapper>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGP0LOh8SpUJCGgsBxnYVT1lvY4DNW_f_lBA&usqp=CAU" />
            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                type="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Wrapper>
        </Section>
      </Container>
    </>
  );
};
