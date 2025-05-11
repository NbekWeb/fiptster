<script setup>
import wrapper from "@/components/wrapper.vue";
import info from "@/components/info.vue";
import chevron from "@/components/icons/chevron.vue";
import coin from "@/components/icons/coin.vue";
import { ref } from "vue";
const points = ref(0);
const pointsToAdd = 12;
const clicks = ref([]);

const data = [
  {
    title: "Earn per tap",
    content: "+12",
    logo: true,
  },
  {
    title: "Coins to level up",
    content: "10 M",
    logo: false,
  },
  {
    title: "Profit per scroll",
    content: "+636.31K",
    logo: true,
    info: "Lorem Ipsum dolor cop Lorem Ipsum dolor,  Lorem Ipsum dolor",
  },
];

function handleCardClick(e) {
  let x, y;

  // Detect if it's a touch event
  if (e.touches && e.touches.length > 0) {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }

  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const offsetX = x - rect.left - rect.width / 2;
  const offsetY = y - rect.top - rect.height / 2;

  card.style.transform = `perspective(1000px) rotateX(${-offsetY / 10}deg) rotateY(${offsetX / 10}deg)`;

  setTimeout(() => {
    card.style.transform = "";
  }, 100);

  points.value += pointsToAdd;
  clicks.value.push({ id: Date.now(), x, y });

  const label = document.createElement("div");
  label.textContent = `+${pointsToAdd}`;
  label.style.position = "absolute";
  label.style.left = `${x - 20}px`;
  label.style.top = `${y}px`;
  label.style.fontSize = "24px";
  label.style.fontWeight = "bold";
  label.style.color = "#fff";
  label.style.textShadow = "0 0 5px #000";
  label.style.transition = "all 1s ease-in-out";
  label.style.opacity = "1";
  label.style.pointerEvents = "none";
  label.style.zIndex = "100";
  document.body.appendChild(label);

  setTimeout(() => {
    label.style.transform = "translateY(-50px)";
    label.style.opacity = "0";
  }, 0);

  setTimeout(() => {
    label.remove();
  }, 1000);
}

</script>
<template>
  <wrapper>
    <template #top>
      <div class="max-h-max w-full flex justify-center gap-2 items-center">
        <img src="@/assets/img/user.png" class="w-8.5 h-auto object-contain" />
        <span class="font-medium">@Nbekdev</span>
      </div>
    </template>
    <template #main>
      <div class="w-full text-white h-full flex flex-col">
        <div class="grid grid-cols-3 gap-2">
          <info v-for="(item, i) in data" :key="i" :data="item" />
        </div>
        <div
          class="flex items-center justify-center gap-2 font-bold text-40 my-5"
        >
        <coin class="text-[42px]"/>
          <span> 507, 981 </span>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="w-full flex justify-between items-center text-7">
            <span class="flex items-center gap-0.5"
              >Level <chevron class="text-[5px]" />
            </span>
            <span> <span class="opacity-60">Level 1/ </span>12 </span>
          </div>
          <div class="flex relative h-2 w-full rounded-50 bg-dark-300">
            <div
              class="absolute top-0 left-0 h-full w-10 bg-blue-500 rounded-50 border border-dark-555"
            ></div>
          </div>
        </div>
        <div class="flex-grow p-5  overflow-y-hidden">
          <img
            src="@/assets/img/main-coin.png"
            class="w-full h-full object-contain main-coin"
            @click="handleCardClick"
            @touchstart="handleCardClick"
          />
        </div>
      </div>
    </template>
  </wrapper>
</template>
<style scoped>
.bg-liner {
  background: linear-gradient(180deg, #212429 6.09%, #3599ea 164.78%);
}
.main-coin {
  touch-action: manipulation;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
</style>
