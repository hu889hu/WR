<template>
  <div class="particles-background">
    <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
      :options="particleOptions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

// 導入 tsParticles
import { loadFull } from 'tsparticles'
// 方案2: 如果使用tsparticles主包
import type { Engine, Container } from "tsparticles-engine";

interface Props {
  polygonSides?: number
  particleCount?: number
  particleSize?: number
  particleColor?: string
  lineColor?: string
  opacity?: number
  speed?: number
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  polygonSides: 6,
  particleCount: 80,
  particleSize: 15,
  particleColor: '#ffffff',
  lineColor: '#ffffff',
  opacity: 0.3,
  speed: 1,
  background: 'transparent'
})

// 粒子配置
const particleOptions = ref({
  background: {
    color: {
      value: props.background
    }
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: props.particleCount,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: props.particleColor
    },
    shape: {
      type: 'polygon',
      polygon: {
        nb_sides: props.polygonSides
      }
    },
    opacity: {
      value: props.opacity,
      random: false
    },
    size: {
      value: { min: 5, max: props.particleSize },
      random: true
    },
    move: {
      enable: true,
      speed: props.speed,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'out'
      }
    },
    links: {
      enable: true,
      distance: 100,
      color: props.lineColor,
      opacity: 0.1,
      width: 1
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: false
      },
      onClick: {
        enable: false
      }
    }
  },
  detectRetina: true
})

// 粒子初始化函數
const particlesInit = async (engine: Engine) => {
  await loadFull(engine)
}

// 粒子加載完成回調
const particlesLoaded = async (container: Container) => {
  console.log('Particles container loaded', container)
}

// 響應式更新配置（當 props 變化時）
onMounted(() => {
  // 如果需要響應 props 變化，可以添加 watch
})

onUnmounted(() => {
  // tsParticles 會自動清理，不需要手動銷毀
})
</script>

<style scoped>
.particles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

#tsparticles {
  width: 100%;
  height: 100%;
}
</style>
