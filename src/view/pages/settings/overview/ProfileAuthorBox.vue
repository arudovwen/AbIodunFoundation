<template>
  <sdCards headless>
    <div class="author-info">
      <figure>
        <img :src="avatar || imageUrl" alt="avatar" />
        <a-upload :before-upload="handleFileUpload">
          <a to="#">
            <loading-outlined v-if="loading"></loading-outlined>
            <unicon v-else name="camera" width="16"></unicon>
          </a>
        </a-upload>
      </figure>
      <figcaption>
        <div class="info">
          <sdHeading as="h4">{{ userData.fullName }}</sdHeading>
          <p>
            {{ userData.userRole === "admin" ? "Administrator" : "Customer" }}
          </p>
        </div>
      </figcaption>
    </div>
    <nav class="settings-menmulist">
      <ul>
        <li>
          <router-link :to="{ name: 'set-profile' }">
            <unicon name="user" width="14"></unicon>
            Edit Profile
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'set-account' }">
            <unicon name="setting" width="14"></unicon>
            Account Settings
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'set-password' }">
            <unicon name="key-skeleton" width="14"></unicon>
            Change Password
          </router-link>
        </li>
      </ul>
    </nav>
  </sdCards>
</template>

<script>
import { message } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
// eslint-disable-next-line no-unused-vars
import { base64ToImage } from "@/utility/base64ToImage";

export default {
  name: "AuthorBox",
  components: { LoadingOutlined },
  data() {
    return {
      imageUrl: require("../../../../static/img/users/1.png"),
    };
  },
  mounted() {
    this.$store.dispatch("getUserAvatar", this.userData.id);
  },
  methods: {
    handleFileUpload(file) {
      const allowedTypes = [
        "image/svg+xml",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        message.error(
          `${file.name} is not a valid image file (SVG, JPEG, JPG, PNG allowed)`
        );
        return false; // Prevent the upload
      }

      const formData = new FormData();
      formData.append("file", file);

      this.$store.dispatch("uploadFile", {
        userId: this.userData.id,
        fileType: "avatar",
        formData,
      });

      return false; // Prevent default behavior
    },
  },
  computed: {
    userData() {
      return this.$store.state.auth.userData;
    },
    success() {
      return this.$store.state.file.success;
    },
    loading() {
      return this.$store.state.file.loading;
    },
    avatarsuccess() {
      return this.$store.state.users.avatarsuccess;
    },
    avatarloading() {
      return this.$store.state.users.avatarloading;
    },
    base64() {
      return this.$store.state?.users?.avatar?.fileBase64;
    },
    mimeType() {
      return this.$store.state?.users?.avatar?.contentType;
    },
    avatar() {
      if (!this.$store.state.users) return;
      return base64ToImage(
        this.$store.state?.users?.avatar?.fileBase64,
        this.$store.state.users?.avatar?.contentType
      );
    },
  },
  watch: {
    success(newValue) {
      if (newValue) {
        message.success("Upload successful");
        this.$store.dispatch("getUserAvatar", this.userData.id);
      }
    },
    avatarsuccess(newValue) {
      if (newValue) {
        localStorage.setItem("avatar", this.avatar);
        this.$store.dispatch("updateAvatar", this.avatar)
      }
    },
  },
};
</script>
