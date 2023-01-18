import React, { useState, useEffect } from 'react';

import PathHistory from './PathHistory';

export default function PathContainer({data, selectedRobots}) {

  // console.log(data);
  const [robots, setRobots] = useState(data); 
  // console.log(robots);
  
  useEffect(() => {
    setRobots(data);
  }, [data])
// 샘플 데이터
//   const [robots, setRobots] = useState([
//     {
//         "name": "Robot_01",
//         "original_id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F2023/01/02 11:27:20",
//         "id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F",
//         "date": "2023/01/02",
//         "time": "11:27:20",
//         "checked": false
//     },
//     {
//         "name": "Robot_02",
//         "original_id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F2023/01/12 14:53:07",
//         "id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F",
//         "date": "2023/01/12",
//         "time": "14:53:07",
//         "checked": false
//     },
//     {
//         "name": "Robot_03",
//         "original_id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F2023/01/12 15:14:11",
//         "id": "2D830BE8-0870-4AC5-AFA0-C1BDCDCA459F",
//         "date": "2023/01/12",
//         "time": "15:14:11",
//         "checked": false
//     },
//     {
//         "name": "Robot_04",
//         "original_id": "30FB9002-DA29-4C12-9823-ABB57979F99C2023/01/02 11:27:14",
//         "id": "30FB9002-DA29-4C12-9823-ABB57979F99C",
//         "date": "2023/01/02",
//         "time": "11:27:14",
//         "checked": false
//     },
//     {
//         "name": "Robot_05",
//         "original_id": "391A8DD1-B808-4C3A-BBD5-9A91538AAA8F2023/01/12 14:16:44",
//         "id": "391A8DD1-B808-4C3A-BBD5-9A91538AAA8F",
//         "date": "2023/01/12",
//         "time": "14:16:44",
//         "checked": false
//     },
//     {
//         "name": "Robot_06",
//         "original_id": "391A8DD1-B808-4C3A-BBD5-9A91538AAA8F2023/01/12 14:53:06",
//         "id": "391A8DD1-B808-4C3A-BBD5-9A91538AAA8F",
//         "date": "2023/01/12",
//         "time": "14:53:06",
//         "checked": false
//     },
//     {
//         "name": "Robot_07",
//         "original_id": "391A8DD1-B808-4C3A-BBD5-9A91538AAA8F2023/01/12 15:12:54",
//         "id": "391A8DD1-B808-4C3A-BBD5-9A91538AAA8F",
//         "date": "2023/01/12",
//         "time": "15:12:54",
//         "checked": false
//     },
//     {
//         "name": "Robot_08",
//         "original_id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C72023/01/02 11:27:17",
//         "id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C7",
//         "date": "2023/01/02",
//         "time": "11:27:17",
//         "checked": false
//     },
//     {
//         "name": "Robot_09",
//         "original_id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C72023/01/12 14:16:37",
//         "id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C7",
//         "date": "2023/01/12",
//         "time": "14:16:37",
//         "checked": false
//     },
//     {
//         "name": "Robot_10",
//         "original_id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C72023/01/12 14:53:05",
//         "id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C7",
//         "date": "2023/01/12",
//         "time": "14:53:05",
//         "checked": false
//     },
//     {
//         "name": "Robot_11",
//         "original_id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C72023/01/12 15:12:52",
//         "id": "81470D5A-BFC6-4F2D-AF62-E134CA9963C7",
//         "date": "2023/01/12",
//         "time": "15:12:52",
//         "checked": false
//     },
//     {
//         "name": "Robot_12",
//         "original_id": "8DFBFB25-C76B-4FCC-912E-593CA8AAB7E52023/01/12 14:53:06",
//         "id": "8DFBFB25-C76B-4FCC-912E-593CA8AAB7E5",
//         "date": "2023/01/12",
//         "time": "14:53:06",
//         "checked": false
//     },
//     {
//         "name": "Robot_13",
//         "original_id": "8DFBFB25-C76B-4FCC-912E-593CA8AAB7E52023/01/12 15:13:12",
//         "id": "8DFBFB25-C76B-4FCC-912E-593CA8AAB7E5",
//         "date": "2023/01/12",
//         "time": "15:13:12",
//         "checked": false
//     },
//     {
//         "name": "Robot_14",
//         "original_id": "F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F2023/01/12 14:53:06",
//         "id": "F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F",
//         "date": "2023/01/12",
//         "time": "14:53:06",
//         "checked": false
//     },
//     {
//         "name": "Robot_15",
//         "original_id": "F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F2023/01/12 15:12:55",
//         "id": "F9F6FBF6-B840-4E28-91FE-CB1DDA7EA97F",
//         "date": "2023/01/12",
//         "time": "15:12:55",
//         "checked": false
//     }
// ]);

  const [selected, setSelected] = useState([]);

  let componentClass = "";

  // 항목 삭제
  const removeItem = (name) => {
    setSelected(current =>
      current.filter(element => {
        return element !== name;
      }),
    );
  };

  // checked 해제 (false)
  const uncheckItem = (name) => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (name === robot.name) {
        robot.checked = !robot.checked;
        if (!robot.checked) {
          removeItem(robot.name);
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
  };
  

  // 체크박스 - 선택 및 해제
  const handleChange = name => {
    const copyRobots = [...robots];
    const modifiedRobots = copyRobots.map(robot => {
      if (name === robot.name) {
        robot.checked = !robot.checked;
        if (robot.checked) {
          setSelected([...new Set([...selected, robot.name])]); // 항목 추가
        } else {
          removeItem(robot.name); // 항목 삭제
        }
      }
      return robot;
    });
    setRobots(modifiedRobots);
  };

  
  selectedRobots(selected);
  
  return (
      <div className="justify-center px-6 text-lg text-left pt-7">
        <h1 className='py-3 pl-4 tracking-wide text-white uppercase bg-[#1F2834] min-w-[250px]'>경로 데이터</h1>
        <div id='dashboard-upper' className='flex flex-col overflow-auto h-80 bg-[#1F2834] min-w-[250px]'>
            {
              robots.map((v, i) => (
                <PathHistory key={i} robot={v} handleChange={handleChange} onClick={() => {uncheckItem(v);}}/>
              ))
            }
        </div>
        <div className='flex flex-wrap justify-start px-3 min-w-[260px] bg-[#1F2834]'>
        {
          // 로봇 번호순 정렬
          selected.sort().map((v, i) => (
          // selected.map((v, i) => (
            <button 
            key={i} 
            className={`px-3 py-1 mr-3 my-2 text-sm text-white rounded-full bg-gray-700 hover:bg-gray-900 ${componentClass}`}
            onClick={() => {uncheckItem(v);}}
            >{v}</button>
          ))
        }
        </div>
      </div>

  );
}