import getOptionText from "../utils/getOptionText";
import isStatic from "../utils/isStatic";

export default function filterByMatchingTextWithThreshold(threshold) {
  return (options, value) => {
    if (!value || (threshold && options.length < threshold)) return options;
    value = value.toString().toLowerCase();

    return options.filter(opt => {
      return (
        isStatic(opt) ||
        getOptionText(opt)
          .toString()
          .toLowerCase()
          .indexOf(value) !== -1
      );
    });
  };
}
