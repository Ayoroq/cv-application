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
    
    // If mouse is over existing placeholder, don't move it
    if (existingPlaceholder) {
      const placeholderRect = existingPlaceholder.getBoundingClientRect();
      if (
        event.clientY >= placeholderRect.top &&
        event.clientY <= placeholderRect.bottom
      ) {
        return;
      }
    }

    // Check each item to see if mouse is above it
    for (const summary of container.children) {
      if (summary === draggedEntry || summary.classList.contains('placeholder')) continue;
      
      if (summary.getBoundingClientRect().bottom >= event.clientY) {
        // Don't place placeholder right after the dragged item
        if (summary.previousElementSibling === draggedEntry) return;
        
        existingPlaceholder?.remove();
        container.insertBefore(makePlaceholder(draggedEntry), summary);
        return;
      }
    }

    // Mouse is below all items - append to end
    existingPlaceholder?.remove();
    if (container.lastElementChild === draggedEntry) return;
    container.appendChild(existingPlaceholder ?? makePlaceholder(draggedEntry));
  }

  return { dragStart, dragOver, dragLeave, drop, dragEnd };
}
