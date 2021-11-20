<script setup lang="ts">
import { M } from '@/typings/login';
import { ref, defineComponent } from 'vue';

</script>
<script lang='ts'>
export default  defineComponent({
    name:'menuSetting',
    data(){
        return {
            a:"111"
        }
    },
    beforeRouteEnter(to,from,next){
       next((vm)=>{
        //    vm.a = "888"
        //    vm.setData(vm.a)
        //    console.log(vm)   
       })
    },
    methods:{
        setData(val:string){
            console.log(val)
        }
    }
});

</script>
<template>
<div>
    菜单
    <a-input></a-input>
</div>
</template>

<style lang='scss' scoped>

</style>