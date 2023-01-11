import { useMemo } from "react";

export default function Legend ({ position }) {

  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }

  const legend = useMemo(
    () => (
      // delete bg-white
      <div className="w-32 px-4 py-3">
        <div className="flex justify-between mb-3">
          <span>범례</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="w-5 h-5 bg-blue-300 border-2 border-blue-600"></span>
          <span>value: 1</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="w-5 h-5 bg-blue-400 border-2 border-blue-600"></span>
          <span>value: 2</span>
        </div>
        <div className="flex justify-between">
          <span className="w-5 h-5 bg-blue-500 border-2 border-blue-600"></span>
          <span>value: 3</span>
        </div>
      </div>
    ),
    [],
  )

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{legend}</div>
    </div>
  )


}