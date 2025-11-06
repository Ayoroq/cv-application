export function useDragAndDrop(containerSelector, onReorder) {
  function dragStart(e, index) {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("text/plain", ""); // Necessary for Firefox
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("dragging");
    e.target.id = "dragged-entry";
  }

  function dragOver(e) {
    e.preventDefault();
    const draggedElement = document.getElementById("dragged-entry");
    if (draggedElement && draggedElement.classList.contains("entry-summary")) {
      movePlaceholder(e);
    }
  }

  function dragLeave(e) {
    // If we are moving into a child element, we aren't actually leaving
    const container = e.currentTarget;
    if (container.contains(e.relatedTarget)) return;
    const placeholder = container.querySelector(".placeholder");
    placeholder?.remove();
  }

  function drop(e) {
    e.preventDefault();
    const draggedEntry = document.getElementById("dragged-entry");
    const placeholder = e.currentTarget.querySelector(".placeholder");
    if (!placeholder || !draggedEntry) return;

    const draggedIndex = parseInt(e.dataTransfer.getData("index"));
    const placeholderIndex = Array.from(e.currentTarget.children).indexOf(
      placeholder
    );

    onReorder(draggedIndex, placeholderIndex);
    placeholder.remove();
  }

  function dragEnd(e) {
    e.target.removeAttribute("id");
    e.target.classList.remove("dragging");
  }

  function makePlaceholder(draggedEntry) {
    const placeholder = document.createElement("li");
    placeholder.classList.add("placeholder");
    placeholder.style.height = `${draggedEntry.offsetHeight}px`;
    return placeholder;
  }

  function movePlaceholder(event) {
    const draggedEntry = document.getElementById("dragged-entry");
    const container = document.querySelector(containerSelector);
    if (!container || !draggedEntry) return;

    const existingPlaceholder = container.querySelector(".placeholder");
    if (existingPlaceholder) {
      const placeholderRect = existingPlaceholder.getBoundingClientRect();
      if (
        event.clientY >= placeholderRect.top &&
        event.clientY <= placeholderRect.bottom
      ) {
        return;
      }
    }

    const placeholder = existingPlaceholder ?? makePlaceholder(draggedEntry);

    for (const child of container.children) {
      if (child === draggedEntry || child.classList.contains("placeholder"))
        continue;

      const rect = child.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;

      if (event.clientY < midY) {
        // Prevent placeholder from appearing before the dragged element
        if (child.previousElementSibling === draggedEntry) {
          placeholder.remove();
          return;
        }
        container.insertBefore(placeholder, child);
        return;
      }
    }

    // Do not append placeholder if dragging the last element
    if (container.lastElementChild === draggedEntry) return;
    container.appendChild(placeholder);
  }

  return { dragStart, dragOver, dragLeave, drop, dragEnd };
}
