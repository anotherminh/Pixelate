
# FresherNote

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.pixelate.herokuapp.com

## Minimum Viable Product

Pixelate is a simple web application for making and sharing pixel art, built on Ruby on Rails and React.js. The core features include:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, view, edit, and delete pixel drawings
- [ ] Comment and like other users' drawings.
- [ ] Search for users or drawings (by username or title).

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Stand-alone Widget (1.5 day)

I want to get the drawing widget to work on its own, before adding users/ social features. I start with the backend by building a table and model for the canvases. This table will not contain any reference to the user table (that's for later). The canvas will also have a full JSON API.
The front end is about setting up Flux and React views for the drawing. No There will also be one static page that would render the widget's component.
The drawings can be saved to the database (by clicking the save button), but because we don't have users yet, the only way to load the drawings is by navigating to the drawings' show page (/drawings/:id). React Router will help us render the right drawing by fetching the drawing's id from the url.

[Details][phase-one]

### Phase 2: Adding Users & Auth (1.5 days)

In phase 2, I want to make the sign up/log in page, and use BCrypt to implement authorization. Again, I start with the backend by making a model for Users and adding association between users and their drawings. I will have a regular controller for users (for the sign up page) as well as a controller for Sessions. I will also add a JSON API for retrieving info about a specific user, as well as their associated drawings).
The Flux component I'll be working on is the UserDetails component (which renders the user's show page). There, you can view the user's stats (how many drawings they have), as well as view their drawings. One of the drawings will be randomly selected to be rendered in a bigger size than others. Once we implement likes, this larger drawing will be the most liked drawing of the user.

[Details][phase-two]

### Phase 3: Saving/Loading Drawings (1 day)

So we will have a component for the 'edit' button. On hover, this button will appear on top of the drawing's thumbnail. On click, this component will fetch data from the database to render the canvas in the drawing app.
I have to figure out how to prevent unauthorized users from editing other's drawings. I think I will pass the current user to the root React component, and every 'edit'/'delete' options will be rendered or not rendered according to the current user's id. This might involve 'wrapping' certain components inside of "authenticated component" which will handle the re-directing.

[Details][phase-three]

### Phase 4: Likes/Kudos (.5 day)

The thumbnails on the user's show page will have a 'like' button that appears on hover. Only signed in users can like/give kudos to the drawings. And users can only like drawings once.
Backend will include create a table, model, and API controller for 'likes'. Front end is relatively simple, except we have to possibly also wrap the like component in an AuthenticatedComponent (which checks to see if the user is logged in).

[Details][phase-four]

### Phase 5: Comments & Drawing Show Page (1.5 day)

The drawing show page will just render the drawing at full-size, as well as display the info/stats of the drawings (title, artist, how many likes it has, how many comments, and what the comments are).
On the backend, I'll create a table, model, and API controller for comments. Front end involves putting a comment form onto the drawing show page.

[Details][phase-five]

### Phase 6: Browse Page (.5 day)

The browse page is split up into two basic components: the 10 most-liked drawings of the week, and a list of all the drawings submitted by users.

### Phase 7: Navbar & Search page (1 day)

Building the nav bar involves adding a couple of React components and CSS Styling such that it only appears on hover.

The search page will be yet another React component, with two children: the search-input-field, and the search-results components.

### Phase 8: Clean Up and Seed (1 day)
A day of drawing (by me) and crowdsourcing (my friends) for drawings.


### Bonus Features (TBD)
- [ ] Paintbucket for the app
- [ ] Color selection for the drawing app
- [ ] Customize canvas sizes (small, medium, large)
- [ ] Different sizes for the brush/eraser
- [ ] Artist bios
- [ ] Tagging of drawings, so people can more easily search for the relevant drawings
- [ ] Download drawings as png files
- [ ] "undo" via ctrl + z
- [ ] Collaborative drawing


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
