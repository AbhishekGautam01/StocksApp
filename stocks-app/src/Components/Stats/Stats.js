import React, { useState, useEffect } from "react";
import { key } from "../../api";
import axios from "axios";
import StatsRow from "./StatsRow/StatsRow";
import { db } from "../../firebase";
import "./Stats.css";

const BASE_URL = "https://finnhub.io/api/v1/quote?symbol=";
const KEY_URL = `&token=${key}`;

function Stats() {
  const [stocksData, setStockData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const getMyStocks = () => {
    db.collection("myStocks").onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        promises.push(
          getStockData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        setMyStocks(tempData);
      });
    });
  };

  const getStockData = (stock) => {
    return axios.get(`${BASE_URL}${stock}${KEY_URL}`).catch((error) => {
      console.error("Error", error.message);
    });
  };
  useEffect(() => {
    let tempStockData = [];
    const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA"];
    let promises = [];
    getMyStocks();
    stocksList.map((stock) => {
      promises.push(
        getStockData(stock).then((res) => {
          tempStockData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });
    Promise.all(promises).then(() => {
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
          {myStocks.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                volume={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__list">
          <p>Lists</p>
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
      </div>
    </div>
  );
}

export default Stats;
