import { Menu } from '@/typings/login'
import type {Ttag} from '@/typings/route'
import { AppRouteRecordRaw } from '@/typings/route';
import layOut from "@/layout/index.vue";
import RouterView from "@/layout/RouterView.vue";
import { RouteMeta } from 'vue-router';
const moduless = import.meta.glob('/src/views/**/*.vue') 
// console.log('moduless--->',moduless)

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
    let parents = data.filter(p=>{
        let p1 = (p.meta as RouteMeta).pid as number 
        return p1 == 0
    })
    let children = data.filter(c=>{
        let c1 = (c.meta as RouteMeta).pid as number 
        return c1 != 0
    }).sort((a,b)=>{
        let a1 = (a.meta as RouteMeta).sort as number 
        let b1 = (b.meta as RouteMeta).sort as number
        return a1 - b1
    })   
    dataToTree(parents,children);
    return parents
    function dataToTree(parents:AppRouteRecordRaw[],children:AppRouteRecordRaw[]) {
        parents.map(p => {
            let pid = (p.meta as RouteMeta).id as number 
            children.map((c,i)=>{
                let cpid = (c.meta as RouteMeta).pid as number 
                if(cpid === pid){                     
                    let _children = JSON.parse(JSON.stringify(children))
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
        }else{
            item.component =  RouterView
        }
        if(item?.children?.length){
            changeComponent(item.children)
        }
    })
}

export default {
    delRest,
    getBigName,
    toTreeMenu,
    changeComponent
}