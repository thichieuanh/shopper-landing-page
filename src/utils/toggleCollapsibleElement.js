export default function toggleCollapsibleElement(isCollapsed, elementId) {
  const element = document.getElementById(elementId);
  // const padding = window.getComputedStyle(element, null).getPropertyValue('padding')
  // const sectionHeight = element.scrollHeight + parseFloat(padding) * 2;
  const sectionHeight = element.scrollHeight;

  // Get height of the content when fully expanded. Since 100% or auto doesn't work for this animation

  /* The scrollHeight property returns the entire height of an element in pixels, including padding,
  but not the border, scrollbar or margin. */

  element.style.height = isCollapsed ? '0px' : `${sectionHeight}px`;
}
