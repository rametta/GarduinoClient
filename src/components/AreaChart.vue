<template>
  <canvas width="400" height="200"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: ['chartData', 'options', 'type'],
  data: () => ({
    chartInstance: null,
  }),
  mounted() {
    // eslint-disable-next-line
    this.chartInstance = new Chart(this.$el, {
      type: this.type,
      data: this.chartData,
      options: this.options,
    });
  },
  computed: {
    labels() {
      return this.chartData.labels;
    },
  },
  watch: {
    labels() {
      this.chartInstance.update(0);
    },
  },
};
</script>