/** @format */

import { useEffect, useState } from "react";

function Plans() {
  let [subName, setSub] = useState("");
  let [taskTime, setTime] = useState(0);
  let [allSub, setAll] = useState([]);

  function setSchedule(e) {
    e.preventDefault();
    let tmp = [...allSub];
    tmp.push({
      Subject: subName,
      time: parseInt(taskTime),
    });
    setAll(tmp);
    // console.log(allSub);
    setSub("");
  }

  function increaseHour(idx) {
    let tmArr = [...allSub];
    tmArr[idx].time++;
    setAll(tmArr);
  }

  function decreaseHour(idx) {
    let tmArr = [...allSub];
    if (tmArr[idx].time > 0) tmArr[idx].time--;
    setAll(tmArr);
  }

  function removeSub(idx) {
    let tmArr = [];
    allSub.forEach((ele, index) => {
      if (idx !== index) tmArr.push(ele);
    });
    setAll(tmArr);
    if (tmArr.length < 1) localStorage.removeItem("arrayre");
  }

  useEffect(() => {
    if (allSub.length > 0) {
      localStorage.setItem("arrayre", JSON.stringify(allSub));
    }
  }, [allSub]);

  useEffect(() => {
    if (localStorage.getItem("arrayre")) {
      let temp = JSON.parse(localStorage.getItem("arrayre"));
      setAll(temp);
    }
  }, []);

  return (
    <>
      <div>
        <h1 className='text-4xl font-medium text-lime-700 text-center '>
          Geekster Education Planner
        </h1>
        <form
          action=''
          className='flex justify-center items-center gap-6 my-4'
          onSubmit={(e) => setSchedule(e)}
        >
          <input
            onChange={(e) => setSub(e.target.value)}
            type='text'
            name='subject'
            id='subject'
            className='p-2 border-2 border-blue-500'
            placeholder='Subject'
            value={subName}
          />
          <input
            onChange={(e) => setTime(e.target.value)}
            value={taskTime}
            min={0}
            type='number'
            name='time'
            id='time'
            className='p-2 border-2 border-blue-500 w-20'
            placeholder='Hours'
          />
          <button className='bg-blue-500 font-medium p-2 rounded-xl hover:bg-sky-400 hover:text-white'>
            Add
          </button>
        </form>
      </div>

      {allSub.map((ele, index) => (
        <div
          key={index}
          className='select-none grid-cols-5  grid gap-3 items-center mx-auto w-fit my-6 text-center font-medium'
        >
          <p className='bg-cyan-500 rounded-xl p-1'>{ele.Subject}</p>
          <button
            className='font-black rounded-full bg-red-600 w-8 h-8 hover:bg-pink-700 hover:text-white ml-2'
            onClick={() => decreaseHour(index)}
          >
            -
          </button>
          <p className='bg-indigo-500 rounded-xl p-1'>{ele.time}-Hours</p>
          <button
            className='rounded-full bg-green-600 w-8 h-8 hover:bg-lime-600 hover:text-white font-black ml-5'
            onClick={() => increaseHour(index)}
          >
            +
          </button>
          <button
            className='rounded-full bg-yellow-600 hover:bg-yellow-400 hover:text-white font-black ml-5 p-2'
            onClick={() => removeSub(index)}
          >
            Done
          </button>
        </div>
      ))}
    </>
  );
}

export default Plans;
