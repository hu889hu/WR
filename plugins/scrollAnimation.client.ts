// plugins/scrollAnimation.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-animate', {
    mounted(el, binding) {
      if (process.client) {
        // 获取配置
        const config = binding.value || {};
        const animationType = config.type || 'fade-up';
        const threshold = config.threshold || 0.1;
        const delay = config.delay || 0;
        const duration = config.duration || null;
        
        // 添加基础类
        el.classList.add('scroll-animate-init', animationType);
        
        // 如果指定了持续时间，添加对应的类
        if (duration && typeof duration === 'number') {
          el.style.transitionDuration = `${duration}ms`;
        } else if (config.durationClass) {
          el.classList.add(config.durationClass);
        }
        
        // 添加延迟类
        if (delay && typeof delay === 'number') {
          el.style.transitionDelay = `${delay}ms`;
        } else if (config.delayClass) {
          el.classList.add(config.delayClass);
        }
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                el.classList.add('animate-in');
                
                if (config.once !== false) {
                  observer.unobserve(el);
                }
              }, delay);
            } else if (config.repeat) {
              el.classList.remove('animate-in');
            }
          });
        }, {
          root: null,
          rootMargin: '0px',
          threshold: threshold
        });

        observer.observe(el);
      }
    }
  });
});
