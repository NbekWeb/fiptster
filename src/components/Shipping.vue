<script setup>
import { ref, reactive } from "vue";
import selectingCard from "@/components/selectingCard.vue";
import coin from "@/components/icons/coin.vue";
import closeIcon from "./icons/close.vue";
import { message } from "ant-design-vue";

const open = ref(false);

const formState = reactive({
  fullName: "",
  email: "",
  address: "",
  city: "",
  country: "",
  zip: "",
  shipping: "standard",
});

const rules = {
  fullName: [
    { required: true, message: "Full Name is required", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Email is invalid", trigger: "blur" },
  ],
  address: [
    { required: true, message: "Address is required", trigger: "blur" },
  ],
  city: [{ required: true, message: "City is required", trigger: "blur" }],
  country: [
    { required: true, message: "Country is required", trigger: "blur" },
  ],
  zip: [{ required: true, message: "Zip Code is required", trigger: "blur" }],
  shipping: [
    { required: true, message: "Shipping method is required", trigger: "blur" },
  ],
};

function onClose() {
  open.value = false;
}
function openWallet() {
  open.value = true;
}

function handleSubmit() {
  formRef.value
    .validate()
    .then(() => {
      message.success("Form submitted successfully");
      onClose();
    })
    .catch(() => {
      message.error("Please fill in all required fields");
    });
}
defineExpose({
  openWallet,
});
</script>
<template>
  <a-drawer
    title=" "
    placement="bottom"
    class="!bg-dark-200"
    :closable="false"
    :open="open"
    @close="onClose"
    height="90vh"
  >
    <div class="text-white flex flex-col gap-4 items-center relative w-full     ">
      <h2 class="text-2xl font-medium">Shipping Information</h2>
      <p class="mt-3 text-xs font-semibold">
        Please provide your shipping details to continue with your order.
      </p>
      <div
        @click="onClose"
        class="absolute text-dark-400 -top-3 -right-3 w-7 h-7 rounded-full bg-white opacity-35 flex items-center justify-center text-xl"
      >
        <closeIcon />
      </div>

      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
        class="text-white w-full"
      >
        <a-form-item label="Full Name" name="fullName">
          <a-input v-model:value="formState.fullName" placeholder="John Doe" />
        </a-form-item>

        <a-form-item label="Email" name="email">
          <a-input
            v-model:value="formState.email"
            placeholder="john@example.com"
          />
        </a-form-item>

        <a-form-item label="Address" name="address">
          <a-input
            v-model:value="formState.address"
            placeholder="123 Main St, Apt 4B"
          />
        </a-form-item>

        <a-form-item label="City" name="city">
          <a-input v-model:value="formState.city" placeholder="New York" />
        </a-form-item>

        <a-form-item label="Country" name="country">
          <a-input
            v-model:value="formState.country"
            placeholder="United States"
          />
        </a-form-item>

        <a-form-item label="Zip Code" name="zip">
          <a-input v-model:value="formState.zip" placeholder="LS2 9AA" />
        </a-form-item>

        <a-form-item label="Shipping Method" name="shipping">
          <a-radio-group v-model:value="formState.shipping">
            <a-radio value="standard">Standard Shipping</a-radio>
            <a-radio value="express">Express Shipping</a-radio>
            <a-radio value="overnight">Overnight Shipping</a-radio>
          </a-radio-group>
        </a-form-item>

        <div class="text-center mt-4">
          <a-button type="primary" @click="handleSubmit">Submit</a-button>
        </div>
      </a-form>
    </div>
  </a-drawer>
</template>
<style scoped></style>
