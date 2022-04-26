import { AnyObject } from "./types";

/**
 * 类型检查
 */

export function typeCheck(param: any) {
  return Object.prototype.toString.call(param);
}

/**
 * 批量修改stage
 */
export function mutateState(state: AnyObject, payload: AnyObject) {
  if (
    typeCheck(state) === '[object Object]' &&
    typeCheck(payload) === '[object Object]'
  ) {
    for (const key in payload) {
      state[key] = payload[key];
    }
  } else {
    console.error('expected plain Object');
  }
}

/**
 * @name: 16进制转化为10进制整数
 * @test: test font
 * @msg:
 * @param {*} hex  16进制字符串
 * @return {*}
 */
export function hex2int(hex: any) {
  const len = hex.length,
    a = new Array(len);
  let code = 0;
  for (let i = 0; i < len; i++) {
    code = hex.charCodeAt(i);
    if (48 <= code && code < 58) {
      code -= 48;
    } else {
      code = (code & 0xdf) - 65 + 10;
    }
    a[i] = code;
  }

  return a.reduce(function (acc, c) {
    acc = 16 * acc + c;
    return acc;
  }, 0);
}

// 千分位
export function formatNumber(num: any, fixed: any) {
  if (num >= 0 && num != null && num != undefined) {
    //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
    num =
      typeof num === 'number'
        ? num.toString().replace(/\$|,/g, '')
        : typeof num === 'string'
        ? num.replace(/\$|,/g, '')
        : num.toString().replace(/\$|,/g, '');
    //如果num不是数字，则将num置0，并返回
    if ('' == num || isNaN(num)) {
      return 'Not a Number ! ';
    }
    //如果num是负数，则获取她的符号
    const sign = num.indexOf('-') > 0 ? '-' : '';
    //如果存在小数点，则获取数字的小数部分
    let cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
    cents = cents.length > 1 ? cents : ''; //注意：这里如果是使用change方法不断的调用，小数是输入不了的
    //获取数字的整数数部分
    num = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')) : num;
    //如果没有小数点，整数部分不能以0开头
    if ('' == cents) {
      if (num.length > 1 && '0' == num.substr(0, 1)) {
        return 'Not a Number ! ';
      }
    }
    //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
    else {
      if (num.length > 1 && '0' == num.substr(0, 1)) {
        return 'Not a Number ! ';
      }
    }
    //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
    /*
                  也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
                  字符串长度为0/1/2/3时都不用添加
                  字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
                 */
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num =
        num.substring(0, num.length - (4 * i + 3)) +
        ',' +
        num.substring(num.length - (4 * i + 3));
    }
    //将数据（符号、整数部分、小数部分）整体组合返回
    if (fixed === true || fixed === 'true') {
      // 取整
      return sign + num;
    } else {
      // 保留小数
      return sign + num + cents;
    }
  } else {
    return '';
  }
}

/**
 * @name: 数组元素相加
 * @test: test font
 * @msg:
 * @param {*} arr 数组
 * @return {*}
 */
function sum(arr: number[]) {
  if (arr && arr.length) {
    return arr.reduce(function (a, b) {
      return a + b;
    }, 0);
  } else {
    return 0;
  }
}

/**
 * @name: 对数组对象内的某个属性相加
 * @test: test font
 * @msg:
 * @param {*} column 数组对象
 * @return {*}
 */
export function calculateWidth(column: any) {
  const arr = column.map((it: any) =>
    it.width || it.minWidth ? parseInt(it.width || it.minWidth) : 80
  );
  return sum(arr);
}

/**
 * @name: 多少时间前（多少秒前，多少分钟前，多少小时前，多少天前，大于7天全部显示7天前）
 * @test: test font
 * @msg:
 * @param {*} hisTime 历史时间戳
 * @param {*} nowTime 当前时间戳，可选填，默认当前事件
 * @return {*}
 */

