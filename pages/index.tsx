import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata, useContractRead, useMetadata } from "@thirdweb-dev/react";
import { Box, Container, Flex, Heading, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract
  } = useContract("0x76dC6e5BB04006876Ee8F56383D9c628cBBbe10d");

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

  const {
    data: totalMinted,
    isLoading: isContractTotalMintedLoading,
  } = useContractRead(contract, "totalMinted");

  return (
    <Container maxW={"1200px"}>
      <Flex p={"20px"} justifyContent={"space-between"}>
        <Box></Box>
        <ConnectWallet />
      </Flex>
      <Flex h={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <SimpleGrid columns={2} spacing={10} justifyContent={"center"}>
          <Box>
            {!isContractMetadataLoading && (
              <Skeleton isLoaded={!isContractMetadataLoading}>
                <MediaRenderer src={contractMetadata.image} />
              </Skeleton>
            )}
          </Box>
          <Flex direction="column" justifyContent={"center"} alignItems="center">
            {!isContractMetadataLoading && (
              <Skeleton isLoaded={!isContractMetadataLoading}>
                <Heading fontSize="2xl" fontWeight="bold" mb={4} color="blue.500">
                  {contractMetadata.name}
                </Heading>
              </Skeleton>
            )}
            {!isContractTotalMintedLoading && (
              <Skeleton isLoaded={!isContractTotalMintedLoading}>
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  Total Minted: {totalMinted.toNumber()}/3
                </Text>
              </Skeleton>
            )}
            {address ? (
              <Web3Button
                contractAddress="0x76dC6e5BB04006876Ee8F56383D9c628cBBbe10d"
                action={(contract) => contract.erc721.claim(1)}
                mt={4}
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                borderRadius="md"
                paddingX={6}
                paddingY={3}
                fontSize="lg"
                fontWeight="bold"
              >
                Claim NFT
              </Web3Button>
            ) : (
              <Text fontSize="lg" fontWeight="bold" mt={4} color="red.500">
                Please Connect Your Wallet
              </Text>
            )}
          </Flex>
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Home;
