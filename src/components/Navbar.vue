<template>
  <nav :class="styles.navbar">
    <div :class="styles.navBrand">🚗 Gerenciamento de Automóveis</div>
    <div :class="styles.navLinks">
      <button 
        :class="[styles.navLink, { [styles.active]: currentTab === 'form' }]" 
        @click="changeTab('form')"
      >
        Novo Cadastro
      </button>
      
      <button 
        :class="[styles.navLink, { [styles.active]: currentTab === 'list' }]" 
        @click="changeTab('list')"
      >
        Ver Frota
      </button>
    </div>
  </nav>
</template>

<script setup>
import styles from './Navbar.module.css'

defineProps({
  currentTab: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change-tab'])

const changeTab = (tabName) => {
  emit('change-tab', tabName)
}
</script>