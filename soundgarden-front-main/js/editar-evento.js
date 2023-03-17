const form = document.querySelector("form");

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const idEvent = urlParams.get("id");
console.log(idEvent);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const editarEvento = {
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

  const response = await editEvent(editarEvento,idEvent);

  if (response.status != 200) {
    console.log(response.toString());
    console.log(response.url);
    console.log(response.status)
  } else {
    alert("Evento Alterado!");
  }
});

async function editEvent(editEvento, uuid) {
  try {
    const site = `https://soundgarden-api.vercel.app/events/${uuid}`;
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editEvento),
    };

    const response = await fetch(site, option);
    return await response;
  } catch (error) {
    console.log(error);
  }
}

async function getEvent(uuid) {
  try {
    const site = `https://soundgarden-api.vercel.app/events/${uuid}`;
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(site, option);
    if (response.ok) {
      return response.json();
    }
    throw new Error("Não foi possível listar os eventos");
  } catch (error) {
    console.log(error);
  }
}

const getData = async () => {
  try {
    const evento = await getEvent(idEvent);
    
    console.log("fuking data -> "+evento.scheduled.substring(0, 19))

    form.nome.value = evento.name;
    form.banner.value = evento.poster;
    form.atracoes.value = evento.attractions;
    form.descricao.value = evento.description;
    form.dataevento.value = evento.scheduled.substring(0, 19);
    form.lotacao.value = evento.number_tickets;
  } catch (error) {
    console.log(error);
  }
};

console.log(getData());
