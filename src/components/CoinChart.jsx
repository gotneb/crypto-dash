import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch(
        `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!res.ok) throw new Error("Failed to fetch the data.");
      const data = await res.json();

      const prices = data.prices.map((price) => ({
        x: price[0], // timestamp (milis)
        y: price[1], // value (price)
      }));

      console.log(prices);

      setChartData({
        datasets: [
          {
            label: "Price (BRL)",
            data: prices,
            fill: true,
            borderColor: "#007BFF",
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            pointRadius: 0, // hides point
            tension: 0.3,
          },
        ],
      });

      setLoading(false);
    };

    fetchPrices();
  }, [coinId]);

  if (loading) return <p>Loading chart...</p>

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString("pt-BR")}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
