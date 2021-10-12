<template>
    <label
        @click="switchTheme"
        :class="{ checked: isEnabled }"
        for="switch">
        <div class="toggle"></div>
        <div class="names">
            <p class="light-toggle">Light</p>
            <p class="dark-toggle">Dark</p>
        </div>
    </label>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const isEnabled = ref(true);

        const storedTheme = localStorage.getItem('theme');
        if(storedTheme) {
            setTheme(storedTheme);
            if(storedTheme === 'light') isEnabled.value = false;
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function switchTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');

            if(!currentTheme || currentTheme === 'light') {
                localStorage.setItem('theme', 'dark');
                setTheme(null);
                isEnabled.value = true;
            } else {
                localStorage.setItem('theme', 'light');
                setTheme('light');
                isEnabled.value = false;
            }
        }

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }

        return { switchTheme, isEnabled };
    },
});
</script>

<style scoped>
label, .toggle {
  height: 2rem;
  border-radius: 100px;
}
label {
  width: 180px;
  background-color: rgba(0,0,0,.1);
  border-radius: 100px;
  position: relative;
  cursor: pointer;
}
.toggle {
  position: absolute;
  width: 50%;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0,0,0,.15);
  transition: transform .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.names {
  font-weight: bolder;
  width: 65%;
  margin-left: 17.5%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  height: 100%;
}
.dark {
  opacity: .5;
}

p {
  margin: 0;
}

[type="checkbox"] {
  display: none;
}
/* Toggle */
.checked .toggle{
  transform: translateX(100%);
  background-color: #34323D;
}
.checked .dark-toggle{
  opacity: 1;
}
.checked .light-toggle{
  opacity: .5;
}
/* App */
.checked .body{
  background-color:  #26242E;
  color: white;
}
/* Circle */
.checked .crescent{
  transform: scale(1);
  background: #26242E;
}
.checked .circle{
  background: linear-gradient(40deg, #8983F7, #A3DAFB 70%);
}
.checked .main-circle{
  background: linear-gradient(40deg, #8983F7, #A3DAFB 70%);
}
/* Fab */
.checked .fab{
  background-color: #34323D;
}
.checked .arrow,
.checked .mark,
.checked .battery{
  background-color: white;
}
.checked .network{
  border-color: transparent transparent white transparent;
}
.checked .swipe{
  background-color: #34323D;
  opacity: 1;
}
</style>
