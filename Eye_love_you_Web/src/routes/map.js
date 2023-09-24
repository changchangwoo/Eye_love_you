import React, { useEffect, useState } from 'react';
import './temp.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import exampleImage from '../imgs/cat_smile.png'; // 이미지 파일 경로를 지정합니다.


function MyMap() {
    const [markers, setMarkers] = useState([]);
    const homeAddress = (sessionStorage.getItem('usermap') || '').replace(/"/g, '');
    const search = ((sessionStorage.getItem('usermap') || '').replace(/"/g, '') + ' 안과');
    const [place_url, setPlaceurl] = useState(null);
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(new window.kakao.maps.InfoWindow({ content: '' }));
    const navigate = useNavigate();
    const [hover_flag, setHover] = useState(0);

    useEffect(() => {
        const userid = sessionStorage.getItem('userinfo');
        if (userid) {

            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            const kakaoMap = new window.kakao.maps.Map(mapContainer, mapOption);
            searchPlaces(kakaoMap);

            setMap(kakaoMap);
            displayCurrentLocationOnMap(kakaoMap, homeAddress, setInfowindow);

        } else {
            alert('로그인이 필요한 서비스입니다.');
            navigate("/login");
        }
    }, []);

    function searchPlaces(map) {
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(search, async (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const newMarkers = await Promise.all(data.map(async (place, index) => ({
                    ...place,
                    marker: await addMarker(place, index, map),
                })));
                setMarkers(newMarkers);
            }
        });
    }

    function addMarker(place, idx, map) {
        const position = new window.kakao.maps.LatLng(place.y, place.x);

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

        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            const content = `<div style="padding:5px;z-index:1;">${place.place_name}</div>`;
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });

        // 마커에 마우스 아웃 이벤트 추가 (선택 사항)
        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            if (hover_flag === 0) {
                infowindow.close();
            }
        });

        window.kakao.maps.event.addListener(marker, 'click', function () {
            setHover(1);
            console.log(hover_flag)
            map.setCenter(position);
            const content = `<div style="padding:5px;z-index:1;">${place.place_name}</div>`;
            setPlaceurl(place.place_url)
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });

        return marker;
    }

    const handleMarkerClick = (index) => {
        if (map && markers[index] && markers[index].marker) {
            const marker = markers[index].marker;
            const position = marker.getPosition();
            map.setCenter(position);
            const content = `<div style="padding:5px;z-index:1;">${markers[index].place_name}</div>`;
            setPlaceurl(markers[index].place_url)
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    }

    function displayCurrentLocationOnMap(map, homeAddress, setInfowindow) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(homeAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 새로운 마커 이미지 URL (문자열 형태로 이미지 경로 전달)
                const imageSrc = exampleImage;
                console.log(exampleImage);

                const imageSize = new window.kakao.maps.Size(60, 60);
                const imgOptions = new window.kakao.maps.Point(40, 70);

                const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

                const marker = new window.kakao.maps.Marker({
                    position: coords,
                    image: markerImage, // 새로운 마커 이미지 설정
                });
                marker.setMap(map);

                const infoWindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:200px;text-align:center;padding:6px 0;">현재위치</div>',
                });
                infoWindow.open(map, marker);
                setInfowindow(infoWindow);
                map.setCenter(coords);
            }
        });
    }


    return (
        <div className='MapContents'>
            <div className='Mapstyle'>
                <div className='WebBlink_Text_main Text_Medium'>
                    아이 러브 유
                </div>
                <div className='Logo_Text_sub Text_Large'>
                    주변 안과/안경원 검색
                    <br />
                </div>
                <div className='WebBlink_Box'>
                    <div className='Map_Box_Left'>
                        <div id="map"></div>
                        <div className="map_wrap" style={{ height: '95%' }}>
                            <div id="menu_wrap" style={{ height: '100%' }}>
                                <Button
                                    variant="light"
                                    className='Nav_login'
                                    style={{ backgroundColor: '#2F2E41', color: 'white', marginBottom: '10px', width: '200px' }}
                                    onClick={() => displayCurrentLocationOnMap(map, homeAddress, setInfowindow)}
                                >
                                    내 위치 찾기
                                </Button>

                                <ul id="placesList" style={{ listStyle: 'none', padding: 0, }}>
                                    {markers.map((marker, index) => (
                                        <li
                                            key={index}
                                            style={{ padding: '20px 0', borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}
                                            onClick={() => handleMarkerClick(index)}
                                        >
                                            <span className={`markerbg marker_${index + 1}`}></span>
                                            <div className="info">
                                                <h5 style={{ fontSize: '20px' }}>{marker.place_name}</h5>
                                                <span>{marker.road_address_name || marker.address_name}</span>
                                                <br />
                                                <span className="tel">{marker.phone}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div id="pagination"></div>
                            </div>
                        </div>
                    </div>
                    <div className='Map_Box_Right'>
                        <div className='currentMap_info'> 현재위치 - {homeAddress} </div>
                        <div className="Input_Form">
                            <Form.Control className='Input_Form_text' size="lg" type="text" placeholder="위치를 검색하세요" />
                        </div>
                        <iframe
                            className='detailMap'
                            src={place_url}
                            title="Example iframe"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyMap;
