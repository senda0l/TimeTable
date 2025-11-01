<script setup>
import { ref, watchEffect } from "vue";
import "@/shared/styles/main.css";
import { useTheme } from "@/features/theme-change/theme";
const { theme, toggleTheme } = useTheme();

const size = ref("long");
const toggleSize = () => {
  size.value = size.value === "long" ? "short" : "long";
};
</script>

<template>
  <nav
    :class="{
      short: size === 'short',
    }"
    class=""
  >
    <div class="container">
      <div class="nav">
        <span class="back" @click="toggleSize()">
          <h1 v-if="size === 'short'">></h1>
          <h1 v-else><</h1>
          </span>
        <RouterLink to="/" class="nav_logo nav_home">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="logo_svg"
          >
            <path
              d="M6.133 21C4.955 21 4 20.02 4 18.81V10.008C4 9.34303 4.295 8.71303 4.8 8.29803L10.667 3.48003C11.0419 3.16961 11.5133 2.99976 12 2.99976C12.4867 2.99976 12.9581 3.16961 13.333 3.48003L19.199 8.29803C19.705 8.71303 20 9.34303 20 10.008V18.81C20 20.02 19.045 21 17.867 21H6.133Z"
              stroke="inherit"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 21V15.5C9.5 14.9696 9.71071 14.4609 10.0858 14.0858C10.4609 13.7107 10.9696 13.5 11.5 13.5H12.5C13.0304 13.5 13.5391 13.7107 13.9142 14.0858C14.2893 14.4609 14.5 14.9696 14.5 15.5V21"
              stroke="inherit"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h4 class="nav_logo-text">Home</h4>
        </RouterLink>

        <RouterLink to="/schedule" class="nav_logo nav_schedule">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="logo_svg"
          >
            <path
              d="M21 5H3C2.44772 5 2 5.44772 2 6V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V6C22 5.44772 21.5523 5 21 5Z"
              stroke="inherit"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 3V7M12.5 11.5H7M17 15.5H7M17 3V7"
              stroke="inherit"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <h4 class="nav_logo-text">Schedule</h4>
        </RouterLink>

        <RouterLink to="/editing" class="nav_logo nav_editing">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color=""
            class="logo_svg"
            stroke="none"
          >
            <path
              d="M13 3C13.2549 3.00028 13.5 3.09788 13.6854 3.27285C13.8707 3.44782 13.9822 3.68695 13.9972 3.94139C14.0121 4.19584 13.9293 4.44638 13.7657 4.64183C13.6021 4.83729 13.3701 4.9629 13.117 4.993L13 5H5V19H19V11C19.0003 10.7451 19.0979 10.5 19.2728 10.3146C19.4478 10.1293 19.687 10.0178 19.9414 10.0028C20.1958 9.98789 20.4464 10.0707 20.6418 10.2343C20.8373 10.3979 20.9629 10.6299 20.993 10.883L21 11V19C21.0002 19.5046 20.8096 19.9906 20.4665 20.3605C20.1234 20.7305 19.6532 20.9572 19.15 20.995L19 21H5C4.49542 21.0002 4.00943 20.8096 3.63945 20.4665C3.26947 20.1234 3.04284 19.6532 3.005 19.15L3 19V5C2.99984 4.49542 3.19041 4.00943 3.5335 3.63945C3.87659 3.26947 4.34684 3.04284 4.85 3.005L5 3H13ZM19.243 3.343C19.423 3.16365 19.6644 3.05953 19.9184 3.05177C20.1723 3.04402 20.4197 3.13322 20.6103 3.30125C20.8008 3.46928 20.9203 3.70355 20.9444 3.95647C20.9685 4.2094 20.8954 4.46201 20.74 4.663L20.657 4.758L10.757 14.657C10.577 14.8363 10.3356 14.9405 10.0816 14.9482C9.82767 14.956 9.58029 14.8668 9.38972 14.6988C9.19916 14.5307 9.07969 14.2964 9.0556 14.0435C9.03151 13.7906 9.10459 13.538 9.26 13.337L9.343 13.243L19.243 3.343Z"
              fill="#A26B6B"
            />
          </svg>
          <h4 class="nav_logo-text">Editing</h4>
        </RouterLink>

        <div class="nav_logo theme" @click="toggleTheme()">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="logo_svg dark_svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.5 28.5V34.5H16.5V28.5H19.5ZM26.4852 24.3639L30.7279 28.6066L28.6066 30.7279L24.3639 26.4853L26.4852 24.3639ZM9.51469 24.3639L11.636 26.4853L7.39336 30.7279L5.27203 28.6066L9.51469 24.3639ZM18 9.79828C22.5297 9.79828 26.2017 13.4703 26.2017 18C26.2017 22.5297 22.5297 26.2018 18 26.2018C16.9224 26.2038 15.8549 25.9931 14.8589 25.5816C13.8629 25.1702 12.9579 24.5661 12.1959 23.8041C11.4339 23.0421 10.8298 22.1371 10.4184 21.1411C10.0069 20.1451 9.79615 19.0777 9.79819 18C9.79819 13.4703 13.4703 9.79828 18 9.79828ZM18 12.7982C15.1271 12.7982 12.7982 15.1272 12.7982 18.0057C12.7969 18.6884 12.9304 19.3647 13.1911 19.9957C13.4517 20.6267 13.8344 21.2 14.3172 21.6828C15.2922 22.6578 16.6153 23.2043 18 23.2017V12.7982ZM34.5 16.5V19.5H28.5V16.5H34.5ZM7.49995 16.5V19.5H1.49998V16.5H7.49995ZM7.39336 5.27206L11.636 9.51471L9.51469 11.636L5.27203 7.39338L7.39336 5.27206ZM28.6066 5.27206L30.7279 7.39338L26.4852 11.636L24.3639 9.51471L28.6066 5.27206ZM19.4999 1.5V7.49998H16.4999V1.5H19.4999Z"
              fill="#A26B6B"
            />
          </svg>
          <h4 v-if="theme === 'light'" class="nav_logo-text">Dark Theme</h4>
          <h4 v-else class="nav_logo-text">Light Theme</h4>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
body {
  background-color: var(--primary-bg);
}

svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.short {
  max-width: 80px;
  width: 100%;
  overflow: hidden;
  left: -25px;
}

.short .back {
  left: 55px;
  color: black;
  z-index: 10;
}

nav {
  max-width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--secondary);
  height: 100vh;
  padding-top: 30px;
  transition: 0.3s;
}

.nav {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}

.nav_logo {
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 10px;
  color: #a26b6b;
  padding: 4px 110px 6px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.nav_logo.active {
  background-color: var(--primary-bg);
}

.nav_logo:hover {
  background: var(--primary-bg);
}

.nav_logo-text {
  font-size: 12px;
  color: #a26b6b;
}

.theme {
  position: absolute;
  bottom: 50px;
  padding-right: 30px;
}

.logo_svg {
  stroke: #a26b6b;
}

.back {
  position: absolute;
  color: white;
  left: 150px;
  top: 20px;
  cursor: pointer;
  transition: 0.3s;
}

html.dark .router-link-exact-active .logo_svg {
  stroke: white;
}
html.dark .router-link-exact-active .nav_logo-text {
  color: white;
}

html .router-link-exact-active .logo_svg {
  stroke: #a26b6b;
}

html.dark .nav_logo:hover .logo_svg {
  stroke: white;
}
html.dark .nav_logo:hover .nav_logo-text {
  color: white;
}
</style>
