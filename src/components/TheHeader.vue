<template>
  <header class="sm-mt4 md-mt5 narrow-container">
    <div class="flex flex-column align-center sm-flex-row sm-justify-center py2 sm-py0">
      <img
        alt="Brian Zelip"
        class="circle mb1 sm-mb0 sm-mr2 w-200px md-250px"
        src="../img/bz-livingroom0.jpg"
      >
      <div class="px1 center sm-left-align">
        <h1 class="m0 h0 lh-1p2 white">Brian Zelip</h1>
        <!-- <p class="m0 p0 white h1 lh-1">web &middot; data &middot; teaching</p> -->
        <nav class="flex flex-wrap justify-around sm-justify-between mt1 sm-mt2">
          <a
            class="h2 white sm-px0 sm-m0 green-underline text-decoration-none lh-1"
            href="mailto:brian.zelip@gmail.com"
          >
            <FontAwesomeIcon
              :icon="envelope"
              class="sm-hide"
            ></FontAwesomeIcon>
            <span class="none sm-block">Email</span>
          </a>
          <a
            class="h2 white sm-px0 sm-m0 green-underline text-decoration-none lh-1"
            href="https://github.com/brianzelip"
          >
            <FontAwesomeIcon
              :icon="github"
              class="sm-hide"
            ></FontAwesomeIcon>
            <span class="none sm-block">GitHub</span>
          </a>
          <a
            class="h2 white sm-px0 sm-m0 green-underline text-decoration-none lh-1"
            href="https://twitter.com/bzelip"
          >
            <FontAwesomeIcon
              :icon="twitter"
              class="sm-hide"
            ></FontAwesomeIcon>
            <span class="none sm-block">Twitter</span>
          </a>
          <a
            class="h2 white sm-px0 sm-m0 green-underline text-decoration-none lh-1"
            href="https://www.linkedin.com/in/zelip"
          >
            <FontAwesomeIcon
              :icon="linkedin"
              class="sm-hide"
            ></FontAwesomeIcon>
            <span class="none sm-block">LinkedIn</span>
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import {
  faGithub,
  faTwitter,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

export default {
  components: { FontAwesomeIcon },
  computed: {
    envelope() {
      return faEnvelope;
    },
    github() {
      return faGithub;
    },
    twitter() {
      return faTwitter;
    },
    linkedin() {
      return faLinkedinIn;
    }
  }
};
</script>
