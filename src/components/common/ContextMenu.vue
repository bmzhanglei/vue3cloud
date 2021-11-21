<template>
  <teleport to="#contextmenu">
    <ul v-show="show" ref="contextmenuWrapper" class="contextmenu-wrapper" :style="style">
      <template v-for="item in menu" :key="item.label">
        <li
          v-if="item.disabled ? !item.disabled(routeName) : true"
          @click="item.onClick(routeName)"
        >
          {{ $t(item.label as string) }}
        </li>
      </template>
    </ul>
  </teleport>
</template>

<script lang="ts">
import { CommonObject } from '@/typings'
import { computed, defineComponent, PropType, watch } from 'vue'
import { ContextMenuItemProps } from './typings'

export default defineComponent({
  name: 'contextmenu',
  props: {
    visable: {
      type: Boolean,
      required: true
    },
    menu: {
      type: Array as PropType<ContextMenuItemProps[]>,
      required: true
    },
    style: Object as PropType<CommonObject>,
    routeName: {
      type: String,
      required: true
    }
  },
  emits: ['update:visable'],
  setup(props, context) {
    // debugger
    const show = computed({
      get: () => props.visable,
      set: (value) => context.emit('update:visable', value)
    })

    const hideMenu = () => show.value && (show.value = false)

    watch(show, (value) => {
      // 左键点击任意位置，隐藏菜单
      value && document.addEventListener('click', hideMenu)
      !value && document.removeEventListener('click', hideMenu)
    })

    return {
      show
    }
  }
})
</script>

<style lang="scss" scoped>
.contextmenu-wrapper {
  width: fit-content;
  position: fixed;
  padding: .5rem 0;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;
  list-style: none;
  li {
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: rgba($color: #909399, $alpha: 0.1);
    }
  }
}
</style>
