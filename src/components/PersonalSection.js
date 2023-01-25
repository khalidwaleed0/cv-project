import React, { useState } from "react";

function PersonalSection(props) {
	const [editOn, setEditMode] = useState(false);
	const toggleEditMode = () => setEditMode(!editOn);
	return editOn ? (
		<EditSection
			data={props.data}
			toggleEditMode={toggleEditMode}
			updatePersonalSection={props.updatePersonalSection}
		/>
	) : (
		<ViewSection data={props.data} toggleEditMode={toggleEditMode} />
	);
}

function ViewSection(props) {
	return (
		<div className="personal-section-container section-container">
			<div className="personal-section-header section-header">
				<h3>Personal Details</h3>
				<button className="btn-edit-personal-details" onClick={props.toggleEditMode}>
					Edit
				</button>
			</div>
			<div className="personal-section-body">
				<img src={props.data.image} alt="resume" />
				<h3 className="personal-details-name">{props.data.fullName}</h3>
				<h4>Job Title</h4>
				<span className="jobtitle-detail">{props.data.jobTitle}</span>
				<h4>Email</h4>
				<span className="email-detail">{props.data.email}</span>
				<h4>Phone</h4>
				<span className="phone-detail">{props.data.phone}</span>
				<h4>Address</h4>
				<span className="address-detail">{props.data.address}</span>
			</div>
		</div>
	);
}

function EditSection(props) {
	const submit = (e) => {
		if (e.target.form.checkValidity()) {
			e.preventDefault();
			updateProps(e);
			let image = document.getElementById("photo-input").files[0];
			let fReader = new FileReader();
			try {
				fReader.readAsDataURL(image);
				fReader.onloadend = (event) => {
					props.data.image = event.target.result;
					props.updatePersonalSection({ ...props.data });
				};
			} catch (err) {
				props.updatePersonalSection(props.data);
			}
			props.toggleEditMode();
		}
	};
	const updateProps = (e) => {
		props.data.fullName = e.target.form["full-name"].value;
		props.data.jobTitle = e.target.form["job-title"].value;
		props.data.email = e.target.form["email"].value;
		props.data.phone = e.target.form["phone"].value;
		props.data.address = e.target.form["address"].value;
	};
	return (
		<div className="personal-section-container section-container">
			<div className="personal-section-header section-header">
				<h3>Edit Personal Details</h3>
			</div>
			<form className="form-personal-section section-body">
				<input id="photo-input" type="file" accept="image/png, image/gif, image/jpeg" />
				<div>
					<input id="full-name" defaultValue={props.data.fullName} name="full-name" placeholder=" " required />
					<span>Full Name</span>
				</div>
				<div>
					<input id="job-title" defaultValue={props.data.jobTitle} name="job-title" placeholder=" " required />
					<span>Job Title</span>
				</div>
				<div>
					<input id="email" defaultValue={props.data.email} type="email" name="email" placeholder=" " required />
					<span>Email</span>
				</div>
				<div>
					<input id="phone" defaultValue={props.data.phone} name="phone" placeholder=" " required />
					<span>Phone</span>
				</div>
				<div>
					<input id="address" defaultValue={props.data.address} name="address" placeholder=" " required />
					<span>Address</span>
				</div>
				<button type="submit" onClick={submit}>
					✔️ Save
				</button>
				<button type="reset" onClick={props.toggleEditMode}>
					❌ Cancel
				</button>
			</form>
		</div>
	);
}

export default PersonalSection;
