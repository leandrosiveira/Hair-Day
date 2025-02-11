import { schedulesDay } from "./load.js"
import {  scheduleCancel } from "../../services/schedule-cancel.js"

const periods = document.querySelectorAll(".period")

// Gera evento click para cada lista (manhã, tarde e noite)
periods.forEach((period) => {
  // Captura o evento de clique no lista.
  period.addEventListener("click", async (event) => {
    if(event.target.classList.contains("cancel-icon")) {
      // Obtém a li pai do elemento clicado.
      const item = event.target.closest("li")
      // Pega o id do agendamento para remover.
      const { id } = item.dataset
      // o if com apenas o id, verifica se é true ou false
      // confirma se o usuario quer cancelar.
      if (id) {
        // o confirm () abre uma janela de dialogo.
        const isConfirm = confirm (
          "Tem certeza que deseja cancelar o agendamento?"
        )

        if (isConfirm){
          // faz a requisição na API para cancelar.
          await scheduleCancel({ id })
          // Recarrega os agendamentos
          schedulesDay()
        }
      }
    }
  })
})