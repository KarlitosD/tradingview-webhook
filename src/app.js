import express from "express"
import ccxt from "ccxt"
import { parseOrder } from "./utils.js"
import "dotenv/config"

const exchangeId = "binanceusdm"
const exchange = new ccxt[exchangeId]({
  apiKey: process.env.BINANCE_KEY,
  secret: process.env.BINANCE_SECRET,
})

await exchange.loadMarkets()

const app = express()
app.use(express.text())

app.get("/", (_req, res) => { 
    res.send({ work: true })
})

app.post("/trading", async (req, res) => {
    try {
        const order = parseOrder(req.body)
        const { Order, Asset, IndividualPosition, Leverage } = order
        const symbol = Asset.substring(0, Asset.length - 4) + "/" + Asset.substring(Asset.length - 4)
        const LEVERAGE_CANT = +Leverage || process.env.LEVERAGE || 5
        console.log(order)
        if(!exchange.has["setLeverage"])
            throw new Error((exchange.id + ' does not have the setLeverage method'))
        
        const leverage = await exchange.setLeverage(LEVERAGE_CANT, symbol, { marginMode: "cross" })
        const marketOrder = await exchange.createMarketOrder(symbol, Order, IndividualPosition, { "reduceOnly": false })
        console.log({ leverage, marketOrder })
        res.send(order)
    } catch (error) {
        console.log(error.message)
        res.send({ error: error.message })
    }
})

app.listen(process.env.PORT || 3000, () => console.log("App running"))
