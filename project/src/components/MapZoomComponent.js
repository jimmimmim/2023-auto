import { useMapEvent } from 'react-leaflet';

// zoom 레벨 출력 (current, max)
export default function MapZoomComponent() {

    // // zoom in-out 시에도 중심좌표 유지 - 서울시립대
    // const map = useMapEvent('zoom', () => {
    //   map.setView([37.58360620664327, 127.05843925233872]);
    // })

    const location = useMapEvent('click', () => {
        let currentZoom = location.getZoom();
        if (location.getZoom() === location.getMaxZoom()) {
            console.log('max zoom - ', currentZoom);
        }
        console.log('current zoomlevel: ', currentZoom);
    })
    return null;
}