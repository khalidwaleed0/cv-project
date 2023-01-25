import React, { useState } from "react";

function ExperienceSection(props) {
	const [currentExp, setCurrentExp] = useState({
		jobTitle: "",
		employer: "",
		city: "",
		country: "",
		dateStart: "",
		dateEnd: "",
		description: "",
	});
	const [editOn, setEditMode] = useState(false);
	const [itemOpened, setOpenedItem] = useState(false);
	const [currentExpIndex, setCurrentExpIndex] = useState(-1);
	const toggleEditMode = () => {
		setEditMode(!editOn);
	};
	const openExperienceItem = (index) => {
		toggleEditMode();
		setOpenedItem(true);
		setCurrentExpIndex(index);
		setCurrentExp(props.data[index]);
	};
	const closeOpenedItem = () => {
		setOpenedItem(false);
		setCurrentExp({});
	};
	return (
		<div className="experience-container section-container">
			<div className="experience-section-header section-header">
				<h3>Experience</h3>
			</div>
			{editOn ? (
				<EditExperience
					data={props.data}
					itemOpened={itemOpened}
					currentExp={currentExp}
					currentExpIndex={currentExpIndex}
					toggleEditMode={toggleEditMode}
					closeOpenedItem={closeOpenedItem}
					updateExperience={props.updateExperience}
				/>
			) : (
				<ViewExperience
					data={props.data}
					openExperienceItem={openExperienceItem}
					toggleEditMode={toggleEditMode}
				/>
			)}
		</div>
	);
}

function ViewExperience(props) {
	const openExperienceItem = (e) => {
		let currentExpIndex = e.target.parentElement.getAttribute("index");
		props.openExperienceItem(currentExpIndex);
	};
	return (
		<div className="experience-section-body section-body">
			{props.data.map((exp, i) => {
				return (
					<div className="experience-item" index={i} key={i}>
						<p>
							{exp.dateStart} &nbsp; {exp.dateEnd}
						</p>
						<p>{exp.degree}</p>
						<button onClick={openExperienceItem}>Edit</button>
					</div>
				);
			})}
			<button className="btn-add-experience" onClick={props.toggleEditMode}>
				+ Experience
			</button>
		</div>
	);
}
function EditExperience(props) {
	const cancel = () => {
		props.toggleEditMode();
		props.closeOpenedItem();
	};
	const deleteItem = () => {
		props.data.splice(props.currentExpIndex, 1);
		props.updateExperience(props.data);
		props.closeOpenedItem();
		props.toggleEditMode();
	};
	const submit = (e) => {
		e.preventDefault();
		props.toggleEditMode();
		let newExp = {
			jobTitle: e.target.form.jobTitle.value,
			employer: e.target.form.employer.value,
			city: e.target.form.city.value,
			country: e.target.form.country.value,
			dateStart: e.target.form["date-start"].value,
			dateEnd: e.target.form["date-end"].value,
			description: e.target.form.description.value,
		};
		if (props.itemOpened) {
			props.data.splice(props.currentExpIndex, 1, newExp);
		} else props.data.push(newExp);
		props.updateExperience([...props.data]);
		props.closeOpenedItem();
	};
	return (
		<form className="form-experience-section section-body">
			<div>
				<input id="jobTitle" defaultValue={props.currentExp?.jobTitle} placeholder=" " />
				<span>Job Title</span>
			</div>
			<div>
				<input id="employer" defaultValue={props.currentExp?.employer} placeholder=" " />
				<span>Employer</span>
			</div>
			<div className="location-container">
				<div>
					<input id="city" defaultValue={props.currentExp?.city} placeholder=" " />
					<span>City</span>
				</div>
				<div>
					<input id="country" defaultValue={props.currentExp?.country} placeholder=" " />
					<span>Country</span>
				</div>
			</div>
			<div className="date-container">
				<div>
					<input id="date-start" defaultValue={props.currentExp?.dateStart} type="month" placeholder=" " />
					<span>Start Date</span>
				</div>
				<div>
					<input id="date-end" defaultValue={props.currentExp?.dateEnd} type="month" placeholder=" " />
					<span>End Date</span>
				</div>
			</div>
			<textarea id="description" defaultValue={props.currentExp?.description} placeholder="Description" rows="5" />
			<div className="form-btns-container">
				<button type="submit" onClick={submit}>
					✔️ Save
				</button>
				{props.itemOpened ? (
					<button type="button" onClick={deleteItem}>
						🗑️ Delete
					</button>
				) : (
					""
				)}

				<button type="reset" onClick={cancel}>
					❌ Cancel
				</button>
			</div>
		</form>
	);
}
export default ExperienceSection;
