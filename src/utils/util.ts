// import { Document, HTMLElement } from '@/typings'
import { Menu } from '@/typings/login'
import type {Ttag} from '@/typings/route'
import { AppRouteRecordRaw } from '@/typings/route';
import layOut from "/src/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";
import _ from 'lodash'
const moduless = import.meta.glob('/src/views/**/*.vue') 
console.log('moduless--->',moduless)
const add = (a:number,b:number)=>a+b

const delRest = (origin:Ttag[],delKeys:string[])=>{
    if(delKeys && delKeys.length){
       const index = origin.findIndex((res:Ttag)=>res.name===delKeys[0])
       if(index>=0){
           origin.splice(index,1)
       }
       delKeys.shift()
       delRest(origin,delKeys)
    }    
}

const getBigName = (name: string) =>{
    return name.replace(name[0], name[0].toUpperCase())
}


const toTreeMenu = (data:AppRouteRecordRaw[])=>{
    let parents = data.filter(p=>p.pid == 0)
    let children = data.filter(c=>c.pid != 0)   
    dataToTree(parents,children);
    return parents
    function dataToTree(parents:AppRouteRecordRaw[],children:AppRouteRecordRaw[]) {
        parents.map(p => {
            children.map((c,i)=>{
                if(c.pid === p.id){                     
                    let _children = _.cloneDeep(children)
                    _children.splice(i,1)
                    if(p.children){
                        p.children.push(c)
                    }else{
                        p.children = [c]
                    }                
                    dataToTree([c],_children)
                }
            })
        })
    }
}

const changeComponent = (data:AppRouteRecordRaw[])=>{
    data.forEach(item=>{
        if(typeof item.component === "string" && item.component.includes("@")){
            item.component = moduless[item.component.replace(/@/,'/src')]            
        }else if(item.component === 'RouterView'){
            item.component =  RouterView
        }else{
            item.component = layOut
            // console.log('layOut---')
        }
     
        if(item?.children?.length){
            changeComponent(item.children)
        }
    })
}

export default {
    add,
    delRest,
    getBigName,
    toTreeMenu,
    changeComponent
}