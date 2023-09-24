useEffect(() => {
    const userid = sessionStorage.getItem('userinfo');
    const mapData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/map', {
                userId: update_userid
            })
            setmapdata(response.data);

        } catch (error) {
        }
    }
    if (userid) {
        const temp = userid.replace(/"/g, '');
        setUpdate_userid(temp)
        mapData();
    } else {
        navigate("/login");
    }
}, [navigate, update_userid]);

return (
    <div>{userha} <br />{tag1}<br />{tag2}</div>
)
} // 서버에서 데이터를 받는 코드


const [homeAddress, sethomeAddress] = useState(sessionStorage.getItem('usermap'));
const [search1, setSearch1] = useState(sessionStorage.getItem('usermap') + ' 안과');
const [search2, setSearch2] = useState(sessionStorage.getItem('usermap') + ' 안경원');