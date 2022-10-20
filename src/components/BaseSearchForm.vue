<template>
  <label :class="['search d-flex', { active: hasFocus }]" for="search">
    <input class="search__input"
           id="search"
           type="text"
           :placeholder="placeholder"
           :autocomplete="autocomplete"
           @focusin="hasFocus = true"
           @blur="$event.target.value.length === 0 ? hasFocus = false : ''"/>
  </label>
</template>

<script>
export default {
  name: "BaseSearchForm",

  props: {
    placeholder: {
      type: String,
      default: "Search link"
    },

    autocomplete: {
      type: String,
      default: "off"
    }
  },

  data () {
    return {
      hasFocus: false
    };
  },

};
</script>

<style lang="scss" scoped>
/*** COLORS ***/
$bg-input: rgb(#ffffff, .8);
$txt-color: #000000;
$icn-color: #000000;

/*** STYLES ***/
.search {
  position: relative;
  height: 48px; // 35
  width: 48px; // 35
  box-sizing: border-box;
  padding: 0 8px;
  border: 3px solid $icn-color;
  border-radius: 25px;
  transition: all 200ms ease;
  cursor: text;
  background: $bg-input;

  &:after {
    content: "";
    position: absolute;
    width: 3px;
    height: 20px;
    right: -4px; // -5
    top: 34px; // 21
    background: $icn-color;
    border-radius: 3px;
    transform: rotate(-45deg);
    transition: all 200ms ease;
  }

  &.active,
  &:hover {
    width: 300px; // 200

    &:after {
      height: 0;
    }
  }

  &__input {
    width: 100%;
    border: none;
    box-sizing: border-box;
    font-family: Helvetica, sans-serif;
    font-size: 15px;
    color: inherit;
    background: transparent;
    outline-width: 0;

    &::placeholder {
      color: transparent;
    }

    &:hover, &:focus {
      &::placeholder {
        color: black;
      }
    }
  }

}
</style>
