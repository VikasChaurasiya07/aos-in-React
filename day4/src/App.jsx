import { useEffect } from "react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function datafetch() {
      if (count < 9) {
        const res = await fetch(
          "https://advent.sveltesociety.dev/data/2023/day-four.json"
        );
        const response = await res.json();
        setData([...data, response.heartRate]);
        setCount(count + 1);
      }
    }
    datafetch();
  }, [data, count]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Santa's Heart rate data",
      },
    },
  };

  const chatdata = {
    labels: [
      "5 hour ago",
      "4 hour ago",
      "3 hour ago",
      "2 hour ago",
      "1 hour ago",
    ],
    datasets: [
      {
        label: "Santa's Heart Rate",
        data: data,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <div className="container">
        <div className="chart">
          {data == 0 ? (
            <p>Loding..</p>
          ) : (
            <Line options={options} data={chatdata} />
          )}
        </div>

        <div className="info">
          <h1>The above graph shows Santa's heart rate data</h1>
        </div>
      </div>
    </>
  );
}

export default App;
