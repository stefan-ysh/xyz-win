<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 class="text-2xl font-bold text-center">Login</h3>
            <form @submit.prevent="handleSubmit">
                <div class="mt-4">
                    <div>
                        <label class="block" for="phone">手机号码</label>
                        <input type="tel" placeholder="请输入手机号码"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            id="phone" v-model="phone" required>
                    </div>
                    <div class="mt-4">
                        <label class="block" for="verificationCode">验证码</label>
                        <div class="flex">
                            <input type="text" placeholder="请输入验证码"
                                class="w-2/3 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="verificationCode" v-model="verificationCode" required>
                            <button type="button" @click="sendVerificationCode"
                                class="w-1/2 px-4 py-2 mt-2 ml-2 text-white bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                                :disabled="isSendingCode">
                                {{ sendCodeButtonText }}
                            </button>
                        </div>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button type="submit"
                            class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                            登录
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { sendMsgCode } from '@/api/auth';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();

const router = useRouter();

const phone = ref('');
const verificationCode = ref('');
const isSendingCode = ref(false);
const sendCodeButtonText = ref('发送验证码');
let countdown = 60;

const sendVerificationCode = async () => {
    if (isSendingCode.value) return;

    // TODO: Implement the logic to send verification code
    console.log('Sending verification code to', phone.value);

    isSendingCode.value = true;
    const timer = setInterval(() => {
        countdown--;
        sendCodeButtonText.value = `${countdown}秒后重发`;
        if (countdown <= 0) {
            clearInterval(timer);
            isSendingCode.value = false;
            sendCodeButtonText.value = '发送验证码';
            countdown = 60;
        }
    }, 1000);
    const res = await sendMsgCode({ mobilePhoneNumber: phone.value });
    if (res.code === 200) {
        console.log('验证码发送成功');
    } else {
        console.log('验证码发送失败');
    }
};

const handleSubmit = async () => {
    console.log('Logging in with', phone.value, verificationCode.value);
    const res = await userStore.login({ mobilePhoneNumber: phone.value, verifyCode: verificationCode.value });
    if (res) {
        console.log('登录成功');
        router.replace('/');
    } else {
        console.log('登录失败');
    }
};
</script>
