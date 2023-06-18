<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} - Nuxify` : 'Nuxify'),
})
</script>

<template>
  <div class="box-border antialiased overflow-hidden">
    <div class="bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div class="min-h-screen w-full">
        <div class="flex h-full-w-full">
          <!-- <div
            class="h-screen w-[30rem] border-r border-gray-200 dark:border-gray-800"
          ></div> -->
          <div class="w-full h-screen overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
