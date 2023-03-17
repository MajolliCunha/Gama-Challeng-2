const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const criarEvento = {
    name: form.nome.value,
    poster: "link da imagem",
    attractions: form.atracoes.value.split(","),
    description: form.descricao.value,
    scheduled: new Date(form.data.value),
    number_tickets: form.lotacao.value,
  };

  console.log(" name -> " + form.nome.value);
  console.log(" atracoes -> " + form.atracoes.value.split(","));
  console.log(" desc -> " + form.descricao.value);
  console.log(" data -> " + new Date(form.data.value));
  console.log(" lot -> " + form.lotacao.value);

  const response = await createEvent(criarEvento);

  if (response.status != 201) {
    console.log(response.toString());
    console.log(response.url);
  } else {
    form.nome.value = "";
    form.atracoes.value = "";
    form.descricao.value = "";
    form.data.value = "";
    form.lotacao.value = "";
  }
});

async function createEvent(criarEvento) {
  try {
    const site = "https://soundgarden-api.vercel.app/events";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(criarEvento),
    };

    const response = await fetch(site, option);
    return await response;
  } catch (error) {
    console.log(error);
  }
}


