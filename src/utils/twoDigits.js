export default function twoDigits(value) {
  if (value.toString().length <= 1) {
    return '0' + value.toString();
  }
  return value.toString();
}