export function timeAgo(hisTime: number, nowTime: number) {
  const now = nowTime ? nowTime : new Date().getTime();
  const diffValue = now - hisTime;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const _day = diffValue / day;
  const _hour = diffValue / hour;
  const _min = diffValue / minute;
  const _seconds = diffValue / 1000;

  if (_day > 7) {
    return '7' + '天前';
  } else if (_day >= 1 && _day <= 7) {
    return _day.toFixed(0) + '天前';
  } else if (_hour >= 1) {
    return _hour.toFixed(0) + '小时前';
  } else if (_min >= 1) {
    return _min.toFixed(0) + '分钟前';
  } else if (_seconds < 60) {
    return _seconds.toFixed(0) + '秒前';
  } else {
    return '';
  }
}

/**
 * @name:字节转化
 * @test: test font
 * @msg:
 * @param {*} val  需要转化的数字 int
 * @param {*} fixNum 保留的小数位数  int
 * @return {*}
 */
export function filterBite(val:any, fixNum:any) {
  if (fixNum < 0) {
    fixNum = 0;
  }
  // val: 字节 B
  if (val === '' || val === undefined) {
    return '';
  } else if (val === 0) {
    return '0 B';
  } else {
    const kb = 1024;
    const mb = 1024 * 1024;
    const gb = 1024 * 1024 * 1024;
    const tb = 1024 * 1024 * 1024 * 1024;
    const pb = 1024 * 1024 * 1024 * 1024 * 1024;
    const eb = 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
    const zb = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
    if (val < kb) {
      return val.toFixed(fixNum) + ' B';
    } else if (val >= kb && val < mb) {
      return (val / kb).toFixed(fixNum) + ' KB';
    } else if (val >= mb && val < gb) {
      return (val / mb).toFixed(fixNum) + ' MB';
    } else if (val >= gb && val < tb) {
      return (val / gb).toFixed(fixNum) + ' GB';
    } else if (val >= tb && val < pb) {
      return (val / tb).toFixed(fixNum) + ' TB';
    } else if (val >= pb && val < eb) {
      return (val / pb).toFixed(fixNum) + ' PB';
    } else if (val >= eb && val < zb) {
      return (val / eb).toFixed(fixNum) + ' EB';
    } else if (val >= zb) {
      return (val / zb).toFixed(fixNum) + ' ZB';
    }
  }
}
/**
 * @name:日期格式化
 * @test: test font
 * @msg:
 * @param {*} date  日期参数，Date类型
 * @param {*} format 精确到天：1；精确到分：2
 * @param {*} delimiter 日期分隔符 2012-12-12 分隔符 -
 * @return {*}
 */
export function getCurrentDate(date:any, format:any, delimiter:any) {
  if (!delimiter) delimiter = '.';
  const now = date;
  const year = now.getFullYear(); // 得到年份
  let month = now.getMonth(); // 得到月份
  let day = now.getDate(); // 得到日期
  let hour = now.getHours(); // 得到小时
  let minu = now.getMinutes(); // 得到分钟
  let sec = now.getSeconds(); // 得到秒
  month = month + 1;
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hour < 10) hour = '0' + hour;
  if (minu < 10) minu = '0' + minu;
  if (sec < 10) sec = '0' + sec;
  let time = '';
  // 精确到天
  if (format === 1) {
    time = year + delimiter + month + delimiter + day;
  } else if (format === 2) {
    // 精确到分
    time =
      year +
      delimiter +
      month +
      delimiter +
      day +
      ' ' +
      hour +
      ':' +
      minu +
      ':' +
      sec;
  }
  return time;
}

/**
 * @name: 钱包metamask 地址 省略格式
 * @test: test font
 * @msg:
 * @param {*} accounts
 * @return {*}
 */
export function showAccounts(accounts:string) {
  if (!accounts) return '';
  if (accounts.length >= 42) {
    const data =
      accounts.substr(0, 6) + '…' + accounts.substr(accounts.length - 4);
    return data;
  }
  return '';
}
