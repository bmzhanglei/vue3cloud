<script setup lang="ts">
import { ref, computed, reactive, nextTick, onMounted, watch } from 'vue';
import { useStore } from '@/store';
import { emitter } from '@/utils/bus';
import {  useRouter,useRoute } from 'vue-router'
import type {   RouteRecordName } from 'vue-router';
import type { ContextMenuItemProps } from '@/components/common/typings'
import type {Ttag} from '@/typings/route'
import {DelState} from '../../../typings/enum'
import { VueDraggableNext } from 'vue-draggable-next'
import { useI18n } from 'vue-i18n';
// import screenfull from 'screenfull';
const {t,locale} = useI18n()
const router =  useRouter()
const route =  useRoute()
const {state,commit} = useStore()

const dashboard = "dashboard"

const closeTags = (delState:DelState,routeName:string = dashboard)=>{
      const index = state.tagviews.findIndex(res=>res.name === routeName)
      if(index>-1){
         let delTags:Ttag[] = [];
          switch (delState){
            case DelState.All:              
              delTags = state.tagviews.filter(res=>res.name!==dashboard)             
              break;
            case DelState.Other:
              delTags = state.tagviews.filter(res=>res.name!==dashboard && res.name!==routeName)           
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
              throw TypeError(t("closeTypeError"))           
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
          commit('delTagview',delTags.map(res=>res.name))             
      }   
}

const contextMenuDisable = (delState:DelState,routeName:string = "dashboard")=>{
  let flag = false
  const index = state.tagviews.findIndex(res=>res.name === routeName)
  switch (delState){
    case DelState.Single:
      flag = routeName==="dashboard"   
      break;
    case DelState.Right:
      flag = !(index <= state.tagviews.length - 2) ;
      break;
    case DelState.Other:
      const otherTags = state.tagviews.filter(res => res.name !== routeName || routeName !== "dashboard")      
      flag = !(routeName === "dashboard"?otherTags.length >= 1:otherTags.length > 2)
      break;
    case DelState.All:
      const otherTagsAll = state.tagviews.filter(res => res.name !== "dashboard" )
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
          label:"refresh",
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
                commit("activeTagview",curTag.name)               
            }
             nextTick(() => {
                reload.state = true
                reload.names = ''
                emitter.emit('reload',reload)
              })
          }
        },
        {
          label: "close",
          disabled: (routeName) => contextMenuDisable(DelState.Single,routeName as string),
          onClick: (routeName) => {
            closeTags(DelState.Single,routeName as string) 
          }
        },
        {
          label: 'closeright',
          disabled: (routeName) => contextMenuDisable(DelState.Right,routeName as string),
          onClick: (routeName) => {
              closeTags(DelState.Right,routeName as string)                   
          }
        },
        {
          label: 'closeother',
          disabled: (routeName) => contextMenuDisable(DelState.Other,routeName as string),
          onClick: (routeName) => {
              closeTags(DelState.Other,routeName as string)     
          }
        },
        {
          label: 'closeall',
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
    if(value[1].name==='dashboard'){
      const desktop = value[1]
       value[1] = value[0]
       value[0] = desktop
     }
  
    //  console.log('sortTagviews',value)
    commit('sortTagviews',value)
  }
}) 

watch(route,()=>{
  nextTick(()=>{
      let activeDom:HTMLElement|null = document.querySelector(".tagview .ant-btn-primary")
      activeDom?.scrollIntoView()
  })
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

  // const {proxy} = getCurrentInstance() as ComponentInternalInstance
  const screen = ref('icon-fullscreen')
  const screenTtl = ref(t('fullScreen'))
  const setFullScreen = ()=>{
    commit('setFullScreen',!state.fullScreen)
      screen.value = state.fullScreen?'icon-fullscreen-exit':'icon-fullscreen'
      screenTtl.value = state.fullScreen?t('exitFullScreen'):t('fullScreen')
      // proxy?.$utils.fullScreen(state.fullScreen) 
      // util.fullScreen(state.fullScreen)

      // screenfull.toggle() 
  }

  const keyUp = (e:KeyboardEvent )=>{
     if(e.code=== "Escape"){
          //  console.log(screenfull.isFullscreen)
          // commit('setFullScreen',!state.fullScreen)
          // screen.value = state.fullScreen?'FullscreenExitOutlined':'FullscreenOutlined'
          // screenTtl.value = state.fullScreen?t('exitFullScreen'):t('fullScreen')
     }
  }
  const resize = ()=>{
    //  console.log('screenfull.isFullscreen--->',screenfull.isFullscreen)
    //  if(!screenfull.isFullscreen){
    //          commit('setFullScreen',!state.fullScreen)
    //       screen.value = state.fullScreen?'FullscreenExitOutlined':'FullscreenOutlined'
    //       screenTtl.value = state.fullScreen?t('exitFullScreen'):t('fullScreen')
    //  } 
  }
  onMounted(()=>{
       document.addEventListener('keyup', keyUp)
       window.addEventListener('resize', resize)
  })


</script>

<template>
<div class="tagviewOut">
<div class='tagview'>
      <VueDraggableNext
        v-model="tags"      
        animation="300"            
        ghostClass="tag-ghost"
        filter=".no-drag">
      <!-- <transition-group>  -->
           <a-button v-for="(item,index) in tags" :key="item.name" 
                   @contextmenu.prevent="onTagRightClick($event, item.name as string)"
                  :class="{'no-drag': item.name === 'dashboard' }"   
                  :type="item.active?'primary':'default'" size="small">
            <router-link :to="{name:item.name}"> {{(locale==='zh'?item.title:item.titleEn) || $t(item.locale as string)}} </router-link>            
            <Icon icon="icon-changyong_guanbi" @contextmenu.stop.prevent v-if="item.name!=='dashboard'" class="icon" @click="closeTags(DelState.Single,item.name)"/>      
        </a-button>
    <!-- </transition-group> -->
    </VueDraggableNext>    
</div>
<div class="screen">
   <a-tooltip placement="bottom">
        <template #title>
          <span>{{screenTtl}}</span>
        </template>
         <Icon :icon="screen" @click="setFullScreen" :title="screenTtl"  style="font-size:25px"/> 
   </a-tooltip>
   
</div>
</div>
  <ContextMenu
    v-model:visable="contextmenu.show"
    :menu="contextmenu.menu"
    :route-name="contextmenu.routeName"
    :style="contextmenu.style"
  ></ContextMenu>

</template>

<style lang='scss' scoped>
.tagviewOut{
 position: relative;  
  .screen{
    position: absolute;
    right:0px;
    float:right;
    top:0;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:10;
    height:100%;
    border-top: solid 1px #eee; 
    border-left: solid 1px #eee; 
    &::v-deep(span.anticon){cursor: pointer;}
    &::v-deep(span.anticon:hover){color: #1890ff !important;}
  }
}
.tagview{
  margin-right:40px;
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
    .ant-btn{margin-right: 5px;
      &:first-of-type{padding-right:10px}
    }
    .ant-btn-primary {
        a{color:white}
        span{color:#ccc !important;
          &:hover{color:white !important;background-color: transparent;}
        }
    }
    ::v-deep(a){font-size:12px;color:currentColor;letter-spacing: normal;}
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