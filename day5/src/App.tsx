import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

interface Task {
  elf: string
  task: TaskType
  minutesTaken: number
  date: string;
}

interface Details {
  name: string
  CREATED_TOY_TOTAL: number
  WRAPPED_PRESENT_TOTAL: number
  minutesTotalWorked: number
}


function App() {

  const [data, setData] = useState<Task[]>([]);
  const [elfs, setElfs] = useState<Set<string>>();
  const [elfsob, setElfsob] = useState<Details[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [currentElf, setCurrentElf] = useState<Task[]>([]);


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

function pagination(pageNumber: number) {
    const pagesize = 15;
    const startIndex = pageNumber * pagesize;
    const endIndex = startIndex + pagesize;
    const pagItems = currentElf.slice(startIndex, endIndex);

    console.log(pagItems)

}


  return (
    <>
      <h1>ELfs Dashboard</h1>
      <div className="card-div">

        {
          elfsob.map((item) => (
            <div className="cards"
              onClick={() => {
                setShowModal(true);
                setCurrentElf(data.filter((elfs) => elfs.elf == item.name));
                pagination(1)
              }}
            >
              <p className="center"><b>{item.name}</b></p>
              <p>Created toys total - <b>{item.CREATED_TOY_TOTAL}</b></p>
              <p>Wraped total toys - <b>{item.WRAPPED_PRESENT_TOTAL}</b></p>
            </div>
          ))
        }

        <div>
          {showModal && createPortal(
            <div className="modal">
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>task</th>
                    <th>minutestaken</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentElf.map((item) => (
                      <tr>
                        <td>{item.elf}</td>
                        <td>{item.task}</td>
                        <td>{item.minutesTaken}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <div className="pagni">
                <button

                >{`←`}</button>
              
                <button

                >{`→`}</button>
              </div>
  
              <button
                className="close"
                onClick={() => {
                  setShowModal(false);
                }}
              >x</button>
            </div>,
            document.body
          )}
        </div>

      </div>
    </>
  )
}


export default App
