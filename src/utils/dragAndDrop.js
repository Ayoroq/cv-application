export function useDragAndDrop(containerSelector, onReorder) {
  function dragStart(e, index) {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("dragging");
    e.target.id = "dragged-entry";
  }

  function dragOver(e) {
    const draggedElement = document.getElementById("dragged-entry");
    if (draggedElement && draggedElement.classList.contains("entry-summary")) {
      e.preventDefault();
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
    const placeholderIndex = Array.from(e.currentTarget.children).indexOf(placeholder);
    
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
    const existingPlaceholder = document.querySelector(".placeholder");
    const container = document.querySelector(containerSelector);

    if (existingPlaceholder) {
      const placeholderRect = existingPlaceholder.getBoundingClientRect();
      if (
        placeholderRect.top <= event.clientY &&
        placeholderRect.bottom >= event.clientY
      ) {
        return;
      }
    }

    for(const summary of container.children){
      if (summary === draggedEntry) continue;
      const summaryRect = summary.getBoundingClientRect();
      if (summaryRect.bottom >= event.clientY) {
        existingPlaceholder?.remove();
        const placeholder = makePlaceholder(draggedEntry);
        container.insertBefore(placeholder, summary);
        return;
      }
    }
    
    existingPlaceholder?.remove();
    if (container.lastElementChild === draggedEntry) return;
    container.appendChild(existingPlaceholder ?? makePlaceholder(draggedEntry));
  }

  return { dragStart, dragOver, dragLeave, drop, dragEnd };
}