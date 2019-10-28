export default function getOptionText(opt) {
  if (!opt) return "";
  const text = [opt, opt.text, opt.label, opt.value].find(
    v => typeof v === "string" || typeof v === "number"
  );

  return typeof text === "number" ? text.toString() : text || "";
}
