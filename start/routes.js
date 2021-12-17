"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const MongoClient = use("MongoClient");
const StravaService = use("App/Services/StravaService");
const api_prefix = "api/v1";
const admin_prefix = "admin";

//api for app
Route.group("coreApi", () => {
	Route.get("/activities", "ActivityController.getList");
	Route.post("/activities", "ActivityController.postAdd");

	Route.post("/auth", "AuthController.postConnect");
	Route.post("/refresh_token", "AuthController.postRefreshToken");
	Route.post("/logout", "AuthController.postDisconnect");
}).prefix(api_prefix);

//admin
Route.group("adminApi", () => {
	Route.get("/users", "UserController.getAllList");
	Route.get("/activities", "ActivityController.getAllList");
}).prefix(admin_prefix);
