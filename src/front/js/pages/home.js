import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
				<a href="https://3000-4geeksacade-reactflaskh-z049cqz9ken.ws-eu77.gitpod.io/signup">
					Signup
				</a><br></br>
				<a href="https://3000-4geeksacade-reactflaskh-z049cqz9ken.ws-eu77.gitpod.io/login">
					Login
				</a><br></br>
				<a href="https://3000-4geeksacade-reactflaskh-z049cqz9ken.ws-eu77.gitpod.io/private">
					Private
				</a><br></br>
		</div>
	);
};
