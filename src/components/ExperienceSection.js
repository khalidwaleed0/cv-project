import { React, Component } from "react";

class ExperienceSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editOn: false,
			itemOpened: false,
			currentExpIndex: -1,
			currentExp: {
				jobTitle: "",
				employer: "",
				city: "",
				country: "",
				dateStart: "",
				dateEnd: "",
				description: "",
			},
		};
	}
	render() {
		return (
			<div className="experience-container section-container">
				<div className="experience-section-header section-header">
					<h3>Experience</h3>
				</div>
				{this.state.editOn ? (
					<EditExperience
						data={this.props.data}
						itemOpened={this.state.itemOpened}
						currentExp={this.state.currentExp}
						currentExpIndex={this.state.currentExpIndex}
						toggleEditMode={this.toggleEditMode}
						closeOpenedItem={this.closeOpenedItem}
						updateExperience={this.props.updateExperience}
					/>
				) : (
					<ViewExperience
						data={this.props.data}
						openExperienceItem={this.openExperienceItem}
						toggleEditMode={this.toggleEditMode}
					/>
				)}
			</div>
		);
	}
	toggleEditMode = () => {
		this.setState({
			editOn: !this.state.editOn,
		});
	};
	openExperienceItem = (index) => {
		this.toggleEditMode();
		this.setState({
			itemOpened: true,
			currentExpIndex: index,
			currentExp: this.props.data[index],
		});
	};
	closeOpenedItem = () => {
		this.setState({
			itemOpened: false,
			currentExp: {},
		});
	};
}

class ViewExperience extends Component {
	render() {
		return (
			<div className="experience-section-body section-body">
				{this.props.data.map((Exp, i) => {
					return (
						<div className="experience-item" index={i} key={i}>
							<p>
								{Exp.dateStart} &nbsp; {Exp.dateEnd}
							</p>
							<p>{Exp.jobTitle}</p>
							<button onClick={this.openExperienceItem}>Edit</button>
						</div>
					);
				})}
				<button className="btn-add-experience" onClick={this.props.toggleEditMode}>
					+ Experience
				</button>
			</div>
		);
	}
	openExperienceItem = (e) => {
		let currentExpIndex = e.target.parentElement.getAttribute("index");
		this.props.openExperienceItem(currentExpIndex);
	};
}
class EditExperience extends Component {
	render() {
		return (
			<form className="form-experience-section section-body">
				<div>
					<input id="jobTitle" defaultValue={this.props.currentExp?.jobTitle} placeholder=" " />
					<span>Job Title</span>
				</div>
				<div>
					<input id="employer" defaultValue={this.props.currentExp?.employer} placeholder=" " />
					<span>Employer</span>
				</div>
				<div className="location-container">
					<div>
						<input id="city" defaultValue={this.props.currentExp?.city} placeholder=" " />
						<span>City</span>
					</div>
					<div>
						<input id="country" defaultValue={this.props.currentExp?.country} placeholder=" " />
						<span>Country</span>
					</div>
				</div>
				<div className="date-container">
					<div>
						<input id="date-start" defaultValue={this.props.currentExp?.dateStart} type="month" placeholder=" " />
						<span>Start Date</span>
					</div>
					<div>
						<input id="date-end" defaultValue={this.props.currentExp?.dateEnd} type="month" placeholder=" " />
						<span>End Date</span>
					</div>
				</div>
				<textarea
					id="description"
					defaultValue={this.props.currentExp?.description}
					placeholder="Description"
					rows="5"
				/>
				<div className="form-btns-container">
					<button type="submit" onClick={this.submit}>
						✔️ Save
					</button>
					{this.props.itemOpened ? (
						<button type="button" onClick={this.delete}>
							🗑️ Delete
						</button>
					) : (
						""
					)}

					<button type="reset" onClick={this.cancel}>
						❌ Cancel
					</button>
				</div>
			</form>
		);
	}
	cancel = () => {
		this.props.toggleEditMode();
		this.props.closeOpenedItem();
	};
	delete = () => {
		this.props.data.splice(this.props.currentExpIndex, 1);
		this.props.updateExperience(this.props.data);
		this.props.closeOpenedItem();
		this.props.toggleEditMode();
	};
	submit = (e) => {
		e.preventDefault();
		this.props.toggleEditMode();
		let newExp = {
			jobTitle: e.target.form.jobTitle.value,
			employer: e.target.form.employer.value,
			city: e.target.form.city.value,
			country: e.target.form.country.value,
			dateStart: e.target.form["date-start"].value,
			dateEnd: e.target.form["date-end"].value,
			description: e.target.form.description.value,
		};
		if (this.props.itemOpened) {
			this.props.data.splice(this.props.currentExpIndex, 1, newExp);
		} else this.props.data.push(newExp);
		this.props.updateExperience(this.props.data);
		this.props.closeOpenedItem();
	};
}
export default ExperienceSection;
