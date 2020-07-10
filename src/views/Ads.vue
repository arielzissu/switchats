<template>
  <div class="ads">
    <div class="ads-container">
      <div class="ads-item">
        <h4>פרסומת 1</h4>
      </div>

      <div class="ads-item">
        <h4>פרסומת 2</h4>
      </div>

      <div class="ads-item">
        <h4>פרסומת 3</h4>
      </div>
    </div>

    <div class="window-action">
      <a href="#" @click="handleLeave" class="button button__primary">התחל שיחה חדשה</a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLeave: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.ads {
  max-width: 640px;

  .ads-container {
    display: flex;
    flex-wrap: wrap;

    .ads-item {
      flex: 0 1 calc(50% - 8px);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      margin: 0 4px;
      border: 2px solid #dbe3ee;
      border-radius: 8px;

      h4 {
        font-size: 1.4rem;
        font-weight: 500;
        color: #dbe3ee;
      }
    }

    .ads-item:last-child {
      flex: 0 1 calc(100% - 8px);
      margin-top: 8px;
      height: 80px;
    }
  }

  .window-action {
    display: flex;
    justify-content: center;
    margin: 16px 0;
  }
}
</style>
