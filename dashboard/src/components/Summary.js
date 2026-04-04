import React, { useState, useEffect } from "react";
import axios from "axios";
import { DoughnutChart } from "./DoughnutChart";

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/allHoldings`).then((res) => {
      setAllHoldings(res.data);
    });
  }, []);

  const totalInvestment = allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, Customer!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>4,043.10</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>4,043.10</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <DoughnutChart data={{
          labels: allHoldings.map((s) => s.name),
          datasets: [{
            data: allHoldings.map((s) => s.price * s.qty),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ]
          }]
        }} />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <small>{pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue.toLocaleString()}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toLocaleString()}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
