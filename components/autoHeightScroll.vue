
<!--
    当高度达到一定高度才出现滚动条组件
 -->
<template>
  <div
    :style="[styles]"
    :class="[
      'ct-auto-height-scroll',
      `auto-height-scroll-${className}`,
      isScroll ? 'scroll' : '',
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    maxHeight: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      className: new Date().getTime(),
      styles: {
        'max-height': `${this.maxHeight}px`
      },
      isScroll: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setheight()
    })

    window.addEventListener('resize', this.setheight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setheight)
  },
  methods: {
    setheight() {
      const divs = document.getElementsByClassName(this.className)
      const scrollHeight = divs[0].scrollHeight
      this.isScroll = scrollHeight > this.maxHeight
    }
  }
}
</script>

<style scoped>
.ct-auto-height-scroll {
  overflow: hidden;
}

.ct-auto-height-scroll.scroll {
  padding-right: 10px;
  overflow-y: auto;
}
</style>
