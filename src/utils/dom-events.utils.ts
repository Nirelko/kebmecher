export function cancelPropagation(event: MouseEvent) {
    event.stopPropagation();
}

export function createMouseEvent(mouseEventParams: MouseEvent): MouseEvent {
    const clickEvent  = document.createEvent ('MouseEvents');

    const {
        type,
        cancelBubble,
        cancelable,
        view,
        detail,
        screenX,
        screenY,
        clientX,
        clientY,
        ctrlKey,
        altKey,
        shiftKey,
        metaKey,
        button,
        relatedTarget
    } = mouseEventParams;

    clickEvent.initMouseEvent(
        type,
        cancelBubble,
        cancelable,
        view,
        detail,
        screenX,
        screenY,
        clientX,
        clientY,
        ctrlKey,
        altKey,
        shiftKey,
        metaKey,
        button,
        relatedTarget
    );

    return clickEvent;
}