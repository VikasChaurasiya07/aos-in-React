import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [elfcur, setElfCur] = useState<Details>({});

  const [showModal, setShowModal] = useState(false);
  const [currentElf, setCurrentElf] = useState<Task[]>([]);
  const [pageelf, setPageelf] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [dasboard, setDasboard] = useState(true);

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


  useEffect(() => {
    function pagination() {
      const pagesize = 12;
      const startIndex = currentPage * pagesize;
      const endIndex = startIndex + pagesize;
      const pagItems = currentElf.slice(startIndex, endIndex);

      setPageelf(pagItems)
    }

    pagination()
  }, [currentElf, currentPage])

  async function dataFetch() {
    const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
    const resData = await res.json();
    setData(resData)
  }


  const chartdata = {
    labels: ['Created Total', 'Wapped Total'],
    datasets: [
      {
        label: '# of Votes',
        data: [elfcur.CREATED_TOY_TOTAL, elfcur.WRAPPED_PRESENT_TOTAL],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
        ],
        borderColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };


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
                setCurrentPage(0)
                setElfCur(item)
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
              <span
                onClick={() => {
                  setDasboard(true)
                }}
              >Dasboard</span>

              <span
                onClick={() => {
                  setDasboard(false)
                }}
              >Data</span>

              {
                dasboard ?

                  <>
                    <h2>{elfcur.name}</h2>
                    <div className="details-wrapper">

                      <div className="details-work">
                        <p>Total Toys created - {elfcur.CREATED_TOY_TOTAL}</p>
                        <p>Total Wrap Presents - {elfcur.WRAPPED_PRESENT_TOTAL}</p>
                        <p>Total Minutes Worked - {elfcur.minutesTotalWorked}</p>
                      </div>

                      <div className="details-chart">
                        <Doughnut data={chartdata} />
                      </div>

                    </div>
                  </>
                  :
                  <>
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
                          pageelf.map((item) => (
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
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage == 0}
                      >{`←`}</button>

                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={pageelf.length + 1 < 12}
                      >{`→`}</button>
                    </div>
                  </>
              }

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
