"use client";

import React, { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { http, WagmiProvider } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
} from "wagmi/chains";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

// Setup queryClient
const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const chains = [mainnet, sepolia, polygon, optimism, arbitrum, base] as const;

const metadata = {
  name: "digital-marketplace",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true, // default to true
    socials: ["google", "x", "github", "discord", "apple"],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});
// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export default function WalletConnectProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
