<template>
  <div class="app-global-container">
    <Navbar 
      :current-tab="currentTab" 
      @change-tab="handleTabChange" 
    />

    <main class="main-content">
      <ListCars 
        v-if="currentTab === 'list'" 
        :cars="cars" 
        @edit-car="handleEditCar" 
        @delete-car="handleDeleteCar" 
      />

      <FormCars 
        v-if="currentTab === 'form'" 
        :car-to-edit="carToEdit" 
        :is-editing="isEditing" 
        @save-car="handleSaveCar" 
        @cancel-edit="handleCancelEdit" 
      />
    </main>

    <NotificationModal 
      :is-open="modalConfig.isOpen"
      :message="modalConfig.message"
      :type="modalConfig.type"
      @close="closeModal"
      @confirm-action="executeDeleteCar"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { carrosCollection } from './firebase' 
import { addDoc, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import Navbar from './components/Navbar.vue'
import ListCars from './components/ListCars.vue'
import FormCars from './components/FormCars.vue'
import NotificationModal from './components/NotificationModal.vue'

const currentTab = ref('form') 
const isEditing = ref(false)   
const carToEdit = ref(null)    
const carIdToDelete = ref(null)

const modalConfig = ref({
  isOpen: false,
  message: '',
  type: 'success'
})

const cars = ref([])

const triggerModal = (message, type = 'success') => {
  modalConfig.value = {
    isOpen: true,
    message: message,
    type: type
  }
}

const closeModal = () => {
  modalConfig.value.isOpen = false
  carIdToDelete.value = null
}

onMounted(() => {
  onSnapshot(carrosCollection, (snapshot) => {
    const listaCarrosProvisoria = []
    snapshot.forEach((docSnap) => {
      listaCarrosProvisoria.push({ id: docSnap.id, ...docSnap.data() })
    })
    cars.value = listaCarrosProvisoria
  })
})

const handleTabChange = (tabName) => {
  currentTab.value = tabName
  if (tabName === 'form' && !isEditing.value) {
    carToEdit.value = null
  }
}

const handleEditCar = (car) => {
  carToEdit.value = car
  isEditing.value = true
  currentTab.value = 'form' 
}

const handleCancelEdit = () => {
  isEditing.value = false
  carToEdit.value = null
  currentTab.value = 'list' 
}

const handleDeleteCar = (carId) => {
  carIdToDelete.value = carId
  triggerModal('Tem certeza de que deseja excluir este automóvel da frota?', 'confirm')
}

const executeDeleteCar = async () => {
  if (!carIdToDelete.value) return

  try {
    const carroDocumentoRef = doc(carrosCollection, carIdToDelete.value)
    await deleteDoc(carroDocumentoRef)
    
    closeModal()
    setTimeout(() => {
      triggerModal('Veículo removido da frota com sucesso!', 'delete')
    }, 100)
    
  } catch (error) {
    console.error("Erro ao deletar documento: ", error)
    closeModal()
    triggerModal('Erro ao tentar remover o veículo.', 'error')
  }
}

const handleSaveCar = async (carData) => {
  try {
    if (isEditing.value) {
      const carroDocumentoRef = doc(carrosCollection, carToEdit.value.id)
      await updateDoc(carroDocumentoRef, {
        marca: carData.marca,
        modelo: carData.modelo,
        cor: carData.cor,
        placa: carData.placa,
        ano: Number(carData.ano),
        km: Number(carData.km)
      })
      triggerModal('Dados do automóvel atualizados com sucesso!', 'update')
    } else {
      await addDoc(carrosCollection, {
        marca: carData.marca,
        modelo: carData.modelo,
        cor: carData.cor,
        placa: carData.placa,
        ano: Number(carData.ano), 
        km: Number(carData.km),   
        criadoEm: new Date()      
      })
      triggerModal('Automóvel cadastrado com sucesso!', 'success')
    }

    isEditing.value = false
    carToEdit.value = null
    currentTab.value = 'list'

  } catch (error) {
    console.error("Erro ao salvar/atualizar no Firebase: ", error)
    triggerModal('Ocorreu um erro na operação com o servidor.', 'error')
  }
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa; 
  overflow-x: hidden;       
}

* { 
  box-sizing: border-box;
} 

.app-global-container {
  width: 100%;
  margin: 0 auto;
  padding: 10px 20px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>