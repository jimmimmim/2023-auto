import  { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

// return location at which the click occurred
export default function LocationFinder() {

    const [location, setLocation] = useState('');

    const map = useMapEvents({
        click(e) {
            // console.log(e.latlng);
            setLocation(e.latlng);
            if (location.lat) {
                console.log('lat: ', location.lat);
                console.log('lng: ', location.lng);
            }
        },
    });

    return null;
};