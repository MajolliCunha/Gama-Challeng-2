const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const idEvent = urlParams.get("id");
console.log(idEvent);

const eventsList = (uuid) => {
    return fetch(`https://soundgarden-api.vercel.app/bookings/event/${uuid}`).then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error("Não foi possível listar os eventos");
    });
  };
  
  const renderCards = async () => {
    try {
      const eventos = await eventsList(idEvent);
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = "";
  
      let contador = 1;
  
      eventos.forEach((evento) => {
        console.log(
          evento.owner_name,
          evento.owner_email,
          evento.number_tickets,
          evento._id
        );
        const tr = document.createElement("tr");
  
        tr.innerHTML =
          `
      <th scope="row">${contador}</th>
      <td>${evento.owner_name}</td>
      <td>${evento.owner_email}</td>
      <td>${evento.number_tickets}</td>
      <td>${evento._id} 
      </td>`;

        tbody.appendChild(tr);
        contador++;

 let nomeEventoReserva = document.getElementById("nome-evento-reserva");
  nomeEventoReserva.innerHTML = "Evento: " + evento.event.name;
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(renderCards());

  