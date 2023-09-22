import React, { useState, useEffect } from 'react';

function AddressSearch() {
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    useEffect(() => {
        // Daum Postcode 서비스 스크립트 동적으로 추가
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        script.onload = handleScriptLoad;
        document.body.appendChild(script);

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            document.body.removeChild(script);
        };
    }, []);

    const handleScriptLoad = () => {
        // Daum Postcode 스크립트가 로드된 후 실행될 코드
    };

    const handleComplete = (data) => {
        let addr = '';
        if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
        } else {
            addr = data.jibunAddress;
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById('sample6_address').value = addr;
        document.getElementById('sample6_detailAddress').focus();
    };

    const execDaumPostcode = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: handleComplete,
            }).open();
        } else {
            console.error('Daum Postcode script not loaded.');
        }
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button onClick={execDaumPostcode}>주소 검색</button>
            <br />
            <input
                type="text"
                id="sample6_postcode"
                placeholder="우편번호"
                value={postcode}
            />
            <br />
            <input
                type="text"
                id="sample6_address"
                placeholder="주소"
                value={address}
            />
            <br />
            <input
                type="text"
                id="sample6_detailAddress"
                placeholder="상세주소"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
            />
        </div>
    );
}

export default AddressSearch;
