const apiData = {
  base_url: "https://br1.api.riotgames.com",
  api_key: "RGAPI-51ba6f6d-c476-4092-b79f-37504253e916",
  end_points: {
    summoner: "/lol/summoner/v4/summoners/by-name/",
  },
};

export async function api(endPoint, payload) {
  switch (endPoint) {
    case "summoner":
      return await getSummonerRequest();
    default:
      console.log("Erro: endpoint não encontrado.");
      break;
  }

  async function getSummonerRequest() {
    const url = `${apiData.base_url}${apiData.end_points.summoner}${payload.nickname}?api_key=${apiData.api_key}`;
    const data = await fetch(url)
      .then(() => true)
      .catch(() => {
        alert(
          "Apelido no jogo não encontrado. Por favor, desmarque a opção ou digite o apelido corretamente!"
        );

        return false;
      });

    return data;
  }
}
