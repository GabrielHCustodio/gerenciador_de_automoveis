<template>
  <section :class="styles.listCard">
    <h2>Frota Cadastrada</h2>
    
    <div v-if="cars.length === 0" :class="styles.emptyState">
      <p>Nenhum automóvel cadastrado no momento.</p>
    </div>

    <div v-else :class="styles.tableContainer">
      <table :class="styles.customTable">
        <thead>
          <tr>
            <th>Marca/Modelo</th>
            <th>Cor</th>
            <th>Placa</th>
            <th>Ano</th>
            <th>Km Rodada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars" :key="car.id">
            <td>
              <strong :class="styles.mainText">{{ car.marca }}</strong>
              <span :class="styles.subtext">{{ car.modelo }}</span>
            </td>
            <td>{{ car.cor }}</td>
            <td><span :class="styles.badgePlaca">{{ car.placa }}</span></td>
            <td>{{ car.ano }}</td>
            <td>{{ Number(car.km).toLocaleString('pt-BR') }} Km</td>
            <td>
              <button @click="editCar(car)" :class="styles.btnIcon" title="Editar">✏️</button>
              <button @click="deleteCar(car.id)" :class="styles.btnIcon" title="Excluir">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
// Importando de volta o CSS Module externo corretamente
import styles from './ListCars.module.css'

defineProps({
  cars: {
    type: Array,
    required: true
  }
})

// Declarando os eventos de edição e exclusão para o pai (App.vue)
const emit = defineEmits(['edit-car', 'delete-car'])

const editCar = (car) => {
  emit('edit-car', car)
}

const deleteCar = (carId) => {
  emit('delete-car', carId)
}
</script>