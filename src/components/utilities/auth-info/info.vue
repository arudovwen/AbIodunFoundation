<template>
  <InfoWraper>
    <!-- <SearchBar /> -->
    <!-- <Message /> -->
    <Notification />
    <!-- <Settings /> -->
    <!-- <Support /> -->
    <!-- <div
            class="ninjadash-nav-actions__item ninjadash-nav-actions__language"
        >
            <sdDropdown placement="bottomRight" :action="['click']">
                <template v-slot:overlay>
                    <NavAuth>
                        <router-link
                            @click="() => onFlagChangeHandle('english')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/english.png')
                                "
                                alt=""
                            />
                            <span>English</span>
                        </router-link>
                        <router-link
                            @click="() => onFlagChangeHandle('germany')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/germany.png')
                                "
                                alt=""
                            />
                            <span>Germany</span>
                        </router-link>
                        <router-link
                            @click="() => onFlagChangeHandle('spain')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/spain.png')
                                "
                                alt=""
                            />
                            <span>Spain</span>
                        </router-link>
                        <router-link
                            @click="() => onFlagChangeHandle('turky')"
                            to="#"
                        >
                            <img
                                :src="
                                    require('../../../static/img/flag/turky.png')
                                "
                                alt=""
                            />
                            <span>Turky</span>
                        </router-link>
                    </NavAuth>
                </template>
                <a to="#" class="ninjadash-nav-action-link">
                    <img
                        :src="require(`../../../static/img/flag/${flag}.png`)"
                        alt=""
                    />
                </a>
            </sdDropdown>
        </div> -->

    <div class="ninjadash-nav-actions__item ninjadash-nav-actions__author">
      <sdPopover placement="bottomRight" action="click">
        <template v-slot:content>
          <UserDropDown>
            <div class="user-dropdown">
              <figure class="user-dropdown__info">
                <img
                  :src="
                    avatar ||
                    require('../../../static/img/avatar/chat-auth.png')
                  "
                  alt=""
                  class="w-10 h-10 object-cover"
                />
                <figcaption>
                  <sdHeading as="h5">{{ profile.fullName }}</sdHeading>
                  <p class="capitalize">
                    {{
                      profile.userRole === "admin"
                        ? "Administrator"
                        : profile.userRole
                    }}
                  </p>
                </figcaption>
              </figure>
              <ul class="user-dropdown__links">
                <!-- <li>
                  <a to="page/profile-settings/profile">
                    <unicon name="user"></unicon> Profile
                  </a>
                </li> -->
                <li>
                  <router-link to="/page/profile-settings/profile">
                    <unicon name="setting"></unicon>
                    Settings
                  </router-link>
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
            class="h-10 w-10 object-cover"
            :src="avatar || require('../../../static/img/avatar/chat-auth.png')"
          />
          <span class="ninjadash-nav-actions__author--name">{{
            profile.firstName
          }}</span>
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
// import Settings from './Settings.vue';
import { computed } from "vue";
import Notification from "./Notification.vue";
// import Message from './Message.vue';
// import SearchBar from './Search.vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";

// let flag = 'english';
const { state, dispatch } = useStore();
const { push } = useRouter();

const profile = computed(() => state.auth.userData);
const avatar = computed(() => state.auth.avatar);

const SignOut = (e) => {
  e.preventDefault();
  push("/auth/login");
  dispatch("logOut");
};

// const onFlagChangeHandle = (value) => {
//     flag = value;
// };
</script>
