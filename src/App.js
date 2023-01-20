import { Component } from "react";
import PersonalSection from "./components/PersonalSection.js";
import EducationSection from "./components/EducationSection.js";
import ExperienceSection from "./components/ExperienceSection.js";
import PreviewSection from "./components/PreviewSection.js";
import "./styles/style.css";
import profile from "./images/profile.png";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			personal: {
				image: profile,
				fullName: "",
				jobTitle: "",
				email: "",
				phone: "",
				address: "",
			},
			education: [],
			experience: [],
		};
	}
	render() {
		return (
			<div className="App">
				<header>
					<h1>Resume Builder</h1>
				</header>
				<main>
					<div className="sections-container">
						<PersonalSection data={this.state.personal} updatePersonalSection={this.updatePersonalSection} />
						<EducationSection data={this.state.education} updateEducation={this.updateEducation} />
						<ExperienceSection data={this.state.experience} updateExperience={this.updateExperience} />
					</div>
					<PreviewSection data={this.state} />
				</main>
			</div>
		);
	}
	updatePersonalSection = (newInfo) => {
		this.setState({
			personal: newInfo,
		});
	};
	updateEducation = (edu) => {
		this.setState({
			education: edu,
		});
	};
	updateExperience = (exp) => {
		this.setState({
			experience: exp,
		});
	};
}

export default App;
