import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Map() {
    const [mapdata, setmapdata] = useState('');
    const userha = mapdata.userHA
    const tag1 = mapdata.searchTag1
    const tag2 = mapdata.searchTag2

    useEffect(() => {
        const userid = sessionStorage.getItem('userinfo');
        const update_userid = userid.replace(/"/g, '');
        const mapData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/map', {
                    userId: update_userid
                })
                setmapdata(response.data);

            } catch (error) {
            }
        }
        mapData();
    }, []);

    return (
        <div>{userha} <br />{tag1}<br />{tag2}</div>
    )
}

export default Map