import { useEffect, useState } from "react";

type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

interface Task {
  elf: string
  task: TaskType
  minutesTaken: number
  date: string;
}

type Details = {
  name: string
  CREATED_TOY_TOTAL: number
  WRAPPED_PRESENT_TOTAL: number
  minutesTotalWorked: number
}

function App() {

  const [data, setData] = useState<Task[]>([]);
  const [elfs, setElfs] = useState<Set<string>>();
  const [elfsob, setElfsob] = useState<Details[]>([]);

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
      dataSetting()
    }

    function dataSetting() {
      let tmp: Details;
      const arr: Details[] = [];
      let totalcreated = 0;
      let totalwrap = 0;
      let minutesTotalWorked = 0;

      elfs?.forEach((item) => {
        data.map((element) => {

          if (element.elf == item && element.task == 'CREATED_TOY') {
            totalcreated++;
          minutesTotalWorked = minutesTotalWorked + element.minutesTaken;
          }


          if (element.elf == item && element.task == 'WRAPPED_PRESENT') {
            totalwrap++; 
            minutesTotalWorked = minutesTotalWorked + element.minutesTaken;
          }
          
        })

        tmp = {
          name: item,
          CREATED_TOY_TOTAL: totalcreated,
          WRAPPED_PRESENT_TOTAL: totalwrap,
          minutesTotalWorked: minutesTotalWorked,
        }
        arr.push(tmp)
        totalcreated = 0;
        totalwrap = 0;
        minutesTotalWorked = 0;
      })


      setElfsob([...arr])

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
      <div className="card-div">
        {
          elfsob.map((item) => (
            <div className="cards">
              <p className="center"><b>{item.name}</b></p>
              <p>Created toys total - <b>{item.CREATED_TOY_TOTAL}</b></p>
              <p>Wraped total toys - <b>{item.WRAPPED_PRESENT_TOTAL}</b></p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
