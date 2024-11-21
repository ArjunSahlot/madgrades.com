import Home from "./pages/Home";
import Course from "./pages/Course";
import Professor from "./pages/Professor";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import About from "./pages/About";
import ToggleDev from "./pages/ToggleDev";
import Explore from "./pages/Explore";
import { Route, Switch } from "react-router";
import React from "react";

export default () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/courses/:uuid" component={Course} />
		<Route path="/professors/:id" component={Professor} />
		<Route path="/explore/:entity?" component={Explore} />
		<Route path="/search" component={Search} />
		<Route path="/about" component={About} />
		<Route path="/toggle_dev" component={ToggleDev} />
		<Route component={NotFound} />
	</Switch>
);
