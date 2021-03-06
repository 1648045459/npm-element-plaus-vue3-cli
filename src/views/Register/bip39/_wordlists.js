/*
 * @Descripttion:
 * @version:
 * @Author: HFL
 * @Date: 2021-08-20 11:42:51
 * @LastEditors: HFL
 * @LastEditTime: 2021-09-07 13:52:33
 */
"use strict";
// browserify by default only pulls in files that are hard coded in requires
// In order of last to first in this file, the default wordlist will be chosen
// based on what is present. (Bundles may remove wordlists they don't need)
const wordlists = {};
let _default;

try {
  _default = require("./wordlists/czech.json");
  wordlists.czech = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/chinese_simplified.json");
  wordlists.chinese_simplified = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/chinese_traditional.json");
  wordlists.chinese_traditional = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/korean.json");
  wordlists.korean = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/french.json");
  wordlists.french = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/italian.json");
  wordlists.italian = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/spanish.json");
  wordlists.spanish = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/japanese.json");
  wordlists.japanese = _default;
  wordlists.JA = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/portuguese.json");
  wordlists.portuguese = _default;
} catch (err) {
  // xxx
}
try {
  _default = require("./wordlists/english.json");
  wordlists.english = _default;
  wordlists.EN = _default;
} catch (err) {
  // xxx
}
export default {
  wordlists,
  _default
};
