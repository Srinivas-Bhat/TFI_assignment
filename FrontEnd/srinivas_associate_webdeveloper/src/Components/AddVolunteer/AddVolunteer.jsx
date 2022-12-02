import React from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  HStack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const AddVolunteer = () => {

  const [languages, setLanguages] = useState([])
  const [availability, setAvailability] = useState([])
  const [form, setform] = useState({
    fullname: "",
    email: "",
    location: "",
    phone: "",
  })
  const Toast = useToast();
  const handleLanguageChange = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    console.log(value, checked);
    if(checked) {
      setLanguages([
        ...languages,
        value
      ])
    }
  }
  const handleAvailabilityChange = (e) => {  //function for availability check in a week of a particular volunteer
    let value = e.target.value;
    let checked = e.target.checked;
    console.log(value, checked);
    if(checked) {
      setAvailability([
        ...availability,
        value
      ])
    }
  }
  const handleChange = (e) => {
    const {name, value} = e.target;
    setform({
      ...form,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let volunteerDetails = {
      ...form,
      spokenLanguages: languages,
      availability: availability,  
    }
    console.log(volunteerDetails);
    fetch("http://localhost:8000/volunteer/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(volunteerDetails)
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if(res.error === "error") {
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
          title: `Registration Success`,
          description: "Volunteer has been successfully registered",
          status: "success",
          isClosable: true,
          duration: 4000
        });
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
          <Heading fontSize={"4xl"}>Volunteer with Us</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} w="360px">
            <FormControl id="name">
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name="fullname" value={form.fullname} onChange={handleChange} required />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" value={form.email} onChange={handleChange} required />
            </FormControl>
            <FormControl id="Location">
              <FormLabel>Location</FormLabel>
              <Input type="text" name="location" value={form.location} onChange={handleChange} required />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Input type="text" name="phone" value={form.phone} onChange={handleChange} required />
            </FormControl>

            <FormLabel fontSize="17.4px">Availability</FormLabel>
            <Stack>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Monday" value="Monday" size="sm">
                Monday
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Tuesday" value="Tuesday" size="sm">
                Tuesday
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Wednesday" value="Wednesday" size="sm">
                Wednesday
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Thursday" value="Thursday" size="sm">
                Thursday
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Friday" value="Friday" size="sm">
                Friday
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Saturday" value="Saturday" size="sm">
                Saturday
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" onChange={handleAvailabilityChange} name="Sunday" value="Sunday" size="sm">
                Sunday
              </Checkbox>
            </Stack>

            <FormLabel>Spoken Languages</FormLabel>
            <HStack>
              <Checkbox colorScheme="green" type="checkbox" size="sm" name="Gujarathi" value="Gujarathi" onChange={handleLanguageChange}>
                Gujarathi
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" size="sm" name="Tamil" value="Tamil" onChange={handleLanguageChange}>
                Tamil
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" size="sm" name="Hindi" value="Hindi" onChange={handleLanguageChange}>
                Hindi
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" size="sm" name="English" value="English" onChange={handleLanguageChange}>
                English
              </Checkbox>
              <Checkbox colorScheme="green" type="checkbox" size="sm" name="Kannada" value="Kannada" onChange={handleLanguageChange}>
                Kannada
              </Checkbox>
            </HStack>

            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                mt="20px"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default AddVolunteer;
