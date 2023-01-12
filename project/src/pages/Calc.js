// import React, { useState, useEffect } from "react";
// import axios from 'axios';

// import seouluniv_1m from '../data/seouluniv1mpolygon.json';
// import seouluniv_10m from '../data/seouluniv10104326.json';
// // import { polyline } from "leaflet";

// export default function Calc() {

//     const [data, setData] = useState(['']);

//     useEffect(() => {
//         axios
//           .get('http://59.6.99.141:7500/robot-location')
//           .then(res => {
//             setData(res.data); 
//           })
//           .catch(err =>{
//             console.log('Error');
//           })
//     }, []);

//     // add polylines from server
//     const polylines = [];

//     // 잘못된 데이터 삭제(제거)
//     for (let i = 0; i < data.length; i++) {
//         let temp = [];
//         if (data[i].length < 100) {
//         data.splice(i, 1);
//         i--;
//         } else {
//         for (let j = 0; j < data[i].length; j++) {
//             const arr = [data[i][j].lat, data[i][j].lon];
//             temp.push(arr);
//         }
//         polylines[i] = temp;
//         }
//     }

//     // console.log(seouluniv_10m.features.length);
//     // console.log(polylines[0].length);

//     // // for (let i = 0; i < polylines.length; i++) { // 3
//     //     // console.log(polylines[i]);

        
//     //     for (let j = 0; j < polylines[0].length; j++) {
//     //         // console.log(polylines[0][j]);

//     //         for (let k = 0; k < seouluniv_10m.features.length; k++) {

//     //             console.log(seouluniv_10m.features[k].properties['top']);
    
//     //             if (
//     //                 polylines[0][0] < seouluniv_10m.features[k].properties['top']
//     //             //  && polylines[0][0] > seouluniv_10m.features[k].properties['bottom']
//     //             //  && polylines[0][1] > seouluniv_10m.features[k].properties['left']
//     //             //  && polylines[0][1] > seouluniv_10m.features[k].properties['right']
//     //              ) {
//     //                 console.log('gid: ', seouluniv_10m.features[k].properties['id']);
//     //             } 
//     //         }
//     //     }


//     // }

//     // latlong to gid
//     // for (let i = 0; i < seouluniv_10m.features.length; i++) {
//     //     console.log(seouluniv_10m.features[i].properties['top']);
//     // }

//     return (
//         <>
//         <div className="flex flex-col items-center">
//             <h1>Convert LatLong values to Grid ID</h1>
//             <div className="border border-indigo-500 w-max">
//             {polylines.map((polyline,i) => 
//                 polyline.map((w, j) => {
//                 return (
//                     <>
//                         <div key={j} className="flex text-sm border-b border-indigo-400">
//                             <h1>polyline #{i}</h1>
//                             <div className="mx-8">{w[0]}, {w[1]}</div>
//                             <div className="mr-8">gid: </div>
//                         </div>
//                     </>
//                 )
//                 })
//             )}
//             </div>
//         </div>
//         </>
//     );
// }