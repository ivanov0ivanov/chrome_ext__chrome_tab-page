<template>
  <div id="content">
    <nav class="nav-bar">
      <ul class="nav-bar__list">
        <li class="nav-bar__list-item">
          <img src="" alt="" class="icon">
        </li>
      </ul>
      <button class="nav-bar__button-change-bar">
        <img src="./media/icons/button-arrow.svg" alt="" class="icon">
      </button>
    </nav>

    <section class="tabs">
      <ul class="tabs__list">
        <li class="tabs__list-item" v-for="tab in testTabs" :key="tab.id">
          <a :href="tab.link" class="item-link">
            <img :src="require(`${tab.preview}`)" :alt="`preview-${tab.id}`" class="item-link__preview">
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
            <img src="./media/icons/plus.svg" alt="icon-plus" class="icon">
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
      testTabs: [
        {
          id: 0,
          name: "FaceBook",
          description: "some description...",
          link: "https://www.facebook.com/",
          icon: "",
          preview: "./media/preview/fb.jpg"
        },
        {
          id: 1,
          name: "YouTube",
          description: "some description...",
          link: "https://www.youtube.com/",
          icon: "",
          preview: "./media/preview/yt.jpg"
        },
        {
          id: 2,
          name: "LinkedIn",
          description: "some description...",
          link: "https://www.linkedin.com/",
          icon: "",
          preview: "./media/preview/ld.jpg"
        },
        // {
        //   id: 3,
        //   name: 'VueJs',
        //   description: 'some description...',
        //   link: 'https://vuejs.org/',
        //   icon: '',
        //   preview: './media/preview/vj.jpg'
        // }
      ],
    };
  },

  computed: {
    getTabsFromDb () {
      // for (let i in DB) {
      //
      //   return DB[i].filter((item, key) => {
      //     return key !== "style"
      //   })
      //
      // }
    }
  },

  mounted () {
    console.log(this.getTabsFromDb);
  }
};
</script>

<style scoped lang="scss">

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

// NAVBAR
.nav-bar {
  position: absolute;
  width: 114px;
  height: 100%;
  background: linear-gradient(180deg, rgba(124, 124, 124, 0) 0%, rgba(0, 0, 0, 0.3705) 0.01%);
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__button-change-bar {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// TABS
.tabs {
  width: 100%;
  padding-top: 114px;
  padding-left: 114px;

  &__list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__list-item {
    width: 412px;
    height: 275px;
    margin-right: 15px;
    margin-bottom: 15px;
    backdrop-filter: blur(14px);
    transition: .3s;

    .item-link {
      width: inherit;
      height: inherit;
      display: block;
      transition: inherit;

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
        background: rgba(255, 255, 255, 0.4);
        filter: blur(4px);
      }

      .item-controls {
        visibility: visible;
        opacity: 1;
        transition-delay: .2s;
      }
    }

    &.new-tab {
      border: 1px solid #B1B1B1;

      .icon {
        transition: .5s;
        filter: contrast(0.1);
      }

      &:hover .icon {
        transform: rotate(180deg);
      }

      .new-tab__button {
        width: inherit;
        height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }

}
</style>
