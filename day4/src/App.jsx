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

  const [avg, setAvg] = useState(0);

  useEffect(() => {
    async function datafetch() {
      if (data.length < 2) {
        const res = await fetch(
          "https://advent.sveltesociety.dev/data/2023/day-four.json"
        );
        const response = await res.json();
        setData([...data, response.heartRate]);
      } else if (data.length < 10) {
        setTimeout(async () => {
          const res = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-four.json"
          );
          const response = await res.json();
          setData([...data, response.heartRate]);
          average();
        }, 4000);
      }
    }

    function average() {
      let a = 0;
      data.forEach((item) => {
        a = a + item;
      });

      let averagevalue = a / data.length;

      setAvg(parseInt(averagevalue));
    }

    datafetch();
    average();
  }, [data]);

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
    labels: "          ",
    datasets: [
      {
        label: "Santa's Heart Rate",
        data: data,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
      },
    ],
  };

  return (
    <>
      <div className="container">
        <div className="chart">
          {data == 0 ? (
            <p className="loading">Loding..</p>
          ) : (
            <Line options={options} data={chatdata} />
          )}
        </div>

        <div className="info">
          <h1>The above graph shows Santa's heart rate data</h1>
          <p>Average Heart rate Today: {avg}</p>
        </div>
      </div>
    </>
  );
}

export default App;
