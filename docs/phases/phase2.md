# Phase 2: Drawing index page & user profiles (1.5 days)

Looking back:
I encountered an interesting problem working on this phase.  For the index and user pages, I have to render the users’ drawings.  However, the drawings are simply divs, with each cell rendered as a div.  Right now, the resolution for each drawing is 50x50.  That’s 2500 divs per drawing, which is fine on the drawing app because we’re only dealing with 2500 divs.  But that number scales poorly, and the time it takes to load 20 drawings on a user’s show page is abysmal.

My solution was to save the drawing in the database as two separate columns. First, we have the array of colors, which allows users to easily go back and edit their drawings.  Then, we would also have a png of the drawing (or more accurately, the data url of the png), to be used for sharing the drawing.  I captured the png of the drawing (which is really just a bunch of divs) by using a library called html2canvas.  This gives me a canvas object, which is easily converted into the string representation of a png.  When I need to fetch the thumbnails for display, I need to only reconstruct the drawing from the data URL (canvas, again, has a native function to do just this).

So if I had to involve so much canvas anyway, why not use canvas from the very beginning?  I think it would've been a lot more complicated to set up the drawing app with canvas---a lot more arithmetic and calculating which cell to render based on the cursor's position.  In the end, I couldn't resist the simplicity of using HTML divs and in-line CSS for the main drawing app.

## Rails
### Models

### Controllers
Api::UsersController

### Views

## Flux
### Views (React Components)
* Browse
* Draw Thumbnails
* UserDetails

### Stores
* DrawingsStore (for handling multiple drawings)
* UserStore

### Actions
* ApiActions.receiveUserDetails
* ApiActions.receiveAllDrawings

### ApiUtil
* ApiUtil.fetchUserDetails
* ApiUtil.fetchBrowsePage

## Gems/Libraries
* Flux Dispatcher
* React Add-ons
* html2canvas
