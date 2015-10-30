# Pixelate

[Heroku link][heroku]

[heroku]: https://pixelate.herokuapp.com

## Minimum Viable Product

Pixelate is a simple web application for making and sharing pixel art, built on Ruby on Rails and React.js. The core features include:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, edit, and delete pixel drawings
- [ ] Comment and like other users' drawings.
- [ ] Search for users or drawings (by username or title).

### Bonus Features Completed
- [ ] Optimized drawing speed (can handle very fast mouse moves)
- [ ] Paintbucket for the app
- [ ] Color selection for the drawing app
- [ ] Download drawings as png files
- [ ] "undo" via ctrl + z

### To-dos
- [ ] Customize canvas sizes (small, medium, large)
- [ ] Different sizes for the brush/eraser
- [ ] Artist bios
- [ ] Tagging of drawings, so people can more easily search for the relevant drawings
- [ ] Collaborative drawing

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Stand-alone Widget & User Authentication (1 day)

I want to get the drawing widget to work on its own, before adding users/ social features. I start with the backend by building a table and model for the canvases, as well as a table and model for the users. The canvas will also have a full JSON API.
The front end is about setting up Flux and React views for the drawing. There will also be one static page that would render the widget's component.
The drawings can be saved to the database (by clicking the save button).  I'm storing them as a string representation of a one-dimensional array of colors. The canvas that users see and interact with is created by setting a fixed width for the 'canvas' container and float all the pixels left.  The width is calculated by looking at the size of the canvas, which is a part of the drawing object that is stored in the database. For now, I don't allow for different sizes of drawings, but because of the way I have things set up now, allowing for different sizes in the future should be relatively simple.  
The React Router will help us render the right drawing by fetching the drawing's id from the url.

[Details][phase-one]

### Phase 2: Drawing index page & user profiles (1.5 days)

Phase 1 was about making pixel art.  Phase 2 is about laying the foundations for sharing pixel art. I will be implementing the browse page and the user profile page, where you can view all the drawings that other users have made.  The browse page has two sections--the top drawings (most liked), and the rest of the drawings (ordered by most recent). I can't implement the back-end to support actual fetching of the most populate drawings yet, because I've yet to implement the 'like' (or 'kudos', as I plan to call it) features.  The user's page contains just the thumbnails of all the drawings they have made.  

[Details][phase-two]

### Phase 3: Giving Kudos (.5 day)

Time to get fancy with the thumbnails for the drawings (which appears on both the user profile page and the index page). On hover, I want different buttons to appear on top of the drawing's thumbnail. First, there's the 'edit button' drawing, which only appears if the current users owns the drawing.  On click, this component will fetch data from the database to render the canvas in the drawing app.

I have to figure out how to prevent unauthorized users from editing other's drawings. I think I will pass the current user to the root React component, and every 'edit'/'delete' options will be rendered or not rendered according to the current user's id. This might involve 'wrapping' certain components inside of "authenticated component" which will handle the re-directing.

The thumbnails on the user's show page will also have a 'like' button that appears on hover. Only signed in users can like/give kudos to the drawings. And users can only like drawings once (and not at all if you yourself made it).  Backend will include create a table, model, and API controller for 'likes'.

[Details][phase-three]

### Phase 4: Comments, Search, Navigation Menu (1 day)
Comments will involve adding a comments table and model on the back end.  The search function will require a new Search Component, and a Search Results Component, but it will reuse the Draw Thumbnail component that we made for the index and user profile pages.

I want my Navbar to be as nonintrusive as possible, so I plan to implement a pull-down tab that sticks to the top left corner of the screen.

[Details][phase-four]

### Phase 5: Paintbucket & Color Picker (1 day)

The drawing show page will just render the drawing at full-size, as well as display the info/stats of the drawings (title, artist, how many likes it has, how many comments, and what the comments are).
On the backend, I'll create a table, model, and API controller for comments. Front end involves putting a comment form onto the drawing show page.

[Details][phase-five]

### Phase 6: Clean Up, Seed, and Other Bonus Features (4 days)
Once I'm done with the MVP, I plan to implement as many of the bonus features as I can get to.  One of the things I plan to tackle is faster rendering speed for very fast brush strokes.  Every browser has some limitation on how many mouse events get triggered, so if you move the mouse very, very fast, not all the events will be triggered---which means only some of the cells will be colored.

[Details][phase-six]

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
