<script setup>
import wrapper from "@/components/wrapper.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useTask from "@/stores/tasks.pinia";
import taskComp from "@/components/task.vue";

const taskStore = useTask();
const { tasks } = storeToRefs(taskStore);

onMounted(() => {
  taskStore.getTasks();
});
</script>
<template>
  <wrapper type="full">
    <template #main>
      <div class="text-white h-full overflow-y-auto w-full">
        <span class="task-blur"></span>
        <div class="py-2 flex flex-col items-center gap-5 w-full relative z-10">
          <img
            src="@/assets/img/task-coin.png"
            class="w-[124px] h-auto object-contain"
          />
          <h2 class="text-3xl font-semibold">Earn more coins</h2>
        </div>
        <div class="flex flex-col w-full gap-3">
          <span>FIPT Youtube</span>
          <template v-for="item in tasks?.[0]?.tasks">
            <task-comp :item="item" />
          </template>
        </div>
      </div>
    </template>
  </wrapper>
</template>
<style scoped>
.task-blur {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 40px;
  filter: blur(50px);
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(50% 50% at 50% 50%, #212429 0.5%, #3599ea 100%);
}
</style>
