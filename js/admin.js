const eventsList = () => {
  return fetch(`https://soundgarden-api.vercel.app/events`).then((resposta) => {
    if (resposta.ok) {
      return resposta.json();
    }
    throw new Error("Não foi possível listar os eventos");
  });
};

const renderCards = async () => {
  try {
    const eventos = await eventsList();
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    let contador = 1;

    eventos.forEach((evento) => {
      console.log(
        evento.name,
        evento.scheduled,
        evento.attractions,
        evento.description
      );
      const tr = document.createElement("tr");

      tr.innerHTML =
        `
    <th scope="row">${contador}</th>
    <td>${getFormatDate(new Date(evento.scheduled))}</td>
    <td>${evento.name}</td>
    <td>${evento.attractions.join(", ")}</td>
    <td>
      <a href="reservas.html?id=`+ evento._id +`"class="btn btn-dark">ver reservas</a>
      <a href="editar-evento.html?id=` + evento._id +`" class="btn btn-secondary">editar</a>
      <a href="excluir-evento.html?id=` + evento._id +`" class="btn btn-danger">excluir</a>
    </td>`;

      tbody.appendChild(tr);
      contador++;
    });
  } catch (error) {
    console.log(error);
  }
};
function getFormatDate(inputDate) {
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  hour = inputDate.getHours();
  minute = inputDate.getMinutes();
  
  if (date < 10) {
    date = "0" + date;
  }

  if (month < 10) {
    month = "0" + month;
  }
 
  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}/${month}/${year} ${hour}:${minute}`
}
console.log(renderCards());
