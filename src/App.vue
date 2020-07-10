<template>
  <div
    id="app"
    :class="$router.currentRoute.name !== 'Chat' ? 'wrapper' : 'wrapper wrapper__chat'"
  >
    <notifications group="main" position="top center" />

    <main :class="{
      'main__chat': $router.currentRoute.name === 'Chat',
      'main__home': $router.currentRoute.name === 'Home',
      'main__loading': $router.currentRoute.name === 'Loading'
    }">
      <div :class="$router.currentRoute.name !== 'Chat' ? 'brand' : 'brand brand__hidden'">
        <h1 class="brand-title">Switchats</h1>
        <p class="brand-description">הצ’אטים שיעבירו לכם את הזמן</p>
      </div>

      <div
        :class="$router.currentRoute.name !== 'Chat' ? 'window' : 'window window__chat'"
      >
        <router-view/>
      </div>
    </main>

    <div v-show="$router.currentRoute.name === 'Home' && $store.state.home.step === 0" class="app-counter">
      <p class="app-counter-text">{{'מחוברים כרגע'}}</p>
      <p class="app-counter-content">{{online}}</p>
    </div>

    <div :class="$router.currentRoute.name !== 'Chat' ? 'footer' : 'footer footer__hidden'">
      <nav class="footer-links">
        <div class="footer-links-item">
          <a href="#">תקנון</a>
        </div>
        <div class="footer-links-item">
          <a href="">דווח</a>
        </div>
        <div class="footer-links-item">
          <a href="">צור קשר</a>
        </div>
      </nav>
      <div class="footer-copyright">
        <p>נבנה ע”י &copy; Grimix</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

let onlineInterval = null

export default {
  created: function () {
    window.visualViewport.addEventListener('resize', this.visualViewportResizeHandler)
    this.getOnline()
    onlineInterval = setInterval(this.getOnline, 10000)
  },
  beforeUnmount: function () {
    window.visualViewport.removeEventListener('resize', this.visualViewportResizeHandler)
    clearInterval(onlineInterval)
    onlineInterval = null
  },
  methods: {
    getOnline: async function () {
      try {
        const response = await axios.get('/online')

        if (response.status !== 200) {
          throw new Error('Network or server error')
        }

        this.$store.commit('setOnline', response.data.online)
      } catch (error) {
        console.error(error.message)
      }
    },
    visualViewportResizeHandler: function (e) {
      console.log('Visual viewport resized')
    }
  },
  computed: {
    mainClass: function () {
      if (this.$router.currentRoute.name === 'Chat') {
        return 'main__chat'
      } else if (this.$router.currentRoute.name === 'Home') {
        return 'main__home'
      } else {
        return 'main'
      }
    },
    online: function () {
      return this.$store.state.home.online.toFixed(0)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Abel|Montserrat');

html,
body {
  box-sizing: border-box;
  direction: rtl;
  font-family: 'Rubik', 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fafcff;
}

@media (min-width: 992px) {
  body {
    background-image: url(./assets/img/background/background__main.jpg);
    background-size: 100% 100%;
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.wrapper {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
}

.wrapper__chat {
  //overflow: hidden;
}

@media (min-width: 480px) {
  .wrapper {
    position: relative;
    min-height: 100vh;
  }
}

.vue-notification {
  padding: 10px;
  margin: 4px !important;

  font-size: .8rem !important;
  text-align: start !important;

  box-shadow: 0 0 8px rgba(0, 0, 0, .24) !important;

  color: #ffffff;
  background: #44A4FC;
  border-left: 0 !important;
  border-radius: 4px !important;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #E54D42;
    border-left-color: #B82E24;
  }

  &.success {
    background: #68CD86;
    border-left-color: #42A85F;
  }
}

.brand {
  padding: 8px 16px 16px 8px;
  text-align: center;

  .brand-title {
    margin: 0;
    font-size: 2.6rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #2D4B71;
  }

  .brand-description {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 500;
    color: #6D8FBA;
  }
}

.brand__hidden {
  display: none;
}

@media (min-width: 480px) {
  .brand__hidden {
    display: block;
  }
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main__home {
  background-image: url(./assets/img/background/background__enter__center.png);
  background-repeat: no-repeat;
  background-position: center 65%;
  background-size: auto 65%;
}

.main__chat {
  background-image: url(./assets/img/background/background__chat__center.png);
  background-repeat: no-repeat;
  background-position: center 40%;
  background-size: auto 100%;
}

.main__loading {
  background-image: url(./assets/img/background/background__main__center.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto 65%;
}

.window {
  width: 100%;
  max-width: 480px;
  padding: 0 16px;
}

.window__chat {
  flex: 1;
  padding: 0;
  max-width: 420px;
}

@media (min-width: 480px) {
  .window__chat {
    height: 540px;
    max-height: 540px;
  }
}

.button {
  display: block;
  min-width: 180px;
  padding: 16px 24px;
  border: 0;
  border-radius: 36px;
  appearance: none;
  outline: none;
  background: #1D7AEE;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  transition: box-shadow linear .16s;
}

.button:hover {
  box-shadow: 0 0 16px rgba(0, 0, 0, .24);
}

.button__primary {
  background: linear-gradient(to right, #ED568E 0%, #746BC5 50%, #1D7AEE 100%);
}

.app-counter {
  margin-top: 32px;
  padding: 0 16px;
  text-align: center;

  .app-counter-text {
    margin: 8px 0;
    font-weight: 500;
    font-size: 1.1rem;
    color: #3C5A7F;
  }

  .app-counter-content {
    margin: 0;
    font-size: 2rem;
    font-weight: 500;
    color: #fff;
    text-shadow: 0 0 4px #776BC4;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  padding: 0 16px;

  .footer-links {
    display: flex;
    justify-content: center;

    .footer-links-item {
      position: relative;
      padding: 0 16px;

      a {
        color: #D0D0D0;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    }

    .footer-links-item::after {
      position: absolute;
      top: calc(50% - 2px);
      right: calc(-4px + 2px);
      display: block;
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #D0D0D0;
    }

    .footer-links-item:first-child::after {
      display: none;
    }
  }

  .footer-copyright {
    p {
      font-size: .8rem;
      text-align: center;
      color: #D0D0D0;
    }
  }
}

.footer__hidden {
  display: none;
}

@media (min-width: 480px) {
  .footer__hidden {
    display: flex;
  }
}
</style>
