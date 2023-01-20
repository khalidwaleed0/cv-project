import { React, Component } from "react";

class EducationSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editOn: false,
			itemOpened: false,
			currentEduIndex: -1,
			currentEdu: {
				degree: "",
				school: "",
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
			<div className="education-container section-container">
				<div className="education-section-header section-header">
					<h3>Education</h3>
				</div>
				{this.state.editOn ? (
					<EditEducation
						data={this.props.data}
						itemOpened={this.state.itemOpened}
						currentEdu={this.state.currentEdu}
						currentEduIndex={this.state.currentEduIndex}
						toggleEditMode={this.toggleEditMode}
						closeOpenedItem={this.closeOpenedItem}
						updateEducation={this.props.updateEducation}
					/>
				) : (
					<ViewEducation
						data={this.props.data}
						openEducationItem={this.openEducationItem}
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
	openEducationItem = (index) => {
		this.toggleEditMode();
		this.setState({
			itemOpened: true,
			currentEduIndex: index,
			currentEdu: this.props.data[index],
		});
	};
	closeOpenedItem = () => {
		this.setState({
			itemOpened: false,
			currentEdu: {}
		});
	};
}

class ViewEducation extends Component {
	render() {
		return (
			<div className="education-section-body section-body">
				{this.props.data.map((edu, i) => {
					return (
						<div className="education-item" index={i} key={i}>
							<p>
								{edu.dateStart} &nbsp; {edu.dateEnd}
							</p>
							<p>{edu.degree}</p>
							<button onClick={this.openEducationItem}>Edit</button>
						</div>
					);
				})}
				<button className="btn-add-education" onClick={this.props.toggleEditMode}>
					+ Education
				</button>
			</div>
		);
	}
	openEducationItem = (e) => {
		let currentEduIndex = e.target.parentElement.getAttribute("index");
		this.props.openEducationItem(currentEduIndex);
	};
}
class EditEducation extends Component {
	render() {
		return (
			<form className="form-education-section section-body">
				<div>
					<input id="degree" defaultValue={this.props.currentEdu?.degree} placeholder=" " />
					<span>Degree</span>
				</div>
				<div>
					<input id="school" defaultValue={this.props.currentEdu?.school} placeholder=" " />
					<span>School</span>
				</div>
				<div className="location-container">
					<div>
						<input id="city" defaultValue={this.props.currentEdu?.city} placeholder=" " />
						<span>City</span>
					</div>
					<div>
						<input id="country" defaultValue={this.props.currentEdu?.country} placeholder=" " />
						<span>Country</span>
					</div>
				</div>
				<div className="date-container">
					<div>
						<input id="date-start" defaultValue={this.props.currentEdu?.dateStart} type="month" placeholder=" " />
						<span>Start Date</span>
					</div>
					<div>
						<input id="date-end" defaultValue={this.props.currentEdu?.dateEnd} type="month" placeholder=" " />
						<span>End Date</span>
					</div>
				</div>
				<textarea
					id="description"
					defaultValue={this.props.currentEdu?.description}
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
	}
	delete = () => {
		this.props.data.splice(this.props.currentEduIndex, 1);
		this.props.updateEducation(this.props.data);
		this.props.closeOpenedItem();
		this.props.toggleEditMode();
	};
	submit = (e) => {
		e.preventDefault();
		this.props.toggleEditMode();
		let newEdu = {
			degree: e.target.form.degree.value,
			school: e.target.form.school.value,
			city: e.target.form.city.value,
			country: e.target.form.country.value,
			dateStart: e.target.form["date-start"].value,
			dateEnd: e.target.form["date-end"].value,
			description: e.target.form.description.value,
		};
		if (this.props.itemOpened) {
			this.props.data.splice(this.props.currentEduIndex, 1, newEdu);
		} else this.props.data.push(newEdu);
		this.props.updateEducation(this.props.data);
		this.props.closeOpenedItem();
	};
}
export default EducationSection;
