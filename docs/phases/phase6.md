# Phase 5: Paintbucket & Color Picker (1 day)

Looking Back:
What happens when you move the brush really fast is that only certain mouse events get triggered, so only a couple of the cells in the hover path gets colored. This isn’t a very big deal, because it’s in the spirit of pixel art to draw slow anyway (if not pixel by pixel). But still, it’s an interesting coding challenge to tackle.

So instead of changing the cell's color on a mousemove event, I am recording the indices of the cells where the mouse events are triggered, and drawing a straight line between them.  Originally, I put this algorithm in the drawing store.  My plan was to let the drawing store handle the changing cells, and then update the canvas component.  However, this was way too slow.  The algorithm worked---the lines were drawn even if you drew very quickly, but there was a whole half-second delay. I eventually moved the logic into a util function, which made changes directly onto the DOM, and then update the drawing store when it finishes rendering the changes.  This feature abandons the Flux cycle, but it works amazingly.  Test it out by drawing really fast!

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil
* RenderFaster

## Gems/Libraries
