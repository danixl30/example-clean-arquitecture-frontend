<script setup lang="ts">
import { mainWrapperLogic } from "@mono/core"
import { stateFactoryProvider } from "../../core/state-factory/state-factory"
import MainPage from "./MainPage.vue";

const { openSate, onOpenClose } = mainWrapperLogic(stateFactoryProvider())

</script>

<template>
  <button @click="onOpenClose">{{ openSate.value ? 'Close' : 'Open' }}</button>
  <div v-if="openSate.value">
    <MainPage />
  </div>
</template>
