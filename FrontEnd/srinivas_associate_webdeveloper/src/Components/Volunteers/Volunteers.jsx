import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Tables from "./Tables";

const Volunteers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    function getVolunteers() {
      //function to get the list of volunteers and which will only loaded once
      fetch("http://localhost:8000/volunteer")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(res);
          localStorage.setItem("length", data.length);
        });
    }
    getVolunteers();
  }, []);
  return (
    <>
      <TableContainer
        w="92%"
        m="auto"
        fontSize="14px"
        fontWeight="500"
        mt="25px"
        border="1px solid lightgray"
        borderRadius="10px"
      >
        <Table variant="striped" colorScheme="teal" size="md">
          <TableCaption>
            Number of Volunteers registered is {`${data.length}`}.
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Sl.No</Th>
              <Th>Full Name</Th>
              <Th>Email Address</Th>
              <Th>Location</Th>
              <Th>Contact Number</Th>
              <Th>Spoken Languages</Th>
              <Th>Availability</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((el, index) => (
                <Tables el={el} index={index} key={el._id} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Volunteers;
