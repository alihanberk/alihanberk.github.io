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
  }

  return (
    <div className="App">
      <input placeholder="05534631945" value={tel} onChange={e => setTel(e.target.value)}></input>
      <button onClick={getHopiUrl}> İpek'e Url Oluştur</button>
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
    </div>
  );
}

export default App;
