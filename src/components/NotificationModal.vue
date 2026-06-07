<template>
  <div v-if="isOpen" :class="styles.modalOverlay">
    <div :class="styles.modalCard">
      <div :class="styles.modalIcon">
        <span v-if="type === 'success'">🎉</span>
        <span v-else-if="type === 'update'">🔄</span>
        <span v-else-if="type === 'delete'">🗑️</span>
        <span v-else-if="type === 'confirm'">❓</span>
        <span v-else>⚠️</span>
      </div>
      
      <p :class="styles.modalMessage">{{ message }}</p>
      
      <div v-if="type === 'confirm'" :class="styles.modalActionsHorizontal">
        <button :class="[styles.modalBtn, styles.btnDanger]" @click="emit('confirmAction')">Sim, excluir</button>
        <button :class="[styles.modalBtn, styles.btnSecondary]" @click="emit('close')">Cancelar</button>
      </div>
      
      <button v-else :class="styles.modalBtn" @click="emit('close')">Ok, entendi</button>
    </div>
  </div>
</template>

<script setup>
import styles from './NotificationModal.module.css'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success'
  }
})

// Adicionamos 'confirmAction' para o App.vue saber quando o usuário clicou em "Sim" 🌟
const emit = defineEmits(['close', 'confirmAction'])
</script>