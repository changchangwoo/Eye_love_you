import React, { useEffect, useState } from 'react';
import './temp.css';

function MyMap() {
    const [markers, setMarkers] = useState([]);
    const [homeAddress] = useState('서울특별시 도봉구');
    const [search1, setSearch1] = useState('서울특별시 도봉구 안과');
    const [search2, setSearch2] = useState('서울특별시 도봉구 안경원');
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(null);

    useEffect(() => {
        // 카카오 지도 초기화
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(kakaoMap);

        // 주소-좌표 변환 객체를 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 현재 주소로 좌표 검색
        geocoder.addressSearch(homeAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new window.kakao.maps.Marker({
                    position: coords,
                });
                marker.setMap(kakaoMap);

                // 인포윈도우로 현재 주소 설명 표시
                const infoWindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">반갑습니다.</div>',
                });
                infoWindow.open(kakaoMap, marker);
                setInfowindow(infoWindow);

                // 지도의 중심을 현재 주소로 이동
                kakaoMap.setCenter(coords);

                // 검색어로 주변 위치 데이터 표시
                searchPlaces();
            }
        });
    }, []);

    const searchPlaces = () => {
        const ps = new window.kakao.maps.services.Places();
        
        // 키워드로 장소를 검색하고 마커 표시
        ps.keywordSearch(search1, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const newMarkers = data.map((place, index) => ({
                    ...place,
                    marker: addMarker(place, index),
                }));
                setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
            }
        });

        ps.keywordSearch(search2, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const newMarkers = data.map((place, index) => ({
                    ...place,
                    marker: addMarker(place, index),
                }));
                setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
            }
        });
    };

    const addMarker = (place, idx, prevMarkers) => {
        // 이전 마커 제거
        if (prevMarkers && prevMarkers.length > 0) {
            prevMarkers.forEach((prevMarker) => {
                prevMarker.setMap(null);
            });
        }
    
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const imageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png`;
        const imageSize = new window.kakao.maps.Size(36, 37);
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
        const marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
        });
    
        marker.setMap(map);
        return marker;
    };
    

    const getListItem = (index, places) => {
        const el = document.createElement('li');
        el.innerHTML = `
            <span class="markerbg marker_${index + 1}"></span>
            <div class="info">
                <h5>${places.place_name}</h5>
                <span>${places.road_address_name || places.address_name}</span>
                <span class="tel">${places.phone}</span>
            </div>
        `;
        el.className = 'item';
        return el;
    };

    const displayInfowindow = (marker, title) => {
        const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
        infowindow.setContent(content);
        infowindow.open(map, marker);
    };

    const removeAllChildNodes = (el) => {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    };

    return (
        <div>
            <div id="map" style={{ width: '50%', height: '450px' }}></div>
            <div className="map_wrap">
                <div id="menu_wrap" className="bg_white">
                    <ul id="placesList" style={{ listStyle: 'none', padding: 0 }}>
                        {markers.map((marker, index) => (
                            <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0' }}>
                                <span className={`markerbg marker_${index + 1}`}></span>
                                <div className="info">
                                    <h5>{marker.place_name}</h5>
                                    <span>{marker.road_address_name || marker.address_name}</span>
                                    <span className="tel">{marker.phone}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div id="pagination"></div>
                </div>
            </div>
        </div>
    );
}

export default MyMap;
