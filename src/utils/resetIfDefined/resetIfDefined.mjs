export default function resetIfDefined(src, dest, prop) {
  if (typeof src !== "undefined") dest[prop] = src;
}
