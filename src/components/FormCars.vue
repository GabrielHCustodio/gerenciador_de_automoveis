<template>
  <section :class="styles.formCard">
    <h2>{{ isEditing ? 'Editar Automóvel' : 'Cadastrar Novo Carro' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div :class="styles.group">
        <div :class="styles.formGroup">
          <label for="marca">Marca</label>
          <input type="text" id="marca" v-model="localCar.marca" placeholder="Ex: Volkswagen" required />
        </div>

        <div :class="styles.formGroup">
          <label for="modelo">Modelo</label>
          <input type="text" id="modelo" v-model="localCar.modelo" placeholder="Ex: Golf" required />
        </div>
      </div>

      <div :class="styles.formGrid3x">
        <div :class="styles.formGroup">
          <label for="cor">Cor</label>
          <input type="text" id="cor" v-model="localCar.cor" placeholder="Ex: Preto" required />
        </div>

        <div :class="styles.formGroup">
          <label for="placa">Placa</label>
          <input type="text" id="placa" v-model="localCar.placa" placeholder="ABC1D23" required />
        </div>

        <div :class="styles.formGroup">
          <label for="ano">Ano</label>
          <input type="number" id="ano" v-model="localCar.ano" placeholder="2024" required />
        </div>
      </div>

      <div :class="styles.formGroup">
        <label for="km">Quilometragem (Km rodada)</label>
        <input type="number" id="km" v-model="localCar.km" placeholder="Ex: 15000" required />
      </div>

      <div :class="styles.formActions">
        <button type="submit" :class="[styles.btn, styles.btnPrimary]">
          {{ isEditing ? 'Atualizar Dados' : 'Salvar Veículo' }}
        </button>
        <button type="button" v-if="isEditing" @click="handleCancel" :class="[styles.btn, styles.btnSecondary]">
          Cancelar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import styles from './FormCars.module.css'

const props = defineProps({
  carToEdit: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save-car', 'cancel-edit'])

const localCar = ref({
  marca: '',
  modelo: '',
  cor: '',
  placa: '',
  ano: '',
  km: ''
})

// Função declarada antes do watch para evitar erro de inicialização
const resetForm = () => {
  localCar.value = { marca: '', modelo: '', cor: '', placa: '', ano: '', km: '' }
}

// Monitora se o App.vue injetou um carro para edição
watch(() => props.carToEdit, (newCar) => {
  if (newCar) {
    localCar.value = { ...newCar }
  } else {
    resetForm()
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('save-car', { ...localCar.value })
  resetForm()
}

const handleCancel = () => {
  emit('cancel-edit')
  resetForm()
}
</script>