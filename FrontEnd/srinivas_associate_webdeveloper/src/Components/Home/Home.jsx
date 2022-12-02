import React from "react";
import { Box } from "@chakra-ui/react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Box w="100vw" h="400px" mt="2px">
        <img
          src="https://www.teachforindia.org/assets/story-beginnings-header.jpg"
          alt="Refimage"
          className={styles.image}
        />
      </Box>
    </>
  );
};

export default Home;
