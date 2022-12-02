import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,

  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const Toast = useToast();
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const payload = JSON.stringify(form);
    fetch("http://localhost:8000/auth/signup", {
      headers: {
        "Content-Type": "application/json"
      },
      method : "POST",
      body : payload
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if(res.code === "401") {
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
          title: `Signup Success`,
          description: "User signup successfully",
          status: "success",
          isClosable: true,
          duration: 4000
        });
        Navigate("/login")
      }
    })
    .catch((err) => {
      console.log(err);
    })
  } 

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5} w="300px">
            <FormControl id="firstName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>
            {/* <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select placeholder="Select your Role" name="role" value={form.role} onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
            </FormControl> */}
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link to="/login" className={styles.linktag} color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
