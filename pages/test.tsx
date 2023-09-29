import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { 
  MediaRenderer, 
  Web3Button, 
  useActiveClaimConditionForWallet, 
  useAddress, 
  useClaimIneligibilityReasons, 
  useContract, 
  useContractMetadata, 
  useTotalCirculatingSupply, 
  useTotalCount 
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Text, Heading } from '@chakra-ui/react'; // Import Chakra UI components


const Home: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const maxClaimQuantity = 2;

  const {
    contract
  } = useContract("0x76dC6e5BB04006876Ee8F56383D9c628cBBbe10d");

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

  const {
    data: activeClaimPhase,
    isLoading: isActiveClaimPhaseLoading,
  } = useActiveClaimConditionForWallet(contract, address);

  const {
    data: claimIneligibilityReasons,
    isLoading: isClaimIneligibilityReasonsLoading,
  } = useClaimIneligibilityReasons(
    contract,
    {
      walletAddress: address || "",
      quantity: 1,
    }
  );

  const {
    data: totalSupply,
    isLoading: isTotalSupplyLoading,
  } = useTotalCount(contract);
  const {
    data: totalClaimSupply,
    isLoading: isTotalClaimSupplyLoading,
  } = useTotalCirculatingSupply(contract);

  

  const [claimQuantity, setClaimQuantity] = useState(1);
  const increment = () => {
    if (claimQuantity < maxClaimQuantity) {
      setClaimQuantity(claimQuantity + 1);
    }
  };
  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };

  return (
    <Box>
      <Box>
        {!isContractMetadataLoading && (
          <Box>
            <Box>
              <MediaRenderer src={contractMetadata.image} />
            </Box>
            <Box>
              <Heading>{contractMetadata.name}</Heading>
              <Text>{contractMetadata.description}</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;