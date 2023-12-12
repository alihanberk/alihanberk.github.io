import { useState } from "react";
import { v4 } from "uuid";

function App() {
  const [hopi, setHopi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [account, setAccount] = useState({ id: null, url: null });
  const [tel, setTel] = useState("");
  const url = "https://api.kredim.com.tr/api/v1";
  const partnerReferanceId = "17DE3642-F0A7-46F5-BC6B-906B7055FF74";

  const getHopiUrl = async () => {
    setHopi(null);
    setLoading(true);
    setError(false)

    if (!tel) {
      setTimeout(() => {

        setLoading(false);
        setError("Numara girilmemiş");
      }, 1000);
      return;
    }

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
        "CLIENT_PASSWORD": "Hopi*-Kredim_0315",
        "DEVICE_INFO": "string",
        "VERIFICATION_METHOD": "string",
        "VERIFY_NUMBER": "string",
        "VERIFY_CODE": "string",
        "CLIENT_ROLE": "string"
      })
    }).then(x => x.json());

    const getMemberGsmMemberId = await fetch(`${url}/Partner/PartnerGetMemberIdByGSM?GSM=%2B90${tel}`, {
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
      url: `https://uatmember.kredim.com.tr?mid=${getMemberGsmMemberId.resultObject}&mlt=${memberLoginToken.resultObject.accessToken}`
    });
    setLoading(false);
  };

  const getFailToken = () => {
    setLoading(true);
    setTimeout(() => {
      setHopi({
        tel,
        mid: "e30f4fed-d56c-451a-82eb-22844574vjee",
        url: `https://uatmember.kredim.com.tr?mid=e30f4fed-d56c-451a-82eb-22844574vjee&mlt=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoiekFKQnpkZ2JyWnpvRVRUUWtUZHVtTHp3aStoaWdzY0owQ1Q4V0lic0o5ZGNLcWFuczdzUjZIdGVMa0ZVZmd2SSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2RucyI6Ijo6ZmZmZjoxNzIuMjAuMTguMTAxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJZaGFBc2UweXhkdE5sK1ZDNzZLejM4aTdHVkZuZHVjcStjRm5Nc2JVZGtaTndIWVl1ZDltaEhaNDBuUzU4bVE3RVluSGpMUVVWT3RmeFlYMlQ4MmpsRWtqODJ3NGZXMlIwbVRSMzNSck1MQT0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy9hY3RvciI6IlNxalpZemJlVkVWSTI3SkwwTjdMODNoWEF4bFQrekFpLzJwTlg1Z1ByWFNDT2NMYllGOTI5aW1LTjV1NFFjRkNOVE5OQkFXWGtzQ2lCZVhlenlhNnJZWGZGQ2RQajIxZkxRZER0dUdENW40PSIsImV4cCI6MTY3NTk1Njk2MywiaXNzIjoiaHR0cDovL2FwaS5rcmVkaW0uY29tLnRyIiwiYXVkIjoiaHR0cDovL2FwaS5rcmVkaW0uY29tLnRyIn0.CxS6dHKEAgQ8eYnHzE9kor3Mv5VxKXvvqPxVMF8eLk1`
      });
      setLoading(false);
    }, 1000);
  }

  const getAccountIdUrl = () => {
    setLoading(true);
    setTimeout(async () => {
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
          "CLIENT_PASSWORD": "Hopi*-Kredim_0315",
          "DEVICE_INFO": "string",
          "VERIFICATION_METHOD": "string",
          "VERIFY_NUMBER": "string",
          "VERIFY_CODE": "string",
          "CLIENT_ROLE": "string"
        })
      }).then(x => x.json());
      setAccount({
        id: account.id,
        url: `https://uatmember.kredim.com.tr?aid=${account.id}&pt=${partnerLogin.resultObject.accessToken}`
      });
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="App">
      <br />
      <label style={{ display: "block" }}>Telefon No: (Başında sıfır olmadan)</label>
      <input style={{ display: "inline-block" }} placeholder="Örn: 5554443322" value={tel} onChange={e => setTel(e.target.value)}></input>
      <button onClick={getHopiUrl}> Url Oluştur</button>
      <button onClick={getFailToken}> Hatalı token Üret</button>
      <br /> <br />
      <label style={{ display: "block" }}>Account Id ile süreç başlat:</label>
      <input style={{ display: "inline-block" }} placeholder="Örn: e30f4fed-d56c-451a-82eb-22844574vjee" value={account.id} onChange={e => setAccount({ id: e.target.value })}></input>
      <button onClick={getAccountIdUrl}> Account Id ile Url Oluştur</button>
      <p><a href={`https://uatmember.kredim.com.tr?aid=${v4()}`}>Random AccountId ile Bilgi Toplama Ekranı'nı aç</a></p>

      {loading && <p>Yükeniyor</p>}
      {error && <p>{error}</p>}
      {
        hopi &&
        <div style={{ maxWidth: "85%", wordWrap: "break-word" }}>
          <p><b>Telefon numarası </b> <label style={{ display: "block" }}>{hopi.tel}</label></p>
          <p><b>MemberId </b> <label style={{ display: "block" }}>{hopi.mid}</label></p>
          <p><b>Url </b> <label style={{ display: "block" }}>{hopi.url}</label></p>
          <p><a href={hopi.url}>Hopi'den gidiyomuş gibi git</a></p>
        </div>
      }
      {
        account.url &&
        <div style={{ maxWidth: "85%", wordWrap: "break-word" }}>
          <p><b>AccountId </b> <label style={{ display: "block" }}>{account.id}</label></p>
          <p><b>Url </b> <label style={{ display: "block" }}>{account.url}</label></p>
          <p><a href={account.url}>Hopi'den gidiyomuş gibi git</a></p>
        </div>
      }
    </div >
  );
}

export default App;
