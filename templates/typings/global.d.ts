declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module "*.module.less";

// 全局参数定义
declare interface Window {
  process: NodeJS.Process & { type: string | null }
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  __REDUX_DEVTOOLS_EXTENSION__: {
    connect: () => {
      init: () => void
      send: (name: string | object, args: any) => void
      subscribe: (fun: (message: any) => void) => void
    }
    disconnect: () => void
  }
}

type Dictionary<T> = { [key: string]: T }

