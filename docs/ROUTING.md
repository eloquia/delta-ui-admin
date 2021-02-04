# Routing

Routing in this application needs to be coupled with state management. Basically all the routes are secured except for one. The one page not requiring authorization is the Login page.

---

## Workflow

Starting from the beginning, if anyone tries to reach any routes, check to see if they are "signed in" and "authorized" (in some cases these are the same, but we will keep them distinct for now).

### Initial Redirect & State Management

Regardless of which URL the user ends up using ("/" or "/login" or "/dashboard"), the following should happen:

1. Check sign-in state
   1. Check token in local storage
      1. If token does not exist, pull from API & direct the screen to the view they were intending on going
      2. If API does not return token, then redirect to login
2. Submit credentials on login screen
   1. Hit API and expect to receive a token
      1. If a token is returned, direct user to where they were going or to "/dashboard"
      2. If a token is not returned, keep them on login screen
