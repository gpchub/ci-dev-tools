document.addEventListener('alpine:init', () => {
    Alpine.directive('grow', (el) => {
        el.addEventListener('input', () => {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        })
    })
})