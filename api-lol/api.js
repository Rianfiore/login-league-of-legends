const apiData = {
  base_url: "https://br1.api.riotgames.com",
  api_key: "RGAPI-f2630aeb-2b20-4a06-8a3c-01b1fcfb1e1d",
  end_points: {
    summoner: "/lol/summoner/v4/summoners/by-name/",
  },
};

export function api(endPoint, payload) {
  switch (endPoint) {
    case "summoner":
      getSummonerRequest();
      break;
    default:
      break;
  }

  async function getSummonerRequest() {
    const url = `${apiData.base_url}${apiData.end_points.summoner}${payload.nickname}?api_key=${apiData.api_key}`;
    const data = await fetch(url).then((res) => res.json());

    console.log(data, payload);
  }
}
