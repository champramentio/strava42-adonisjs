"use strict";

const UserService = use("App/Services/UserService");
const EventEmitter = use("Event");

EventEmitter.on("user::connected", data => {
	//trigger several actions needed when a user is connected
	UserService.getConnected(data);
});
