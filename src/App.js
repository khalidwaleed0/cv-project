import { useState } from "react";
import PersonalSection from "./components/PersonalSection.js";
import EducationSection from "./components/EducationSection.js";
import ExperienceSection from "./components/ExperienceSection.js";
import PreviewSection from "./components/PreviewSection.js";
import "./styles/style.css";
import profile from "./images/profile.png";

function App() {
	const [personal, updatePersonalSection] = useState({
		image: profile,
		fullName: "",
		jobTitle: "",
		email: "",
		phone: "",
		address: "",
	});
	const [education, updateEducation] = useState([]);
	const [experience, updateExperience] = useState([]);
	return (
		<div className="App">
			<header>
				<h1>Resume Builder</h1>
			</header>
			<main>
				<div className="sections-container">
					<PersonalSection data={personal} updatePersonalSection={updatePersonalSection} />
					<EducationSection data={education} updateEducation={updateEducation} />
					<ExperienceSection data={experience} updateExperience={updateExperience} />
				</div>

				<PreviewSection personal={personal} education={education} experience={experience} />
			</main>
		</div>
	);
}

export default App;
