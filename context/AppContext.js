import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from 'ethers';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userNetwork, setUserNetwork] = useState(false);
  const [userConnected, setUserConnected] = useState(false);
  const [userBalance, setUserBalance] = useState(0)
  const [connecting, setConnecting] = useState(false)

  // const mainNetwork = {
  //   "chainId": "0x4",
  //   "chainName": "Rinkeby Testnet",
  //   "nativeCurrency": {
  //       "name": "Ethereum",
  //       "symbol": "ETH",
  //       "decimals": 18
  //   },
  //   "rpcUrls": ["https://rinkeby.infura.io/v3/"],
  //   "blockExplorerUrls": ["https://rinkeby.etherscan.io"]
  // }

  const mainNetwork = {
    "chainId": "0x89",
    "chainName": "Polygon Mainnet",
    "nativeCurrency": {
        "name": "Polygon",
        "symbol": "MATIC",
        "decimals": 18
    },
    "rpcUrls": ["https://polygon-rpc.com/"],
    "blockExplorerUrls": ["https://polygonscan.com/"]
  }

  const handleChangeNetwork = () => {
    const tryRequest = async () => {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: mainNetwork.chainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [mainNetwork],
            });
          } catch (addError) {
            // handle "add" error
            console.log(addError);
          }
        }
      }
    };

    tryRequest();

    return;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  useEffect(() => {
      if(web3) {
        checkConnect();

        window.ethereum.on("chainChanged", (net_id) => {
          if (net_id != userNetwork) {
            checkNetwork();
          }
        });

        window.ethereum.on('accountsChanged', checkConnect);
    }
  }, [web3])

  useEffect(() => {
    if (userAddress) {
      web3.eth.getBalance(userAddress).then( (balance) => {
        let tmpBalance = Number(ethers.utils.formatEther(balance));
        setUserBalance(tmpBalance.toFixed(2));
      });
    }
  }, [userAddress, userNetwork])
  

  const checkNetwork = async () => {
    if (typeof window != undefined && web3) {
      let networkId = await web3.eth.net.getId();

      setUserNetwork(networkId);

      if (web3.utils.toHex(networkId) != mainNetwork.chainId) {
        handleChangeNetwork();
      }

      return;
    }
  };

  const sendTransaction = async (from, to, data, value) => {
    if (userConnected && web3) {
      let txHash = false,
        rawTx = {
          from,
          to,
          data,
          gasPrice: await web3.utils.toHex("40000000000"),
          value,
        };
    
      try {
        await web3.eth.sendTransaction(rawTx).then((hashId) => {
          txHash = hashId;
        });
      } catch (err) {
        if (err.code) {
          //viewMessage(err.code);
        } else {
          //viewMessage("4001");
        }
      }
    
      return txHash;
    }

    return;
  };

  const clearUserData = () => {
    setUserAddress(false);
    setUserNetwork(false);
    setUserConnected(false);
    setConnecting(false);
  }

  const setUserData = (address) => {
    setUserAddress(address);
    setUserConnected(true);
    checkNetwork();
    setConnecting(false);
  }

  const checkConnect = async () => {
    if (typeof window !== "undefined" && web3) {
      let accs = await web3.eth.getAccounts();

      (accs.length) ? setUserData(accs[0]) : clearUserData();
    }
  };

  const connectMetamask = async () => {
    if (typeof window != undefined && web3) {
      setConnecting(true);
      try {
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            (res) ? setUserData(res[0]) : setUserConnected(false);
          });
      } catch (err) {
        clearUserData();
      }
    }
  };

  const data = {
    userConnected,
    userAddress,
    userNetwork,
    connectMetamask,
    sendTransaction,
    userBalance,
    setConnecting,
    connecting,
    web3
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export { AppProvider };
export default AppContext;
