import { useState } from "react"
import { useEffect } from "react"

function App() {

  const [data, setData] = useState();
  const [catagories, setCatagories] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchFilterData, setSearchFilterData] = useState("");

  useEffect(() => {
    datafetch();
  }, [])

  async function datafetch() {
    const data = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
    const res = await data.json();
    setData([...res]);
    setFilterData([...res]);
  }

  useEffect(() => {
    searchName();
  }, [searchFilterData])

  useEffect(() => {
    searchCatagories();
  }, [catagories])


  function searchCatagories() {
    if (catagories === "Naughty") {
      const naughty = data && data.filter(element => element.tally < 0);
      setFilterData(naughty);
    } else if (catagories === "Nice") {
      const nice = data && data.filter(element => element.tally > 0)
      setFilterData(nice);
    } else {
      setFilterData(data);
    }
  }

  function searchName() {
    const searchnamedata = data && data.filter(
      element => element.name.toLocaleLowerCase()
        .includes(searchFilterData.toLocaleLowerCase())
    );

    setFilterData(searchnamedata);
  }


  return (
    <>
      <div className="container">
        <div>
          <form>
            <label htmlFor="search">
              Search Name:
              <input type="text" name="search" id="search"
                onChange={e => {
                  setSearchFilterData(e.target.value);
                  searchName()
                }}
              />
            </label>

            <label htmlFor="catagories">
              Search Catagories:
              <select name="catagories" id="catagories"
                onChange={e => {
                  setCatagories(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="Nice">Nice</option>
                <option value="Naughty">Naughty</option>
              </select>
            </label>
          </form>
        </div>
        <table>
          <tr>
            <th>Name's</th>
            <th>Tally</th>
            <th>Naughty or Nice</th>
          </tr>
          <List data={filterData} />
        </table>
      </div>
    </>
  )
}

export default App

function List(params) {
  return (
    <>
      {params.data != 0 ?
        params.data && params.data.map((element, index) => (
          <>
            <tr key={index}>
              <td>{element.name}</td>
              <td>{element.tally}</td>
              <td>{element.tally < 0 ? <Naughty /> : <Nice />}</td>
            </tr>
          </>
        )) :
        <tr>
          <td>Not Found</td>
          <td>-</td>
          <td>-</td>
        </tr>
      }
    </>
  )
}

function Naughty() {

  return (
    <div>
      <button className="naughty">
        Naughty
      </button>
    </div>
  )
}

function Nice() {

  return (
    <div>
      <button className="nice">
        Nice
      </button>
    </div>
  )
}
