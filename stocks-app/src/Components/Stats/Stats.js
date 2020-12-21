import React, { useState, useEffect } from "react";
import { key } from "../../api";
import axios from "axios";
import StatsRow from "./StatsRow/StatsRow";
import "./Stats.css";

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;

function Stats() {
  const [stocksData, setStockData] = useState([]);
  const [myStocks, setmyStocks] = useState([]);
  
  const getStockData = (stock) => {
    return axios.get(`${BASE_URL}${stock}${KEY_URL}`).catch((error) => {
      console.error("Error", error.message);
    });
  };
  useEffect(() => {
    let tempStockData = [];
    const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA"];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStockData(stock).then((res) => {
          console.log(res);
          tempStockData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });
    Promise.all(promises).then(() => {
      console.log(tempStockData);
      setStockData(tempStockData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stocksData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                volume={stock.shares}
                price={stock.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
