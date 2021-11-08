import type {Ttag} from '@/typings/route'

const add = (a:number,b:number)=>a+b

const delRest = (origin:Ttag[],delKeys:string[])=>{
    if(delKeys && delKeys.length){
       const index = origin.findIndex((res:Ttag)=>res.key===delKeys[0])
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

const fullScreen = ( fullScreenState:boolean,element: HTMLElement | Element = document.documentElement): void =>{
    if (element.requestFullscreen) {
        !fullScreenState ? document.exitFullscreen() : element.requestFullscreen();
    }else if (element.msRequestFullscreen) {
        !fullScreenState ? document.msExitFullscreen() :element.msRequestFullscreen();
    }else if (element.mozRequestFullScreen) {
        !fullScreenState ? document.mozCancelFullScreen() :element.mozRequestFullScreen();
    }else if (element.webkitRequestFullScreen) {
        !fullScreenState ? document.webkitCancelFullScreen() :element.webkitRequestFullScreen();
    }
}

export default {
    add,
    delRest,
    getBigName,
    fullScreen
}