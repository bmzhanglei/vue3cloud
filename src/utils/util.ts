// import { Document, HTMLElement } from '@/typings'
import type {Ttag} from '@/typings/route'

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


//全屏/退出全屏
// type RFSMethodName = 'webkitRequestFullScreen' | 'requestFullscreen' | 'msRequestFullscreen' | 'mozRequestFullScreen';
// type EFSMethodName = 'webkitExitFullscreen' | 'msExitFullscreen' | 'mozCancelFullScreen' | 'exitFullscreen';
// type FSEPropName = 'webkitFullscreenElement' | 'msFullscreenElement' | 'mozFullScreenElement' | 'fullscreenElement';
// type ONFSCPropName = 'onfullscreenchange' | 'onwebkitfullscreenchange' | 'onmozfullscreenchange' | 'MSFullscreenChange';

// const DOC_EL = document.documentElement;

// let RFC_METHOD_NAME: RFSMethodName = 'requestFullscreen';
// let EFS_METHOD_NAME: EFSMethodName = 'exitFullscreen';
// let FSE_PROP_NAME: FSEPropName = 'fullscreenElement';
// let ON_FSC_PROP_NAME: ONFSCPropName = 'onfullscreenchange';

// if (`webkitRequestFullScreen` in DOC_EL) {
//     RFC_METHOD_NAME = 'webkitRequestFullScreen';
//     EFS_METHOD_NAME = 'webkitExitFullscreen';
//     FSE_PROP_NAME = 'webkitFullscreenElement';
//     ON_FSC_PROP_NAME = 'onwebkitfullscreenchange';
// } else if (`msRequestFullscreen` in DOC_EL) {
//     RFC_METHOD_NAME = 'msRequestFullscreen';
//     EFS_METHOD_NAME = 'msExitFullscreen';
//     FSE_PROP_NAME = 'msFullscreenElement';
//     ON_FSC_PROP_NAME = 'MSFullscreenChange';
// } else if (`mozRequestFullScreen` in DOC_EL) {
//     RFC_METHOD_NAME = 'mozRequestFullScreen';
//     EFS_METHOD_NAME = 'mozCancelFullScreen';
//     FSE_PROP_NAME = 'mozFullScreenElement';
//     ON_FSC_PROP_NAME = 'onmozfullscreenchange';
// } else if (!(`requestFullscreen` in DOC_EL)) {
//     throw `当前浏览器不支持Fullscreen API !`;
// }

/**
 * 启用全屏
 * @param  {htmlElement} 元素
 * @param  {FullscreenOptions} 选项
 * @returns {Promise}
 */
// export function beFull(el: HTMLElement = DOC_EL, options?: FullscreenOptions): Promise<void> {
//     // deb ugger
//     return el[RFC_METHOD_NAME](options);
// }

/**
 * 退出全屏
 */
// export function exitFull(): Promise<void> {
//     return document[EFS_METHOD_NAME]();
// }

/**
 * 切换全屏/关闭
 * @param  {HTMLElement} 目标元素
 * @returns {Promise}
 */
//  export function toggleFull(el: HTMLElement = DOC_EL, options?: FullscreenOptions): Promise<void> {
//     if (isFull(el)) {
//         return exitFull();
//     } else {
//         return beFull(el, options)
//     }
// }

/**
 * 元素是否全屏
 * @param {HTMLElement}
 */
//  export function isFull(el: HTMLElement | EventTarget): boolean {
//     return el === document[FSE_PROP_NAME]
// }

/**
 * 当全屏/退出时触发
 * @param  {HTMLElement} 元素
 * @param  {(isFull: boolean) => void} 返回"是否全屏"
 */
//  export function watchFull(el: HTMLElement, callback: (isFull: boolean) => void) {
//     const cancel = () => {
//         el.onfullscreenchange = null;
//     };

//     const handler = (event: Event) => {
//         if (null !== event.target) {
//             callback(isFull(event.target));
//         }
//     }

//     // 这里addEventListener不好使
//     el[ON_FSC_PROP_NAME] = handler;

//     return {
//         cancel
//     }
// }

// const fullScreen = ( fullScreenState:boolean,element: htmlElement = document.documentElement): void =>{
//     let doc:Documents =  document
//     if (element?.requestFullscreen) {
//         !fullScreenState ? doc?.exitFullscreen() : element?.requestFullscreen();
//     } else if (element?.msRequestFullscreen) {
//         !fullScreenState ? doc?.msExitFullscreen() :element?.msRequestFullscreen();
//     }else if (element?.mozRequestFullScreen) {
//         !fullScreenState ? doc?.mozCancelFullScreen() :element?.mozRequestFullScreen();
//     }else if (element?.webkitRequestFullScreen) {
//         !fullScreenState ? doc?.webkitCancelFullScreen() :element?.webkitRequestFullScreen();
//     }
// }

export default {
    add,
    delRest,
    getBigName,
    // fullScreen,
    // toggleFull
}