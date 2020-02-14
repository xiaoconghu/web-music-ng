/**
 * Created by wh1709040 on 2018/9/19.
 */
export class CommonUtils {
  public static dateFmt(fmt, date) {
    const o = {
      'M+': date.getMonth() + 1,                 // 月份
      'd+': date.getDate(),                    // 日
      'h+': date.getHours(),                   // 小时
      'm+': date.getMinutes(),                 // 分
      's+': date.getSeconds(),                 // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;

  }

  public static getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight
        : document.documentElement.clientHeight;
    } else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight
        : document.documentElement.clientHeight;
    }
    return clientHeight;
  }
}
