export function calculateOnZoneLocation(drawableZoneRectangle: DOMRect, event: MouseEvent) {
    return {
        x: event.clientX - drawableZoneRectangle.x,
        y: event.clientY - drawableZoneRectangle.y
    };
}