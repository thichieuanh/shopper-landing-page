export default function toggleCollapsibleElement(isCollapsed, elementId) {
  const element = document.getElementById(elementId);
  const sectionHeight = element.scrollHeight;

  // Get height of the content when fully expanded. Since 100% or auto doesn't work for this animation

  /* The scrollHeight property returns the entire height of an element in pixels, including padding,
  but not the border, scrollbar or margin. */

  element.style.height = isCollapsed ? '0px' : `${sectionHeight}px`;
}
