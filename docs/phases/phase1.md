# Phase 1: User Authentication, Note Model and JSON API

Looking back:
First day of capstone project went really well. I was able to implement the drawing widget, as well as the basic authentication needed for my site (users can sign up, log in, or log out). Once authenticated, they have access to the drawing app (which now only has a one-size paint brush and a one-size eraser). Users can also save/load the drawings to the database.

## Rails
### Models
* User
* Drawing

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::DrawingsController (new, create, destroy, index, show, update)

### Views
* users/new.html.erb
* session/new.html.erb
* api/drawings/new.json.jbuilder
* api/drawings/show.json.jbuilder
* static_pages/app.html.erb

## Flux
### Views (React Components)
* App (the uppermost level)
* DrawingApp
* Canvas
* Cell
* Palette
* ColorPicker
* Tools
* Tool

### Stores
* Drawing Store
* Color Store

### Actions
* ApiActions.receiveDrawing
* ApiActions.newDrawingSaved
* PaletteActions
* ToolActions

### ApiUtil
* ApiUtil.saveDrawing
* ApiUtil.loadSavedDrawing
* ApiUtil.loadNewSavedDrawing
* ApiUtil.makeNewDrawing

## Gems/Libraries
* React
* BCrypt
