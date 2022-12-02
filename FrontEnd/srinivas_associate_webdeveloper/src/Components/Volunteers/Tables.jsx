import { Td, Tr } from "@chakra-ui/react";
import React from "react";

const Tables = ({ el, index }) => {
  return (
    <>
      <Tr>
        <Td>{index + 1}.</Td>
        <Td>{el.fullname} </Td>
        <Td>{el.email}</Td>
        <Td>{el.location}</Td>
        <Td>{el.phone}</Td>
        <Td>{(el.spokenLanguages).join(", ")}</Td>
        <Td>{(el.availability).join(", ")}</Td>
      </Tr>
    </>
  );
};

export default Tables;
