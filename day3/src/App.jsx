import { useState } from "react";
import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

function App() {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [weight, setWeight] = useState(0);

  const [color, setColor] = useState([]);
  const [piedata, setPieData] = useState({});

  useEffect(() => {
    dataFetch();
    colorData();
  }, []);

  useEffect(() => {
    function forweight() {
      const adddataweightarr = addData.map((item) => item.weight);
      let tmp = 0;
      adddataweightarr.forEach((element) => (tmp = tmp + element));
      setWeight(tmp);
    }

    function piechatdata() {
      const chartdata = {
        labels: addData.map((item) => item.name),
        datasets: [
          {
            label: "Weight",
            data: addData.map((item) => item.weight),
            backgroundColor: color.slice(0, addData.length),
            borderColor: color.slice(0, addData.length),
            borderWidth: 1,
          },
        ],
      };
      setPieData(chartdata);
    }

    piechatdata();
    forweight();
  }, [addData, color]);

  async function dataFetch() {
    const res = await fetch(
      "https://advent.sveltesociety.dev/data/2023/day-three.json"
    );
    const data = await res.json();
    setData([...data]);
  }

  function colorData() {
    setColor(
      Array.from(
        { length: 100 },
        () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`
      )
    );
  }

  function addToSeigh(params, index) {
    setAddData([...addData, params]);
    const newdata = data.filter((_, i) => i != index);
    setData([...newdata]);
  }

  function removeFromSeigh(params, index) {
    setData([...data, params]);
    const newdata = addData.filter((_, i) => i != index);
    setAddData([...newdata]);
  }

  return (
    <>
      <div className="container">
        <div className="datalist">
          <h1>Select to check weight</h1>
          <ol>
            {data.map((item, index) => (
              <li key={index}>
                <p>Name: {item.name}</p>
                <p>Weight: {item.weight}</p>
                {
                  weight > 100 ?
                    <button disabled>Disabled</button>
                    :
                    <button onClick={() => addToSeigh(item, index)}>Add</button>
                }
              </li>
            ))}
          </ol>
        </div>

        <div className="pie">
          {addData == 0 ? (
            <p>add some weight</p>
          ) : weight < 100 ? (
            <>
              <div>
                <p>{weight}</p>
                <Pie data={piedata} />
              </div>
            </>
          ) : (
            <div className="overload">
              <div className="overload-circle">
                <p>overloaded: {weight}kg</p>
              </div>
            </div>
          )}
        </div>

        <div className="addeditemlist">
          <div>
            <h1>Selected gifts</h1>
            <ol>
              {addData.map((item, index) => (
                <li key={index}>
                  <p>Name: {item.name}</p>
                  <p>Weight: {item.weight}</p>
                  <button onClick={() => removeFromSeigh(item, index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
