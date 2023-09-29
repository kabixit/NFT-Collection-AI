import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { ChakraProvider } from '@chakra-ui/react'



const activeChain = {Sepolia};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId="72db9cca8ad98218e0112beaa945a1a2"
      activeChain={Sepolia}
    >
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
