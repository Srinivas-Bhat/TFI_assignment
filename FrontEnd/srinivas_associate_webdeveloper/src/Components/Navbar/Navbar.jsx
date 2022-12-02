import React from "react";
import "./Navbar.css";
import { Flex, Box, Heading, Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let info = JSON.parse(localStorage.getItem("TFItoken")) || {
    role: "Volunteer",
  };
  // console.log(info);
  const navigate = useNavigate();
  const Toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("TFItoken");
    navigate("/login");
  };
  const handleAllocationClick = () => {
    let length = localStorage.getItem("length");
    console.log(length);
    fetch("https://tfibackend-production.up.railway.app/volunteer/allocate")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if(length < 20) {
        Toast({
          title: `Warning`,
          description: "Voulunteers list has to reach twenty to allocate",
          status: "warning",
          isClosable: true,
          duration: 4000
        });
      }
      Toast({
        title: `Workin in Progress`,
        description: "Allocation of Volunteers is under construction",
        status: "info",
        isClosable: true,
        duration: 4000
      });
    })
  }
  return (
    <Flex
      border="1px solid gray"
      vw="100%"
      m="auto"
      justify="space-around"
      align="center"
      h="65px"
      bg="gray.600"
    >
      <Box>
        <Heading as="h3" size="md" fontWeight="700" fontSize="23px">
          TEACH<span className="forSpan">FOR</span>INDIA
        </Heading>
      </Box>

      <Flex
        w="40%"
        justify="space-evenly"
        align="center"
        color="#0ec0e2"
        fontSize="16px"
        fontWeight="500"
      >
        {info.token ? (
          <>
            <Box
              _hover={{
                color: "#6ed9ed",
                textDecoration: "underline 1px dotted gray",
              }}
            >
              <Link to="/">Home</Link>
            </Box>
            {info.role === "Admin" ? (
              <>
                <Box
                  _hover={{
                    color: "#6ed9ed",
                    textDecoration: "underline 1px dotted gray",
                  }}
                >
                  <Link to="/voluteer">Volunteers</Link>
                </Box>
                <Box>
                  <Button
                    bg="transparent"
                    colorScheme="cyan"
                    variant="outline"
                    _hover={{ bg: "transparent", color: "#6ed9ed" }}
                    onClick={handleAllocationClick}
                  >
                    Allocate Volunteers{" "}
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                _hover={{
                  color: "#6ed9ed",
                  textDecoration: "underline 1px dotted gray",
                }}
              >
                <Link to="/register">Become Volunteer</Link>
              </Box>
            )}

            <Box
              _hover={{
                color: "#6ed9ed",
                textDecoration: "underline 1px dotted gray",
              }}
              onClick={handleLogout}
            >
              <Link to="/">Logout</Link>
            </Box>
          </>
        ) : (
          <>
            <Box
              _hover={{
                color: "#6ed9ed",
                textDecoration: "underline 1px dotted gray",
              }}
            >
              <Link to="/login">Login</Link>
            </Box>
            <Box
              _hover={{
                color: "#6ed9ed",
                textDecoration: "underline 1px dotted gray",
              }}
            >
              <Link to="/signup">Signup</Link>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;


