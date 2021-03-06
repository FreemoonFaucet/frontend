import axios from "axios"
import { useState, useEffect } from "react"
import styled from "styled-components"
import Web3 from "web3"
import config from "../utils/config"

import { FreeContract, FmnContract, FaucetContract } from "../utils/contracts"

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const DashboardRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (orientation: portrait) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`

const Message = styled.div`
  width: 80%;
  font-size: 1rem;
  font-style: italic;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px; 
`

const DashColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 40%;

  @media screen and (orientation: portrait) {
    width: 90%;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  max-width: 1000px;
  height: 300px;
  margin-bottom: 20px;
  padding-bottom: 5px;
  border: 2px solid #000;
  text-align: center;
  overflow-wrap: break-word;

  @media screen and (orientation: portrait) {
    max-width: 700px;
  }
`

const Row = styled.div`
  display: flex;
  width: 98%;
  height: 12%;
  margin: 10px 1%;
`

const Label = styled.div`
  width: 50%;
  height: 100%;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
`

const Number = styled.div`
  width: 50%;
  height: 100%;
  font-size: 1rem;
  text-align: left;
`

const Detail = styled.p`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 27px;
  margin: 10px 0;
  max-width: 800px;
  border-bottom: 1px solid #000;
  font-size: 1.4rem;
  text-align: center;
`

const A = styled.a`
  color: #92b4e3;
`


