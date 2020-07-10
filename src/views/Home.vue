<template>
  <div class="card">
    <form class="form stepper">
      <!-- Part 1 -->
      <div v-if="step === 0" class="stepper-item">
        <div class="form-group form-group__text">
          <label for="nickname">בחר שם:</label>
          <input type="text" id="nickname" name="nickname" placeholder="הקלד שם..." v-model.trim="$v.nickname.$model">
        </div>
      </div>

      <!-- Part 2 -->
      <div v-if="step === 1" class="stepper-item">
        <div class="stepper-item-title">אנא אשר שקראת את התקנון...</div>
        <div class="scroller">
          <div class="scroller-container" @scroll.passive="rulesScroll">
            <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>6. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <transition name="fade">
            <button v-show="!$store.state.home.rulesBottom" @click="scrollRulesDown" class="scroller-action scroller-action__pulldown">
              <div class="rectangle rectangle__white"></div>
            </button>
          </transition>
        </div>
        <div class="form-group form-group__checkbox">
          <input type="checkbox" id="accept-terms" name="accept-terms" v-model="read">
          <label for="accept-terms">אני מאשר שקראתי את התקנון<span>*</span></label>
        </div>
      </div>

      <div class="stepper-action">
        <button class="button button__primary" @click="next">
          <span v-show="step < 1">חפש צאט</span>
          <span v-show="step >= 1">המשך</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
  methods: {
    next: function (e) {
      e.preventDefault()

      if (this.step < 1) {
        if (!this.$v.nickname.$invalid) {
          this.$store.commit('increaseStep')
        } else {
          this.$notify({
            group: 'main',
            text: 'נדרשים לפחות 3 תווים',
            type: 'warn'
          })
        }
      } else {
        if (!this.$v.$invalid && this.read) {
          localStorage.nickname = this.nickname
          this.$router.push('/')
        } else {
          this.$notify({
            group: 'main',
            text: 'אשר שקראת את הכללים',
            type: 'warn'
          })
        }
      }
    },
    rulesScroll: function (e) {
      const height = e.srcElement.scrollHeight
      const offsetHeight = e.srcElement.offsetHeight
      const scrollTop = e.srcElement.scrollTop

      if (height - offsetHeight === scrollTop) {
        this.$store.commit('setRulesBottom', true)
      } else {
        this.$store.commit('setRulesBottom', false)
      }
    },
    scrollRulesDown: function (e) {
      e.preventDefault()

      const rulesScroll = document.querySelector('.scroller-container')

      if (rulesScroll) {
        rulesScroll.scrollBy(0, 32)
      }
    }
  },
  validations: {
    nickname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(18)
    }
  },
  computed: {
    nickname: {
      get () {
        return this.$store.state.nickname
      },
      set (value) {
        this.$store.commit('setNickname', { nickname: value })
      }
    },
    read: {
      get () {
        return this.$store.state.readRules
      },
      set (value) {
        this.$store.commit('readRules', { readRules: value })
      }
    },
    step: {
      get () {
        return this.$store.state.home.step
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    padding: 24px 16px 48px 16px;
    border-radius: 12px;
    background: #fff;
    transition: all 1s;
  }

  .form-group {
    display: flex;
  }

  .form-group__text {
    flex-direction: column;

    label {
      display: inline-block;
      margin-bottom: 4px;
      font-size: 1.6rem;
      font-weight: 500;
      text-align: center;
      color: #486890;
    }

    input[type=text] {
      padding: 20px 12px;
      border: 0;
      border-radius: 8px;
      outline: none;
      background: #F3F8FF;
      transition: background linear .3s;
    }

    input[type=text]:focus {
      background: #ecf4ff;
    }

    input[type=text]::placeholder {
      font-size: 1.2rem;
      color: #BBC8DB;
    }
  }

  .form-group__checkbox {
    flex-direction: row;
    align-items: center;

    label {
      margin-inline-start: 8px;
      font-weight: 500;
      color: #486890;

      span {
       color: #F13232;
      }
    }
  }

  .stepper {

    .stepper-item {

      .stepper-item-title {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 500;
        color: #486890;
      }
    }

    .stepper-action {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateY(50%);
      display: flex;
      justify-content: center;
    }
  }

  .scroller {
    position: relative;
    margin: 16px 0;

    .scroller-container {
      max-height: 160px;
      padding: 4px 8px;
      overflow: auto;
      scroll-behavior: smooth;
      border-radius: 8px;
      background: #F3F8FF;

      p {
        margin: 4px 0;
        font-size: .89rem;
        font-weight: 400;
        color: #9EA9BA;
      }
    }

    .scroller-container::-webkit-scrollbar {
      display: none;
    }

    .scroller-action__pulldown {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      appearance: none;
      outline: 0;
      border: 0;
      padding: 8px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      background: linear-gradient(to right, #ED568E 0%, #746BC5 50%, #1D7AEE 100%);
      cursor: pointer;
      transition: opacity linear .24s;

      .rectangle {
        width: 8px;
        height: 8px;
        background: transparent;
        border: 2px solid transparent;
        transform: rotate(45deg);
      }

      .rectangle__white {
        border-color: #fff;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .32s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
