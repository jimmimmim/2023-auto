import React, { useState, useEffect } from "react";

import seouluniv_1m from '../data/seouluniv1mpolygon.json';
import axios from 'axios';
import { polyline } from "leaflet";

export default function Calc() {

    const [data, setData] = useState(['']);

    useEffect(() => {
        axios
          .get('http://59.6.99.141:7500/robot-location')
          .then(res => {
            setData(res.data); 
          })
          .catch(err =>{
            console.log('Error');
          })
    }, []);

    // add polylines from server
    const polylines = [];

    // 잘못된 데이터 삭제(제거)
    for (let i = 0; i < data.length; i++) {
        let temp = [];
        if (data[i].length < 100) {
        data.splice(i, 1);
        i--;
        } else {
        for (let j = 0; j < data[i].length; j++) {
            const arr = [data[i][j].lat, data[i][j].lon];
            temp.push(arr);
        }
        polylines[i] = temp;
        }
    }

    // for (let i = 0; i < polylines.length; i++) {
    //     console.log('polyline ', i);
    //     for (let j = 0; j < polylines[i].length; j++) {
    //         // console.log(polylines[i][j]);
    //     }
    // }

    return (
        <>
        <div className="flex flex-col items-center">
            <h1>Convert LatLong values to Grid ID</h1>
            <div className="border border-indigo-500 w-max">
            {polylines.map((polyline,i) => 
                polyline.map((w, j) => {
                return (
                    <>
                        <div key={j} className="flex text-sm border-b border-indigo-400">
                            <h1>polyline #{i}</h1>
                            <div className="mx-8">{w[0]}, {w[1]}</div>
                            <div className="mr-8">gid: </div>
                        </div>
                    </>
                )
                })
            )}
            </div>
        </div>
        </>
    );
}