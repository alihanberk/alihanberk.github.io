import { useState } from "react";

function App() {
  const [hopi, setHopi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tel, setTel] = useState("");


  const getHopiUrl = async () => {
    setHopi(null);
    setLoading(true);
    const url = "https://test_api.kredim.com.tr/api/v1";
    const partnerReferanceId = "CFBF85FD-7BDC-411A-8782-47C6270190D5";

    const partnerLogin = await fetch(`${url}/Partner/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "CLIENT_CODE": 0,
        "CLIENTCODE": "string",
        "CLIENT_USERNAME": "Hopi",
        "CLIENT_PASSWORD": "Hopi",
        "DEVICE_INFO": "string",
        "VERIFICATION_METHOD": "string",
        "VERIFY_NUMBER": "string",
        "VERIFY_CODE": "string",
        "CLIENT_ROLE": "string"
      })
    }).then(x => x.json());

    const getMemberGsmMemberId = await fetch(`${url}/Partner/PartnerGetMemberIdByGSM?GSM=%2B9${tel}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${partnerLogin.resultObject.accessToken}`
      }
    }).then(x => x.json());

    const memberLoginToken = await fetch(`${url}/Partner/PartnerLoginWithMember`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${partnerLogin.resultObject.accessToken}`
      },
      body: JSON.stringify({
        "partnerReferanceId": partnerReferanceId,
        "memberId": getMemberGsmMemberId.resultObject
      })
    }).then(x => x.json());

    setHopi({
      tel,
      mid: getMemberGsmMemberId.resultObject,
      url: `https://test_member.kredim.com.tr?mid=${getMemberGsmMemberId.resultObject}&mlt=${memberLoginToken.resultObject.accessToken}`
    });
    setLoading(false);
  };

  const getFailToken = () => {
    setLoading(true);
    setTimeout(() => {
      setHopi({
        tel,
        mid: "e30f4fed-d56c-451a-82eb-22844574vjee",
        url: `https://test_member.kredim.com.tr?mid=e30f4fed-d56c-451a-82eb-22844574vjee&mlt=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoiekFKQnpkZ2JyWnpvRVRUUWtUZHVtTHp3aStoaWdzY0owQ1Q4V0lic0o5ZGNLcWFuczdzUjZIdGVMa0ZVZmd2SSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2RucyI6Ijo6ZmZmZjoxNzIuMjAuMTguMTAxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJZaGFBc2UweXhkdE5sK1ZDNzZLejM4aTdHVkZuZHVjcStjRm5Nc2JVZGtaTndIWVl1ZDltaEhaNDBuUzU4bVE3RVluSGpMUVVWT3RmeFlYMlQ4MmpsRWtqODJ3NGZXMlIwbVRSMzNSck1MQT0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy9hY3RvciI6IlNxalpZemJlVkVWSTI3SkwwTjdMODNoWEF4bFQrekFpLzJwTlg1Z1ByWFNDT2NMYllGOTI5aW1LTjV1NFFjRkNOVE5OQkFXWGtzQ2lCZVhlenlhNnJZWGZGQ2RQajIxZkxRZER0dUdENW40PSIsImV4cCI6MTY3NTk1Njk2MywiaXNzIjoiaHR0cDovL2FwaS5rcmVkaW0uY29tLnRyIiwiYXVkIjoiaHR0cDovL2FwaS5rcmVkaW0uY29tLnRyIn0.CxS6dHKEAgQ8eYnHzE9kor3Mv5VxKXvvqPxVMF8eLk1`
      });
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="App">
      <br />
      <label style={{ display: "block" }}>Kredim Üyesi Tel No: (Sıfır ile başlasın!!)</label>
      <input style={{ display: "inline-block" }} placeholder="Mesela 05534631945" value={tel} onChange={e => setTel(e.target.value)}></input>
      <button onClick={getHopiUrl}> İpek'e Url Oluştur</button>
      <button onClick={getFailToken}> Hatalı token Üret</button>
      <ul style={{ display: "inline-flex" }}> Bazı kullanıcılar --->
        <li style={{ cursor: "pointer", marginLeft: 40 }} onClick={e => setTel("05374055580")}>Sezer</li>
        <li style={{ cursor: "pointer", marginLeft: 40 }} onClick={e => setTel("05422253425")}>Köksal</li>
        <li style={{ cursor: "pointer", marginLeft: 40 }} onClick={e => setTel("05333918285")}>Aslı</li>
      </ul>
      {loading && <p>Yükeniyo bekle bi</p>}
      {
        hopi &&
        <div style={{ maxWidth: "85%", wordWrap: "break-word" }}>
          <p><b>Telefon numarası </b> <label style={{ display: "block" }}>{hopi.tel}</label></p>
          <p><b>MemberId </b> <label style={{ display: "block" }}>{hopi.mid}</label></p>
          <p><b>Url </b> <label style={{ display: "block" }}>{hopi.url}</label></p>
          <p><a href={hopi.url}>Hopi'den gidiyomuş gibi git</a></p>
        </div>
      }
    </div >
  );
}

export default App;
