<script setup>
import wrapper from "@/components/wrapper.vue";
import info from "@/components/info.vue";
import chevron from "@/components/icons/chevron.vue";
import coin from "@/components/icons/coin.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import tapSoundURL from "../assets/sound/sound.mp3";
import useAuth from "@/stores/auth.pinia";
import defaultAvatar from "@/assets/img/user.png";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/utils/numFormat";
import { message } from "ant-design-vue";

const router = useRouter();
const auth = useAuth();
const { user } = storeToRefs(auth);
const points = ref(0);
const userCoin = ref(0);
const stopClicking = ref(false);
const pointsToAdd = computed(() => {
  return user.value?.user_profile?.earn_per_tab || 1;
});
const clicks = ref([]);

let tapAudioInstances = [];
let stopAudioTimer = null;
let lastClickTime = 0;
let clickCount = 0;
let clickTimer = null;

function playTapSoundWithTimeout() {
  const audio = new Audio(tapSoundURL);
  audio.play().catch((err) => console.warn("Play blocked", err));

  tapAudioInstances.push(audio);

  if (stopAudioTimer) clearTimeout(stopAudioTimer);

  stopAudioTimer = setTimeout(() => {
    tapAudioInstances.forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });
    tapAudioInstances = [];
  }, 300);
}

function goTo(name) {
  router.push({ name });
}

const data = computed(() => [
  {
    title: "Earn per tap",
    content: user.value?.user_profile?.earn_per_tab
      ? `+${user.value.user_profile.earn_per_tab}`
      : "+0",
    logo: true,
  },
  {
    title: "Coins to level up",
    content: user.value?.user_profile?.coin_level
      ? `${formatNumber(user.value.user_profile.coin_level, "abbreviate")}`
      : "0",
    logo: false,
  },
  {
    title: "Profit per scroll",
    content: user.value?.user_profile?.profit_per_hour
      ? `+${formatNumber(
          user.value.user_profile.profit_per_hour,
          "abbreviate"
        )}`
      : "+0",
    logo: true,
    info: "Lorem Ipsum dolor cop Lorem Ipsum dolor,  Lorem Ipsum dolor",
  },
]);

function addCoin() {
  auth.addCoin(
    {
      coin_point: points.value,
    },
    () => {
      auth.getUser(() => {
        userCoin.value = user.value?.user_profile?.coin || 0;
      });
      points.value = 0;
      clicks.value = [];
      clickCount = 0;
    }
  );
}

function handleCardClick(e) {
  if (stopClicking.value) {
    message.error("Please wait before clicking again!");
  } else {
    const now = Date.now();
    if (now - lastClickTime < 100 || stopClicking.value) return;
    lastClickTime = now;

    if (clickCount >= 10) {
      stopClicking.value = true;
      clickCount = 0;
      addCoin();
      setTimeout(() => {
        stopClicking.value = false;
      }, 10000);
      return;
    }
    userCoin.value = +userCoin.value + pointsToAdd.value;

    if (clickTimer) clearTimeout(clickTimer);
    clickCount++;
    clickTimer = setTimeout(() => {
      addCoin();
    }, 500);
    if (user.value?.is_sound) {
      playTapSoundWithTimeout();
    }

    let x, y;
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

    card.style.transform = `perspective(1000px) rotateX(${
      -offsetY / 10
    }deg) rotateY(${offsetX / 10}deg)`;

    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    points.value += pointsToAdd.value;

    clicks.value.push({ id: Date.now(), x, y });

    const label = document.createElement("div");
    label.textContent = `+${pointsToAdd.value}`;
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
    }, 500);
  }
}

function initAudioOnce() {
  const audio = new Audio(tapSoundURL);
  audio.muted = true;

  audio.play().catch((err) => console.warn("Play blocked:", err));
}

onMounted(() => {
  auth.getUser(() => {
    userCoin.value = user.value?.user_profile?.coin || 0;
  });
  window.addEventListener("click", initAudioOnce, { once: true });
  window.addEventListener("touchstart", initAudioOnce, { once: true });
});
</script>
<template>
  <wrapper>
    <template #top>
      <div
        class="max-h-max w-full flex justify-center gap-2 items-center"
        @click="goTo('User')"
      >
        <img
          :src="user.avatar ? user.avatar : defaultAvatar"
          class="w-8.5 min-h-8.5 h-8.5 object-cover rounded-full"
        />
        <span class="font-medium"
          >{{ user?.username ? `@${user.username}` : user.first_name }}
        </span>
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
          <coin class="text-[42px]" />
          <span>
            {{ formatNumber(+userCoin, "integer") }}
          </span>
        </div>
        <div class="flex flex-col gap-1.5">
          <div class="w-full flex justify-between items-center text-sm">
            <span class="flex items-center gap-0.5" @click="goTo('Levels')"
              >Level <chevron class="text-xs" />
            </span>
            <span>
              <span class="opacity-60">
                {{ user?.profile_level ? user.profile_level : 1 }}/ </span
              >11
            </span>
          </div>
          <div
            class="flex relative h-2 w-full rounded-50 bg-dark-300 border border-dark-555"
          >
            <div
              class="absolute top-0 left-0 h-full bg-blue-500 rounded-50"
              :style="{
                width:
                  (user?.profile_level ? (user.profile_level / 11) * 100 : 0) +
                  '%',
              }"
            ></div>
          </div>
        </div>
        <div
          class="flex-grow p-5 h-full flex items-center justify-center overflow-y-hidden"
        >
          <img
            src="@/assets/img/main-coin.png"
            class="w-full h-full object-contain main-coin max-h-max border border-red-500 max-w-max rounded-full"
            @click.prevent="handleCardClick"
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
