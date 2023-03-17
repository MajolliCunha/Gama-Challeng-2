const eventsList = () => {
  return fetch("https://soundgarden-api.vercel.app/events").then((resposta) => {
    if (resposta.ok) {
      return resposta.json();
    }
    throw new Error("Não foi possível listar os eventos");
  });
};

const renderCards = async () => {
  try {
    const eventos = await eventsList();
    const card = document.querySelector("#card");
    let html = "";
    eventos.forEach((evento) => {
      console.log(
        evento.name,
        evento.scheduled,
        evento.attractions,
        evento.description
      );

      html += `<article class="evento card p-5 m-3">
                      <h2>${evento.name} <br/> ${getFormatDate(
        new Date(evento.scheduled)
      )}</h2>
                      <h4>${evento.attractions}</h4>
                      <p>${evento.description}</p>
                      <a href="#" evento="${evento.name}" eventoId="${
        evento._id
      }" class="btn btn-primary btn-modal" id="reserva-btn">reservar ingresso</a>
                  </article>`;
    });

    card.innerHTML = html;

    const openModalButton = document.getElementsByClassName("btn-modal");

    for (let item of openModalButton) {
      item.addEventListener("click", () => {
        toggleModal();

        let nomeEventoModal = document.getElementById("eventDetailName");
        nomeEventoModal.innerHTML = "Evento: " + item.getAttribute("evento");

        const form = document.querySelector("form");

        form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const criarReserva = {
            owner_name: form.name.value,
            owner_email: form.email.value,
            number_tickets: form.tickets.value,
            event_id: item.getAttribute("eventoId"),
          };

          console.log("owner_name: " + form.name.value);
          console.log("owner_email: " + form.email.value);
          console.log("number_tickets: " + form.tickets.value);
          console.log("event_id: " + item.getAttribute("eventoId"));

          const response = await createReserva(criarReserva);

          if (response.status != 201) {
            console.log(response.toString());
            console.log(response.url);
          } else {
            form.name.value = "";
            form.email.value = "";
            form.tickets.value = "";
            alert("Reverva Enviada! Obrigado =)")
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

console.log(renderCards());

const closeModalButton = document.querySelector("#buttonexit");
const modal = document.querySelector("#open-modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

//Modal
[closeModalButton].forEach((el) => {
  console.log(el);
  el.addEventListener("click", () => {
    toggleModal();
  });
});

async function createReserva(criarReserva) {
  try {
    const site = "https://soundgarden-api.vercel.app/bookings";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(criarReserva),
    };

    const response = await fetch(site, option);
    return await response;
  } catch (error) {
    console.log(error);
  }
}

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

  return `${date}/${month}/${year} ${hour}:${minute}`;
}
