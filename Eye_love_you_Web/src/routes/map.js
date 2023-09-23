import React, { useEffect, useState } from 'react';
import './temp.css';

function MyMap() {
    const [markers, setMarkers] = useState([]);
    const [homeAddress] = useState('서울특별시 도봉구');
    const [search1, setSearch1] = useState('서울특별시 도봉구 안과');
    const [search2, setSearch2] = useState('서울특별시 도봉구 안경원');
    const [place_url, setPlaceurl] = useState(null);
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(new window.kakao.maps.InfoWindow({ content: '' }));

    useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        // 카카오 지도 초기화
        const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(kakaoMap);

        // 주소-좌표 변환 객체를 생성
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 현재 주소로 좌표 검색
        geocoder.addressSearch(homeAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    position: coords,
                });

                // 인포윈도우로 현재 주소 설명 표시
                const infoWindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:200px;text-align:center;padding:6px 0;">반갑습니다.</div>',
                });
                infoWindow.open(kakaoMap, marker);
                setInfowindow(infoWindow);

                // 지도의 중심을 현재 주소로 이동
                kakaoMap.setCenter(coords);

                // 검색어로 주변 위치 데이터 표시
                searchPlaces(kakaoMap); // kakaoMap을 인자로 넘김
            }
        });

        async function searchPlaces(map) { // map을 인자로 받음
            const ps = new window.kakao.maps.services.Places();

            // 키워드로 장소를 검색하고 마커 표시
            ps.keywordSearch(search1, async (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const newMarkers = await Promise.all(data.map(async (place, index) => ({
                        ...place,
                        marker: await addMarker(place, index, map), // map을 인자로 넘김
                    })));
                    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
                }
            });

            ps.keywordSearch(search2, async (data, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const newMarkers = await Promise.all(data.map(async (place, index) => ({
                        ...place,
                        marker: await addMarker(place, index, map), // map을 인자로 넘김
                    })));
                    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
                }
            });
        }

        async function addMarker(place, idx, map) {
            const position = new window.kakao.maps.LatLng(place.y, place.x);

            // 이미지 스프라이트 관련 설정
            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
            const imageSize = new window.kakao.maps.Size(36, 37);
            const spriteSize = new window.kakao.maps.Size(36, 691);
            const spriteOrigin = new window.kakao.maps.Point(0, (idx * 46) + 10);
            const offset = new window.kakao.maps.Point(13, 37);

            const imgOptions = {
                spriteSize: spriteSize,
                spriteOrigin: spriteOrigin,
                offset: offset
            };

            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

            const marker = new window.kakao.maps.Marker({
                position: position,
                image: markerImage,
            });

            marker.setMap(map);

            // 마커 클릭 이벤트 핸들러 추가
            window.kakao.maps.event.addListener(marker, 'click', function () {
                // 마커 클릭 시, 지도 중심을 마커로 이동
                map.setCenter(position);
                // 마커에 대한 상세 정보를 인포윈도우로 표시
                const content = `<div style="padding:5px;z-index:1;">${place.place_name}</div>`;
                setPlaceurl(place.place_url)

                infowindow.setContent(content);
                infowindow.open(map, marker);
            });

            return marker;
        }
    }, []);

    const handleMarkerClick = (index) => {
        // 클릭한 목록에 대한 마커 인덱스로 이동
        if (map && markers[index] && markers[index].marker) {
            const marker = markers[index].marker;
            const position = marker.getPosition();
            map.setCenter(position);

            // 해당 마커에 대한 정보를 인포윈도우로 표시
            const content = `<div style="padding:5px;z-index:1;">${markers[index].place_name}</div>`;
            console.log(markers[index].place_url)
            setPlaceurl(markers[index].place_url)
            console.log(place_url)
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    };

    return (
        <div>
            <div id="map" style={{ width: '50%', height: '450px' }}></div>
            <div className="map_wrap">
                <div id="menu_wrap" className="bg_white">
                    <ul id="placesList" style={{ listStyle: 'none', padding: 0 }}>
                        {markers.map((marker, index) => (
                            <li
                                key={index}
                                style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}
                                onClick={() => handleMarkerClick(index)} // 목록 클릭 이벤트 핸들러 추가
                            >
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
            <div>
                <h1>상세 정보</h1>
                <iframe
                    src={place_url}
                    width="100%"
                    height="800px"
                    title="Example iframe"
                ></iframe>
            </div>
        </div>
    );
}

export default MyMap;
