import { ConnectWallet, MediaRenderer, useContract, useContractMetadata, useMetadata } from "@thirdweb-dev/react";
import {Box, Container, Flex, Heading, SimpleGrid, Skeleton, Text} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useState } from "react";


const Home: NextPage = () => {

  const {
    contract
  } = useContract("0x76dC6e5BB04006876Ee8F56383D9c628cBBbe10d");

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

    return (
    <Container maxW={"1200px"}>
      <Flex p={"20px"} justifyContent={"space-between"}>
        <Box></Box>
        <ConnectWallet/>
      </Flex>
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <SimpleGrid columns={2} spacing={10} justifyContent={"center"}>
          <Box>
          {!isContractMetadataLoading && (
            <Skeleton isLoaded={!isContractMetadataLoading}>
            <MediaRenderer
                src={contractMetadata.image}
              />
            </Skeleton>
          )}
          </Box>
          <Flex>
          {!isContractMetadataLoading && (
            <Skeleton isLoaded={!isContractMetadataLoading}>
            <Heading>{contractMetadata.name}</Heading>
            </Skeleton>
          )}
          </Flex>
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Home;
