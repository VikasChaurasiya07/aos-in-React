import { useState } from "react";
import { useEffect } from "react"
import { Doughnut } from "react-chartjs-2";

function App() {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    dataFetch()
  }, [])

  async function dataFetch() {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
    const data = await res.json();
    setData([...data]);
    const weightdata = data.map((item) => item.weight);
    setWeight([...weightdata]);
  }

  function addToSeigh(params, index) {
    setAddData([...addData, params])
    const newdata = data.filter((_, i) => i != index);
    setData([...newdata]);
  }


  function removeFromSeigh(params, index) {
    setData([...data, params])
    const newdata = addData.filter((_, i) => i != index);
    setAddData([...newdata]);
  }

  let a = 0;
  weight.forEach(item => {
    a = a + item;
  })

  const weightTotal = a;

  return (
    <>
      <div className="container">
        <div className="datalist">
          <ol>
            {
              data.map((item, index) => (
                <li key={index}>
                  <p>Name: {item.name}</p>
                  <p>Weight: {item.weight}</p>
                  <button onClick={() => addToSeigh(item, index)}>Add</button>
                </li>
              ))
            }
          </ol>
        </div>

        <div className="addeditemlist">
          <ol>
            {
              addData.map((item, index) => (
                <li key={index}>
                  <p>Name: {item.name}</p>
                  <p>Weight: {item.weight}</p>
                  <button onClick={() => removeFromSeigh(item, index)}>Remove</button>
                </li>
              ))
            }
          </ol>

          <p>Total weight: {weightTotal}</p>
        </div>

        {/* <Doughnut  /> */}
      </div>
    </>
  )
}

export default App