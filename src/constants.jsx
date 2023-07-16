import {PiBackspaceBold} from "react-icons/pi";

export const NUMBERS = Array.from({ length: 9 }, (_, index) => index + 1)

export const ICONS_OPS = {
  divide: "÷",
  equal:"=",
  minus:"–",
  plus:"+",
  multi: "×",
  percent:"%",
  brakets: "()",
  clean:"AC",
  delete: <PiBackspaceBold></PiBackspaceBold>,
  point:"●"
}