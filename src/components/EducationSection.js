import React, { useState } from "react";

function EducationSection(props) {
	const [currentEdu, setCurrentEdu] = useState({
		degree: "",
		school: "",
		city: "",
		country: "",
		dateStart: "",
		dateEnd: "",
		description: "",
	});
	const [editOn, setEditMode] = useState(false);
	const [itemOpened, setOpenedItem] = useState(false);
	const [currentEduIndex, setCurrentEduIndex] = useState(-1);
	const toggleEditMode = () => {
		setEditMode(!editOn);
	};
	const openEducationItem = (index) => {
		toggleEditMode();
		setOpenedItem(true);
		setCurrentEduIndex(index);
		setCurrentEdu(props.data[index]);
	};
	const closeOpenedItem = () => {
		setOpenedItem(false);
		setCurrentEdu({});
	};
	return (
		<div className="education-container section-container">
			<div className="education-section-header section-header">
				<h3>Education</h3>
			</div>
			{editOn ? (
				<EditEducation
					data={props.data}
					itemOpened={itemOpened}
					currentEdu={currentEdu}
					currentEduIndex={currentEduIndex}
					toggleEditMode={toggleEditMode}
					closeOpenedItem={closeOpenedItem}
					updateEducation={props.updateEducation}
				/>
			) : (
				<ViewEducation data={props.data} openEducationItem={openEducationItem} toggleEditMode={toggleEditMode} />
			)}
		</div>
	);
}

function ViewEducation(props) {
	const openEducationItem = (e) => {
		let currentEduIndex = e.target.parentElement.getAttribute("index");
		props.openEducationItem(currentEduIndex);
	};
	return (
		<div className="education-section-body section-body">
			{props.data.map((edu, i) => {
				return (
					<div className="education-item" index={i} key={i}>
						<p>
							{edu.dateStart} &nbsp; {edu.dateEnd}
						</p>
						<p>{edu.degree}</p>
						<button onClick={openEducationItem}>Edit</button>
					</div>
				);
			})}
			<button className="btn-add-education" onClick={props.toggleEditMode}>
				+ Education
			</button>
		</div>
	);
}
function EditEducation(props) {
	const cancel = () => {
		props.toggleEditMode();
		props.closeOpenedItem();
	};
	const deleteItem = () => {
		props.data.splice(props.currentEduIndex, 1);
		props.updateEducation(props.data);
		props.closeOpenedItem();
		props.toggleEditMode();
	};
	const submit = (e) => {
		e.preventDefault();
		props.toggleEditMode();
		let newEdu = {
			degree: e.target.form.degree.value,
			school: e.target.form.school.value,
			city: e.target.form.city.value,
			country: e.target.form.country.value,
			dateStart: e.target.form["date-start"].value,
			dateEnd: e.target.form["date-end"].value,
			description: e.target.form.description.value,
		};
		if (props.itemOpened) {
			props.data.splice(props.currentEduIndex, 1, newEdu);
		} else props.data.push(newEdu);
		props.updateEducation([...props.data]);
		props.closeOpenedItem();
	};
	return (
		<form className="form-education-section section-body">
			<div>
				<input id="degree" defaultValue={props.currentEdu?.degree} placeholder=" " />
				<span>Degree</span>
			</div>
			<div>
				<input id="school" defaultValue={props.currentEdu?.school} placeholder=" " />
				<span>School</span>
			</div>
			<div className="location-container">
				<div>
					<input id="city" defaultValue={props.currentEdu?.city} placeholder=" " />
					<span>City</span>
				</div>
				<div>
					<input id="country" defaultValue={props.currentEdu?.country} placeholder=" " />
					<span>Country</span>
				</div>
			</div>
			<div className="date-container">
				<div>
					<input id="date-start" defaultValue={props.currentEdu?.dateStart} type="month" placeholder=" " />
					<span>Start Date</span>
				</div>
				<div>
					<input id="date-end" defaultValue={props.currentEdu?.dateEnd} type="month" placeholder=" " />
					<span>End Date</span>
				</div>
			</div>
			<textarea id="description" defaultValue={props.currentEdu?.description} placeholder="Description" rows="5" />
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
export default EducationSection;
