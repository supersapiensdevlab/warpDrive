import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { useEffect, useState } from "react";
function Navbar() {
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    setChainId(window.ethereum.chainId);
  }, []);

  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  async function connect() {
    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    console.log(await signer.getAddress());
    setConnected(true);
    setAccount(await signer.getAddress());

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
      setAccount(accounts[0]);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
      setChainId(chainId.toString());
    });

    // Subscribe to provider connection
    provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
      setAccount(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error: { code: number, message: string }) => {
      console.log(error);
      setAccount(null);
    });
  }

  function switchToGoerli() {
    connect();
    async function switchNet() {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
        setChainId("0x5");
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainId,
                  rpcUrls: ["https://goerli.infura.io/v3/"],
                  chainName: "Goerli Test Network",
                  nativeCurrency: {
                    name: "GoerliETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://goerli.etherscan.io/"],
                },
              ],
            });
            setChainId("0x5");
          } catch (addError) {
            // handle "add" error
          }
        }
      }
    }
    if (window.ethereum.chainId !== "0x5") switchNet();
  }
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">WarpDrive</a>
      </div>
      <div className="navbar-end">
        <div
          className={`badge  mx-2 cursor-pointer `}
          onClick={() => switchToGoerli()}
        >
          Goerli Testnet {account}
          <span
            className={`badge badge-xs  indicator-item ml-2 ${
              chainId === "0x5" && account !== null
                ? "badge-success"
                : " badge-error"
            }`}
          ></span>
        </div>

        <label htmlFor="my-modal-3" className="btn modal-button">
          Upload Files
        </label>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item hidden"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <label
            tabIndex="0"
            className="btn btn-ghost btn-circle avatar"
            onClick={() => connect()}
          >
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
