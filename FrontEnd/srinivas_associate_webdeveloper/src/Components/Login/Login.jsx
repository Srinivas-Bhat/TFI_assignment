import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const Toast = useToast();
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const payload = JSON.stringify(form);
    fetch("https://tfibackend-production.up.railway.app/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: payload,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error === "perror") {
          Toast({
            title: `Error toast`,
            description: "Please verify your entered email or password",
            status: "error",
            isClosable: true,
            duration: 4000
          });
        }
        else if(res.error === "notfound") {
          Toast({
            title: `Error toast`,
            description: "User not found. Please signup",
            status: "error",
            isClosable: true,
            duration: 4000
          });
        }
        else if(res.error === "error") {
          Toast({
            title: `Error toast`,
            description: "Something went wrong",
            status: "error",
            isClosable: true,
            duration: 4000
          });
        }
        else {
          Toast({
            title: `Success toast`,
            description: "Login Successfull",
            status: "success",
            isClosable: true,
            duration: 4000
          });
          localStorage.setItem("TFItoken", JSON.stringify({token: res.token, role: res.role, userID: res.id}));
          Navigate("/");
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log-in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={form.email}
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={form.password}
                name="password"
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6} mt="15px">
            <Text align={"center"}>
              Not already an user?{" "}
              <Link to="/signup" className={styles.linktag}>
                Signup
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
