import React, {useEffect, useState} from 'react';

import {Box} from '@common'

import * as styles from './MapStyles'

export const Map = () => {

    const [Leaflet, setLeaflet] = useState<any>()

    useEffect(() => {
        const loadMap = async () => {
            setLeaflet(await import('react-leaflet'))
        }
        loadMap()
    }, [])

    return (
        <Box sx={styles.Map}>
            {Leaflet && (
                <Leaflet.MapContainer center={[44.94366, 19.61045]} zoom={13} scrollWheelZoom={false}>
                    <Leaflet.TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Leaflet.Marker position={[51.505, -0.09]}>
                        <Leaflet.Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Leaflet.Popup>
                    </Leaflet.Marker>
                </Leaflet.MapContainer>
            )}
        </Box>
    );
};