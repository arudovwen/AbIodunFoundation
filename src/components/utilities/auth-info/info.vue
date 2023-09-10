<template>
  <InfoWraper>
    <!-- <SearchBar />
        <Message /> -->
    <Notification />
    <!-- <Settings /> -->
    <!-- <Support /> -->

    <div class="ninjadash-nav-actions__item ninjadash-nav-actions__author">
      <sdPopover placement="bottomRight" action="click">
        <template v-slot:content>
          <UserDropDown>
            <div class="user-dropdown">
              <figure class="user-dropdown__info">
                <img
                  :src="require('../../../static/img/avatar/chat-auth.png')"
                  alt=""
                />
                <figcaption>
                  <sdHeading as="h5">Danial</sdHeading>
                  <p>Support Engineer</p>
                </figcaption>
              </figure>
              <ul class="user-dropdown__links">
                <li>
                  <a to="#"> <unicon name="user"></unicon> Profile </a>
                </li>
                <li>
                  <a to="#">
                    <unicon name="setting"></unicon>
                    Settings
                  </a>
                </li>
                <li>
                  <a to="#">
                    <unicon name="dollar-sign"></unicon>
                    Billing
                  </a>
                </li>
                <li>
                  <a to="#">
                    <unicon name="users-alt"></unicon>
                    Activity
                  </a>
                </li>
                <li>
                  <a to="#"> <unicon name="bell"></unicon> Help </a>
                </li>
              </ul>
              <a @click="SignOut" class="user-dropdown__bottomAction" href="#">
                <LogoutOutlined /> Sign Out
              </a>
            </div>
          </UserDropDown>
        </template>
        <a to="#" class="ninjadash-nav-action-link">
          <a-avatar
            :src="require('../../../static/img/avatar/chat-auth.png')"
          />
          <span class="ninjadash-nav-actions__author--name">Danial</span>
          <unicon name="angle-down"></unicon>
        </a>
      </sdPopover>
    </div>
  </InfoWraper>
</template>

<script setup>
import {
  InfoWraper,
  // NavAuth,
  UserDropDown,
} from "./auth-info-style";
// import Support from "./Support";
// import Settings from "./Settings.vue";
import Notification from "./Notification.vue";
// import Message from './Message.vue';
// import SearchBar from './Search.vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";

// let flag = 'english';
const { dispatch } = useStore();
const { push } = useRouter();
const SignOut = (e) => {
  e.preventDefault();
  push("/auth/login");
  dispatch("logOut");
};

// const onFlagChangeHandle = (value) => {
//   flag = value;
// };
</script>
