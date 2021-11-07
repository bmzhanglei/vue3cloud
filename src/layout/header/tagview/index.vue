<script setup lang="ts">
import { ref,computed ,reactive,inject, nextTick} from 'vue'
import { useStore } from '@/store';
import { emitter } from '@/utils/bus';
import { RouteRecordName, useRouter } from 'vue-router'
import { ContextMenuItemProps } from '@/components/common/typings'
import type {Ttag,Reload} from '@/typings/route'
import {Icon} from '@/components/Icon';
import { VueDraggableNext } from 'vue-draggable-next'
const router =  useRouter()
const {state,commit} = useStore()

// const reload = inject<Reload>('reload')!

enum DelState{
   Right,Other,All,Single
}

const closeTags = (delState:DelState,routeName:string = "desktop")=>{
      const index = state.tagviews.findIndex(res=>res.name === routeName)
      if(index>-1){
         let delTags:Ttag[] = [];
          switch (delState){
            case DelState.All:              
              delTags = state.tagviews.filter(res=>res.name!=="desktop")             
              break;
            case DelState.Other:
              delTags = state.tagviews.filter(res=>res.name!=="desktop" && res.name!==routeName)           
              break;
            case DelState.Right:
              if(index < state.tagviews.length-1){
                delTags = state.tagviews.slice(index+1)   
              }
              break;
            case DelState.Single:
              delTags = [state.tagviews[index]]
              break;
            default:
              throw TypeError('关闭类型错误！')           
          }
          let activeIndexInDel = delTags.findIndex(res=>res.active)  
          let activeIndex = -1 
          if(delState === DelState.Single){
            activeIndex =  activeIndexInDel > -1 ? index-1 : activeIndexInDel
          }else if(delState === DelState.Right || delState === DelState.Other){
            if(activeIndexInDel>-1){
               activeIndex = index
            } 
          }else{
            activeIndex = 0
          }    
          if(activeIndex>-1){
            router.push({name:state.tagviews[activeIndex].name})         
          }   
          commit('delTagview',delTags.map(res=>res.key))             
      }   
}

const contextMenuDisable = (delState:DelState,routeName:string = "desktop")=>{
  let flag = false
  const index = state.tagviews.findIndex(res=>res.name === routeName)
  switch (delState){
    case DelState.Single:
      flag = routeName==="desktop"   
      break;
    case DelState.Right:
      flag = !(index <= state.tagviews.length - 2) ;
      break;
    case DelState.Other:
      const otherTags = state.tagviews.filter(res => res.name !== routeName || routeName !== "desktop")      
      flag = !(routeName === "desktop"?otherTags.length >= 1:otherTags.length > 2)
      break;
    case DelState.All:
      const otherTagsAll = state.tagviews.filter(res => res.name !== "desktop" )
      flag = !(otherTagsAll.length >= 1);
      break;
    default:
        throw TypeError('传入关闭类型错误！')
   }
   return flag
}

 const contextmenu = reactive<{
      show: boolean
      style: { top: string; left: string }
      routeName: RouteRecordName | string
      menu: ContextMenuItemProps[]
    }>({
      show: false,
      style: { top: '0', left: '0' },
      routeName: '',
      menu: [
        {
          label: '刷新',
          onClick: (routeName) => {
            let tagview = state.tagviews.map(res=>res.name)
            tagview = tagview.filter(res=>res!==routeName)

            const reload = {state:false,names:routeName}   

            emitter.emit('reload',reload)

            const index = state.tagviews.findIndex(res=>res.name === routeName)   
            const indexActive = state.tagviews.findIndex(res=>res.active)    

            let curTag = JSON.parse(JSON.stringify(state.tagviews[index]))             
            if (indexActive > -1 && state.tagviews[indexActive].name !== routeName) {
               router.push({ name: routeName })               
            }else{
                commit("addTagview",curTag)
                commit("activeTagview",curTag.key)               
            }
             nextTick(() => {
                reload.state = true
                reload.names = ''
                emitter.emit('reload',reload)
              })
          }
        },
        {
          label: '关闭',
          disabled: (routeName) => contextMenuDisable(DelState.Single,routeName as string),
          onClick: (routeName) => {
            closeTags(DelState.Single,routeName as string) 
          }
        },
        {
          label: '关闭右侧',
          disabled: (routeName) => contextMenuDisable(DelState.Right,routeName as string),
          onClick: (routeName) => {
              closeTags(DelState.Right,routeName as string)                   
          }
        },
        {
          label: '关闭其他',
          disabled: (routeName) => contextMenuDisable(DelState.Other,routeName as string),
          onClick: (routeName) => {
              closeTags(DelState.Other,routeName as string)     
          }
        },
        {
          label: '关闭所有',
          disabled: (routeName) => contextMenuDisable(DelState.All,routeName as string),
          onClick: () => {
             closeTags(DelState.All)     
          }
        }
      ]
    })

