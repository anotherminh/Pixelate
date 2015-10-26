# Phase 3: Giving Kudos (.5 day)

Looking back:
I wanted to render thumbnail buttons according to the user's relationship to the drawing.  If the user has liked the drawing already, the button (which shows on hover) should say "unlike" (and vice versa).  If the user owns the drawing, then we do away with the likes, and show an 'Edit Drawing' button instead.

The trouble I was running into is how to check efficiently whether a user has liked a drawing or not, so that I can render the appropriate button.  Here’s the general structure of the page: The browse page lists a bunch of drawing-thumbnail components.  Each drawing component knows about the users that has liked it.  So, for each drawing, I can iterate over the array of likers, and check to see if the current user’s id is contained within this array.

But that’s an n^2 operation.  I have n drawings on any given page, each with n likers it has to iterate through.  However, after considering the fact that I will be paginating the results, this solution doesn't seem too bad. This is because, only any given page, I will only have to render a fixed number of drawings.  Then, for each of these drawings, I will iterate through their likers and check to see if the current user has liked it. 

## Rails
### Models
* Kudo

### Controllers
* Api::KudosController (create, destroy)

### Views

## Flux
### Views (React Components)

### Stores

### Actions
* ApiActions.receiveBrowseKudo
* ApiActions.decrementBrowseKudo

### ApiUtil
* ApiUtil.giveKudo
* ApiUtil.dislike

## Gems/Libraries
