/*
  使用更精确的类型替代字符串类型
  map 数组对象 key 的 Date 类型
*/

interface Album {
  artist: string; // 艺术家
  title: string; // 专辑标题
  releaseDate: Date; // 发行日期：YYYY-MM-DD
  recordingType: "studio" | "live"; // 录制类型："live" 或 "studio"
}

// 源数组
const albums:Album[] = [
  {
    artist: "Michael Jackson",
    title: "Dangerous",
    releaseDate: new Date("1991-11-31"),
    recordingType: "studio",
  },
  {
    artist: "Eminem",
    title: "Beautiful",
    releaseDate: new Date("2018-10-06"),
    recordingType: "live",
  },
  {
    artist: "Adele",
    title: "Hello",
    releaseDate: new Date("2019-06-10"),
    recordingType: "studio",
  },
];

// 目标数组
const pluck = <T, K extends keyof T>(record: T[], key: K): T[K][] => record.map((r) => r[key])

const releaseDateArr = pluck(albums, 'releaseDate');

export enum StatusOptions {
  Fine = 10,
  Urgent = 100,
}
export const StatusLevelValueSet = new Set([StatusOptions.Fine, StatusOptions.Urgent]);

console.log(releaseDateArr, StatusLevelValueSet);
