<template>
  <div id="content" :class="{ nightMode: nightMode }">
    <nav class="nav-bar">
      <ul class="nav-bar__list">
        <li class="nav-bar__list-item" v-for="tab in tabsGroup().get()" :key="tab">
<!--          <img src="" alt="" class="icon">-->

          <button class="w-100 p-2 text-center fw-bold text-dark" v-html="tab" @click="tabsGroup(tab).set()"/>
        </li>
      </ul>

      <!--      The navbar will slide after "mouseOn"-->
      <!--      <button class="nav-bar__button-change-bar">-->
      <!--        <img src="./media/icons/button-arrow.svg" alt="" class="icon">-->
      <!--      </button>-->

      <div class="form-check form-switch nav-bar__change-bar">
        <input class="form-check-input"
               type="checkbox"
               role="switch"
               id="flexSwitchCheckDefault"
               v-model="nightMode">
      </div>
    </nav>

    <section class="tabs">
      <ul class="tabs__list">
        <li class="tabs__list-item" v-for="tab in getTabsFromDb" :key="tab.id">
          <a :href="tab.url" class="item-link flex_center"
             :style="{ background: tab.bgColor || tab.bg || tab.color || '#ffffff'}">
<!--            <img :src="require(`${tab.bgImage}`)" :alt="`preview-${tab.id}`" class="item-link__preview">-->
            <span class="w-100 text-center fw-bold text-dark">{{ tab.title || tab.url }}</span>
          </a>

          <div class="item-controls">
            <button class="item-controls__button item-controls__button_remove">
              <img src="./media/icons/plus.svg" alt="icon-plus" class="icon">
            </button>
            <button class="item-controls__button item-controls__button_setting">
              <img src="./media/icons/icon-settings.svg" alt="icon-setting" class="icon">
            </button>
          </div>
        </li>

        <li class="tabs__list-item new-tab" :key="testTabs.length">
          <button class="new-tab__button">
            <span class="icon"/>
          </button>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
import DB from "@/db";

export default {
  data () {
    return {
      colorCache: [],
      nightMode: false,
      currentTabsGroup: "1",
      testTabs: [
        // {
        //   id: 540,
        //   name: "FaceBook",
        //   description: "some description...",
        //   url: "https://www.facebook.com/",
        //   icon: "",
        //   bgImage: "./media/preview/fb.jpg"
        // },
        {
          id: 0,
          title: "FaceBook",
          description: "some description...",
          url: "https://www.facebook.com/",
          icon: "",
          bgImage: "./media/preview/fb.jpg"
        },
        {
          id: 1,
          title: "YouTube",
          description: "some description...",
          url: "https://www.youtube.com/",
          icon: "",
          bgImage: "./media/preview/yt.jpg"
        },
        {
          id: 2,
          title: "LinkedIn",
          description: "some description...",
          url: "https://www.linkedin.com/",
          icon: "",
          bgImage: "./media/preview/ld.jpg"
        },
        {
          id: 3,
          title: "VueJs",
          description: "some description...",
          url: "https://vuejs.org/",
          icon: "",
          bgImage: "./media/preview/vj.jpg"
        }
      ],
    };
  },

  computed: {
    getTabsFromDb () {
      return DB[this.currentTabsGroup];
    },
  },

  mounted () {
    // console.log(this.getTabsFromDb);
  },

  methods: {
    tabsGroup (currentTab = "1", db = DB) {
      return {
        get: () => Object.keys(db),
        set: () => this.currentTabsGroup = currentTab
      }
    },

    randomColor (id) {
      const r = () => Math.floor(256 * Math.random());

      return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()}, 1)`);
    }
  }
};
</script>

<style scoped lang="scss">
$nav-bar-width: 114px;
$tab-grid-x: 4;
$tab-grid-y: 4;

.flex_center {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

// COMMON
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  //filter: invert(1);
}

ul {
  list-style-type: none;
}

button {
  border: none;
  background: none;
  box-shadow: none;
}

#content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #A7A7A7 0%, rgba(188, 188, 188, 0) 100%);
}

.nightMode {
  filter: invert(1);
  transition: .3s;
}

// NAVBAR
.nav-bar {
  position: absolute;
  width: $nav-bar-width;
  height: 100%;
  background: linear-gradient(180deg, rgba(124, 124, 124, 0) 0%, rgba(0, 0, 0, .3705) .01%);
  //background: #86b7fe;
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__change-bar {
    @extend .flex_center;
    width: 100%;
    height: 80px;

    .form-check-input {
      outline: none !important;
      cursor: pointer;

      &:focus, &:checked {
        background-color: #ffffff !important;
        border-color: transparent !important;
        box-shadow: none !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='rgba(0, 0, 0, 0.25)'/%3E%3C/svg%3E");
      }
    }
  }

}

// TABS
.tabs {
  width: calc(100% - #{$nav-bar-width});
  height: 100%;
  margin-left: $nav-bar-width;
  overflow: auto;

  &__list {
    width: 100%;
    //height: inherit;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }

  &__list-item {
    width: calc(100% / #{$tab-grid-x});
    height: 270px;
    backdrop-filter: blur(14px);
    overflow: hidden;
    transition: .3s;
    box-shadow: 5px 5px 34px -8px rgba(0,0,0,0.3);

    .item-link {
      width: 100%;
      height: 100%;
      display: block;
      transition: inherit;;

      &__preview {
        width: inherit;
        height: inherit;
      }
    }

    .item-controls {
      transition: inherit;
      visibility: hidden;
      opacity: 0;

      &__button {
        position: absolute;

        .icon {
          width: 30px;
          height: 30px;
        }

        &_remove {
          top: 12px;
          right: 12px;
          transform: rotate(45deg);
        }

        &_setting {
          bottom: 12px;
          left: 12px;
        }
      }
    }

    &:hover {
      .item-link {
        background: rgba(255, 255, 255, .4);
        filter: blur(1px);
      }

      .item-controls {
        visibility: visible;
        opacity: 1;
        transition-delay: .2s;
      }
    }

    &.new-tab {
      //border: 1px solid #B1B1B1;
      border: none;

      &:hover .icon {
        transform: rotate(90deg);
      }

      .new-tab__button {
        @extend .flex_center;
        padding: 5px;
        width: 100%;
        height: 100%;
        cursor: pointer;

        .icon {
          position: relative;
          width: 25%;
          height: 2%;
          transition: .8s;
          // filter: contrast(.1);
        }

        .icon:before, .icon:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          background: #B1B1B1;
        }

        .icon:before {
          transform: rotate(90deg);
        }
      }

    }
  }

}
</style>
