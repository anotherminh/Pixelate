# Phase 5: Paintbucket & Color Picker (1 day)

Looking Back:
This day was really exciting, as my drawing app now had paintbucket feature! You can now fill large areas of the drawing with a color from the palette.  This was done by using the same algorithm that I used for making Minesweeper (find closest neighbors of the same color as the starting cell, and keep going until it hits a cell of a differently color).  The logic of this tool lives in the Drawing Store (it figures out which cells it needs to color, and then color them, before emitting the changes that forces the component to update).

I also implemented the color wheel (to allow users access to all the possible colors). Html5 has a built in color picker input tag, but the styling doesn’t fit with my app, so most of the work was figuring out how to make the styling work.

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
