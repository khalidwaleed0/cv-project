import { React, Component } from "react";
import location from "../images/location.png";
import email from "../images/email.png";
import phone from "../images/phone.png";

class PreviewSection extends Component {
	render() {
		const { personal, education, experience } = this.props.data;
		return (
			<div className="preview-container">
				<PersonalPreview data={personal} />
				<EducationPreview data={education} />
				<ExperiencePreview data={experience} />
			</div>
		);
	}
}

class PersonalPreview extends Component {
	render() {
		return (
			<div className="personal-preview-container">
				<img className="resume-image" src={this.props.data.image} alt="resume"></img>
				<h3>{this.props.data.fullName}</h3>
				<p>{this.props.data.jobTitle}</p>
				<div className="contact-container">
					<div className="location">
						<img src={location} alt="location"></img>
						{this.props.data.address}
					</div>
					<div className="email">
						<img src={email} alt="email"></img>
						{this.props.data.email}
					</div>
					<div className="phone">
						<img src={phone} alt="phone"></img>
						{this.props.data.phone}
					</div>
				</div>
			</div>
		);
	}
}

class EducationPreview extends Component {
	render() {
		return (
			<div className="education-preview-container">
				<p className="education-preview-header">Education</p>
				{this.props.data.map((edu, i) => {
					return (
						<div className="education-info" key={i}>
							<p className="date">
								{edu.dateStart} &nbsp; {edu.dateEnd}
							</p>
							<p className="degree">
								<span className="important-info">{edu.degree}, </span>
								{edu.school}
							</p>
							<p className="country">
								{edu.city}, {edu.country}
							</p>
							<p className="description">{edu.description}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

class ExperiencePreview extends Component {
	render() {
		return (
			<div className="experience-preview-container">
				<p className="experience-preview-header">Experience</p>
				{this.props.data.map((exp, i) => {
					return (
						<div className="experience-info" key={i}>
							<p className="date">
								{exp.dateStart} &nbsp; {exp.dateEnd}
							</p>
							<p className="job">
								<span className="important-info">{exp.jobTitle}, </span>
								{exp.employer}
							</p>
							<p className="country">
								{exp.city}, {exp.country}
							</p>
							<p className="description">{exp.description}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

export default PreviewSection;
