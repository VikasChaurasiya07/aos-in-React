import { useEffect, useState } from "react";

type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

interface Task {
  elf: string
  task: TaskType
  minutesTaken: number
  date: string;
}

function App() {

  const [data, setData] = useState<Task[]>([]);
  const [elfs, setElfs] = useState<Set<string>>();

  useEffect(() => {
    dataFetch();
  }, [])

  useEffect(() => {
    function names() {
      const elfnames: Set<string> = new Set();
      data.map((item) => {
        elfnames.add(item.elf);
      })
      setElfs(elfnames)
    }

    if (data.length > 0) {
      names()
    }

  }, [data])

  async function dataFetch() {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
    const resData = await res.json();
    setData(resData)
  }


  return (
    <>
    </>
  )
}

export default App
