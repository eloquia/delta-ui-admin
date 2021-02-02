# Delta Admin UI

The Delta Ledger Admin UI separates administrative functionality from the regular UI. This reduces complexity of the initial app--instead of having one project handling two separate concerns, each app can deal with its own specific functionality. Of course this leads to maintainability headaches in the future (keeping up the same styling, REST API/database changes, but it makes sense in the short run and will probably make sense in the long-run too.

This web app will encapsulate all of the functions that a Delta admin will be able to do. This will also allow non-admin users to come in and take a peek at the non-guarded portions of the application.
