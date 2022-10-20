<template>
  <div id="content" :class="{ nightMode: nightMode }">
    <div class="row w-100">
      <section class="col-2">
        <div class="px-3 py-2 mb-2 position-relative zIndex-1">
          <BaseSearchForm/>
        </div>
        <nav class="nav flex-column">
          <!--<a class="nav-link active" aria-current="page" href="#">Active</a>-->
          <!--<a class="nav-link" href="#">Link</a>-->
          <!--<a class="nav-link" href="#">Link</a>-->
          <!--<a class="nav-link disabled">Disabled</a>-->

          <!--btn-warning will be active state-->
          <!--<button class="btn btn-warning text-start px-3 py-2 active">Active</button>-->
          <!--<button class="btn text-start px-3 py-2">Link</button>-->
          <!--<button class="btn text-start px-3 py-2">Link</button>-->
          <!--<button class="btn text-start px-3 py-2 disabled">Disabled</button>-->

          <button :class="['btn text-start px-3 py-2', { 'active btn-warning': group === currentTabsGroup } ]"
                  v-for="group in tabsGroup().get()"
                  :key="group"
                  @click="tabsGroup(group).set()">
            Group {{ group }}
          </button>
        </nav>
      </section>

      <section class="col-10 p-2">
        <!--row row-cols-1 row-cols-md-3 g-4-->
        <div class="row g-4">
          <div class="col" v-for="tab in getTabsFromDb" :key="tab.id">
            <!--"text-bg-dark" class needs for black links items else you need to replace it with the "text-dark" class-->
            <a :href="tab.url"
               class="card h-100 text-bg-dark"
               :style="{ background: tab.bgColor || tab.bg || tab.color || '#ffffff'}">
              <!--Doesn't work but needs to now :src="`chrome.extension.getURL(${tab.bgImage})`"-->
              <!--<img src="..." class="card-img-top" alt="...">-->

              <div class="card-body">
                <h5 class="card-title d-flex align-items-center">
                  <img :src="tab.favicon"
                       v-if="tab.favicon"
                       class="width-20 h-50 me-2 shadow"
                       alt="icon">
                  {{ tab.title || getTitleFromUrl(tab.url) }}
                </h5>

                <p class="card-text" v-text="getTitleFromUrl(tab.url)"/>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import DB from "@/db";
import BaseSearchForm from "@/components/BaseSearchForm";

export default {
  components: {
    BaseSearchForm
  },

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
      };
    },

    getTitleFromUrl (url) {
      return url.split("/").filter(item => item !== "")[1].trim();
    },

    randomColor (id) {
      const r = () => Math.floor(256 * Math.random());

      return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()}, 1)`);
    }
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
  //background: linear-gradient(180deg, #A7A7A7 0%, rgba(188, 188, 188, 0) 100%);
}

.zIndex {
  @for $i from 1 through 100 {
    &-#{$i} {
      z-index: #{$i};
    }
  }
}

.width {
  @for $i from 0 through 500 {
    &-#{$i} {
      width: #{$i}px;
    }
  }
}

.nightMode {
  filter: invert(1);
  transition: .3s;
}


</style>