const tags = computed({
  get:()=>state.tagviews ,
  set:(value)=>{
    if(value[1].name==='desktop'){
      const desktop = value[1]
       value[1] = value[0]
       value[0] = desktop
     }
    commit('sortTagviews',value)
  }
}) 

 const onTagRightClick = (event: MouseEvent, viewName: RouteRecordName) => {
      contextmenu.style.top = event.clientY + 'px'
      const clientWidth = document.documentElement.clientWidth
      let left = event.clientX
      if(left + 50 > clientWidth){
         left -= 60
      }
      contextmenu.style.left = left + 'px'
      contextmenu.routeName = viewName
      contextmenu.show = true
    }

    //   const onTagMove = (e: any) => {
    //   // 如果是工作台标签，则不允许拖拽
    //   debugger
    //   if (e.relatedContext.element.name == 'desktopIndex') return false
    //   if (e.relatedContext.element.name == 'desktopIndex') return false
    //   if (e.draggedContext.element.name == 'desktop') return false
    //   if (e.draggedContext.element.name == 'desktop') return false
    // }
</script>

<template>
<div class='tagview'>
      <VueDraggableNext
      v-model="tags"      
      animation="300"            
      ghostClass="tag-ghost"
      filter=".no-drag" 
    >
      <!-- <transition-group>        -->
        <a-button v-for="(item,index) in tags" :key="item.key" 
                   @contextmenu.prevent="onTagRightClick($event, item.name)"
                  :class="{'no-drag': item.name === 'desktop' }"   
                  :type="item.active?'primary':'default'" size="small">
            <router-link :to="item.path"> {{$t(item?.name)}}-{{item.name}}  </router-link> 
            <Icon icon="CloseOutlined"  @contextmenu.stop.prevent v-if="item.key!=='3.1'" class="icon" @click="closeTags(DelState.Single,item.name)"/>      
        </a-button>
    <!-- </transition-group> -->
    </VueDraggableNext>
</div>

  <ContextMenu
    v-model:visable="contextmenu.show"
    :menu="contextmenu.menu"
    :route-name="contextmenu.routeName"
    :style="contextmenu.style"
  ></ContextMenu>

</template>

<style lang='scss' scoped>
.tagview{
  &::-webkit-scrollbar{
    height:6px;
    transform: translateY(-6px);
  }
  /* 滚动槽 */
    &::-webkit-scrollbar-track {
      box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
      border-radius:10px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius:10px;
      background:rgba(0,0,0,0.1);
      box-shadow:inset 0 0 6px rgba(0,0,0,0.2);
      &:hover{background:rgba(0,0,0,0.2);}
    }
    // &::-webkit-scrollbar-thumb:window-inactive {
    //   background:rgba(255,0,0,0.4);
    // }
    border-top: solid 1px #eee;
    padding-left:10px;
    max-height: 40px;
    overflow-x: auto;
    overflow-y:hidden ;
    .ant-btn{margin-right: 5px;}
    .ant-btn-primary {
        a{color:white}
        span{color:#ccc !important;
          &:hover{color:white !important;background-color: transparent;}
        }
    }
    ::v-deep(a){font-size:12px;color:currentColor}
    ::v-deep(div[ghostclass=tag-ghost]){    flex-wrap: nowrap;
    display: flex;height:40px;align-items: center;}
    .icon{color:#999 !important;
          font-size:12px;
      &:hover{background-color: #eee;}
    } 
}
.tag-ghost {

    opacity: 0;
  }

</style>