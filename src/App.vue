<template>
  <div id="app">
     <myHeader></myHeader>
    <router-view/>
  </div>
</template>
<script>
import header from '@/components/head'

export default {
  name: 'App',
  components: {
     myHeader: header
  }
}
</script>