export default function Dashboard({ connection }) {

  const [ balanceSupply, setBalanceSupply ] = useState({
    freeBal: "0",
    fmnBal: "0",
    freeSupply: 0,
    fmnSupply: "0"
  })
  const [ freemoonFaucet, setFreemoonFaucet ] = useState({
    subscribers: "0",
    gasFund: "0",
    fsnReserve: "0",
    totalClaims: "0"
  })
  // const [ fusionMainnet, setFusionMainnet ] = useState({
  //   dailyTx: ZERO,
  //   dailyFmn: ZERO,
  //   totalTx: ZERO,
  //   totalFmn: ZERO
  // })
  const [ latestWin, setLatestWin ] = useState({
    by: "-",
    blockHeight: "-",
    date: "-",
    winningHash: "-",
    txHash: "-",
    claimsSincePrevious: "-",
    freeHodl: "-"
  })

  const padHash = hash => {
    let paddedHash = hash

    if(hash.length < 64) {
      for(let i = 0; i < (64 - hash.length); i++) {
        paddedHash = "0" + paddedHash
      }
    }

    return "0x" + paddedHash
  }

  useEffect(() => {
    const getStats = async () => {
      const network = config.networks.fsnMainnet
      let provider = connection.connected ? connection.provider : network.provider
      const web3 = new Web3(provider)

      const free = await FreeContract(web3)
      const fmn = await FmnContract(web3)
      const faucet = await FaucetContract(web3)

      /*
         Until CORS works with gateway, I'm going to disable automatic loading and require that web3 provider is active.
      */
      if(connection.connected) getBalanceSupply(web3, free, fmn, connection.accounts[0])
      else getBalanceSupply(web3, free, fmn)

      getFreemoonFaucet(web3, network, faucet)
      getFusionMainnet()
      getLatestWin(web3, free, faucet)
    }

    getStats()
  }, [ connection ])

  const getBalanceSupply = async (web3, free, fmn, account) => {
    let freeBal, fmnBal
    if(account) {
      freeBal = await free.methods.balanceOf(account).call()
      fmnBal = await fmn.methods.balanceOf(account).call()
    } else {
      freeBal = "0"
      fmnBal = "0"
    }
    const freeSupply = await free.methods.circulationSupply().call()
    const fmnSupply = await fmn.methods.circulationSupply().call()
    setBalanceSupply({
      freeBal: web3.utils.fromWei(freeBal),
      fmnBal: web3.utils.fromWei(fmnBal),
      freeSupply: parseInt(web3.utils.fromWei(freeSupply)),
      fmnSupply: web3.utils.fromWei(fmnSupply)
    })
  }
  
  const getFreemoonFaucet = async (web3, network, faucet) => {
    const coordinator = await faucet.methods.coordinator().call()
    const faucetAddr = network.contracts.faucet
    
    const subscribers = await faucet.methods.subscribers().call()
    const gasFund = await web3.eth.getBalance(coordinator)
    const fsnReserve = await web3.eth.getBalance(faucetAddr)
    const totalClaims = await faucet.methods.claims().call()

    setFreemoonFaucet({
      subscribers: subscribers.toString(),
      gasFund: web3.utils.fromWei(gasFund),
      fsnReserve: web3.utils.fromWei(fsnReserve),
      totalClaims: totalClaims.toString()
    })
  }

  const getFusionMainnet = async () => {}

  const getLatestWin = async (web3, free, faucet) => {
    const historicWins = await faucet.methods.winners().call()

    if(historicWins.toString() !== "0") {
      const wins = await axios.get("https://api.freemoonfaucet.xyz/api/v1/wins")
      const latest = wins.data.latest
      const winBlock = await web3.eth.getBlock(latest.blockHash)
      const timestamp = winBlock.timestamp
      const isWin = await faucet.methods.checkIfWin(
        latest.lottery,
        latest.txHash,
        latest.blockHash
      ).call()
      const winningHash = padHash(web3.utils.toHex(isWin[0]).slice(2))

      
      // const claimsTaken = await faucet.methods.claims().call({}, winBlock.number)
      // const freeHodl = await free.methods.balanceOf(latest.returnValues.entrant).call({}, winBlock.number)
      setLatestWin({
        by: latest.entrant,
        blockHeight: winBlock.number,
        date: new Date(timestamp*1000).toUTCString(),
        winningHash: winningHash,
        txHash: latest.txHash
        // claimsSincePrevious: claimsTaken,
        // freeHodl: web3.utils.fromWei(freeHodl)
      })
    }
  }


  return (
    <DashboardContainer>
    <DashboardRow>
      <DashColumn>
        <Box>
          <Detail>Your Balance</Detail>
          <Row>
            <Label>FREE balance</Label>
            <Number>{balanceSupply.freeBal.toString()}</Number>
          </Row>
          <Row>
            <Label>FMN balance</Label>
            <Number>{balanceSupply.fmnBal.toString()}</Number>
          </Row>
          <Detail>Active Supply</Detail>
          <Row>
            <Label>FREE Supply</Label>
            <Number>{balanceSupply.freeSupply.toFixed(0)}</Number>
          </Row>
          <Row>
            <Label>FMN Supply</Label>
            <Number>{balanceSupply.fmnSupply.toString()}</Number>
          </Row>
        </Box>
        <Box>
          <Detail>FREEMOON Faucet</Detail>
          <Row>
            <Label>Subscribers</Label>
            <Number>{freemoonFaucet.subscribers}</Number>
          </Row>
          <Row>
            <Label>Gas Fund</Label>
            <Number>{freemoonFaucet.gasFund}</Number>
          </Row>
          <Row>
            <Label>FSN Reserve</Label>
            <Number>{freemoonFaucet.fsnReserve}</Number>
          </Row>
          <Row>
            <Label>Total Claims</Label>
            <Number>{freemoonFaucet.totalClaims}</Number>
          </Row>
        </Box>
      </DashColumn>
      <DashColumn>
        <Box>
          <Detail>Fusion Mainnet</Detail>
          <Row>
            <Label>Daily Tx's</Label>
            <Number>
              {/* {fusionMainnet.dailyTx.toString()} */}
              0
            </Number>
          </Row>
          <Row>
            <Label>FREEMOON</Label>
            <Number>
              {/* {fusionMainnet.dailyFmn.toString()}% */}
              0
            </Number>
          </Row>
          <Row>
            <Label>Total Tx's</Label>
            <Number>
              {/* {fusionMainnet.totalTx.toString()} */}
              0
            </Number>
          </Row>
          <Row>
            <Label>FREEMOON</Label>
            <Number>
              {/* {fusionMainnet.totalFmn.toString()}% */}
              0
            </Number>
          </Row>
        </Box>
        <Box>
          <Detail>Latest FMN Won</Detail>
          <Row>
            <Label>By</Label>
            <Number>{latestWin.by}</Number>
          </Row>
          <Row>
            <Label>Block Height</Label>
            <Number>{latestWin.blockHeight.toString()}</Number>
          </Row>
          <Row>
            <Label>Date</Label>
            <Number>{latestWin.date}</Number>
          </Row>
          <Row>
            <Label>Winning Calculated Hash Number</Label>
            <Number>{latestWin.winningHash}</Number>
          </Row>
          <Row>
            <Label>Winning Claim</Label>
            <Number><A href={`https://fsnex.com/transaction/${latestWin.txHash}`} target="_blank">{latestWin.txHash}</A></Number>
          </Row>
          {/* <Row>
            <Label>Claims to Win</Label>
            <Number>{latestWin.claimsSincePrevious.toString()}</Number>
          </Row>
          <Row>
            <Label>FREE in HODL</Label>
            <Number>{latestWin.freeHodl.toString()}</Number>
          </Row> */}
        </Box>
      </DashColumn>
    </DashboardRow>
    <Message>
      If visiting with Metamask mobile browser, be connected to Ethereum when first entering the site.
    </Message>
    </DashboardContainer>
  )
}