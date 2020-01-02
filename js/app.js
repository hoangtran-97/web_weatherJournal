const sections = document.querySelectorAll(".section")
const navigationBar = document.getElementById("navigation")
const navigationFragment = document.createDocumentFragment();

sections.forEach((section) => {
    const anchor = document.createElement("a");
    const anchorText = document.createTextNode(section.id);
    anchor.appendChild(anchorText);
    anchor.href = `#${section.id}`;
    anchor.id = `navigation-${section.id}`
    navigationFragment.appendChild(anchor);
})
navigationBar.appendChild(navigationFragment);