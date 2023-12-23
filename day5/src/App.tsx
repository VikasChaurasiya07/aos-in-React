import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    datafetch();
  }, [])

  async function datafetch() {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
    const response = await res.json();
    setData([response]);
    console.log(data);
  }

  return (
    <>
    </>
  )
}

export default App
