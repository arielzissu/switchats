<template>
  <div class="loading-container">
    <div class="loading-circle">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created: async function () {
    try {
      const serverStatusResponse = await axios.get('/status')

      if (serverStatusResponse.status !== 200) {
        throw new Error('Network error')
      }

      if (serverStatusResponse.data.status === 200) {
        if (localStorage.nickname) {
          this.$store.commit('setNickname', { nickname: localStorage.nickname })
        }

        await setTimeout(() => {
          if (this.$store.state.nickname && this.$store.state.nickname.length > 0) {
            this.$router.push('chat')
          } else {
            this.$router.push('signin')
          }
        }, 1000)
      }
    } catch (error) {
      // move to error page
      console.error(error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-circle {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    border: 4px solid #6D8FBA;
    opacity: 1;
    border-radius: 50%;
    animation: loading 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }
}
@keyframes loading {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
