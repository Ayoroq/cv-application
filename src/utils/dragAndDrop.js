export function useDragAndDrop(containerSelector, onReorder) {
  function dragStart(e, index) {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("text/plain", "");
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
    let placeholderIndex = Array.from(e.currentTarget.children).indexOf(
      placeholder
    );

    // Adjust index if dragging downwards
    if (draggedIndex < placeholderIndex) {
      placeholderIndex--;
    }

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

    // If mouse is over the existing placeholder, do nothing
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

    // Find where to insert the placeholder
    for (const child of container.children) {
      if (child === draggedEntry || child.classList.contains("placeholder"))
        continue;

      const rect = child.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;

      if (event.clientY < midY) {
        // Don't create placeholder just below the dragged item
        if (child.previousElementSibling === draggedEntry) {
          placeholder.remove();
          return;
        }
        container.insertBefore(placeholder, child);
        return;
      }
    }
    // If we're past all items, append to the end
    container.appendChild(placeholder);
  }

  return { dragStart, dragOver, dragLeave, drop, dragEnd };
}
