import { React, Component } from "react";

class PersonalSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editOn: false,
		};
	}

	render() {
		return this.state.editOn ? (
			<EditSection
				data={this.props.data}
				toggleEditMode={this.toggleEditMode}
				updatePersonalSection={this.props.updatePersonalSection}
			/>
		) : (
			<ViewSection data={this.props.data} toggleEditMode={this.toggleEditMode} />
		);
	}

	toggleEditMode = () => {
		this.setState({
			editOn: !this.state.editOn,
		});
	};
}

class ViewSection extends Component {
	render() {
		return (
			<div className="personal-section-container section-container">
				<div className="personal-section-header section-header">
					<h3>Personal Details</h3>
					<button className="btn-edit-personal-details" onClick={this.props.toggleEditMode}>
						Edit
					</button>
				</div>
				<div className="personal-section-body">
					<img src={this.props.data.image} alt="resume" />
					<h3 className="personal-details-name">{this.props.data.fullName}</h3>
					<h4>Job Title</h4>
					<span className="jobtitle-detail">{this.props.data.jobTitle}</span>
					<h4>Email</h4>
					<span className="email-detail">{this.props.data.email}</span>
					<h4>Phone</h4>
					<span className="phone-detail">{this.props.data.phone}</span>
					<h4>Address</h4>
					<span className="address-detail">{this.props.data.address}</span>
				</div>
			</div>
		);
	}
}

class EditSection extends Component {
	render() {
		return (
			<div className="personal-section-container section-container">
				<div className="personal-section-header section-header">
					<h3>Edit Personal Details</h3>
				</div>
				<form className="form-personal-section section-body">
					<input id="photo-input" type="file" accept="image/png, image/gif, image/jpeg" />
					<div>
						<input
							id="full-name"
							defaultValue={this.props.data.fullName}
							name="full-name"
							placeholder=" "
							required
						/>
						<span>Full Name</span>
					</div>
					<div>
						<input
							id="job-title"
							defaultValue={this.props.data.jobTitle}
							name="job-title"
							placeholder=" "
							required
						/>
						<span>Job Title</span>
					</div>
					<div>
						<input
							id="email"
							defaultValue={this.props.data.email}
							type="email"
							name="email"
							placeholder=" "
							required
						/>
						<span>Email</span>
					</div>
					<div>
						<input id="phone" defaultValue={this.props.data.phone} name="phone" placeholder=" " required />
						<span>Phone</span>
					</div>
					<div>
						<input id="address" defaultValue={this.props.data.address} name="address" placeholder=" " required />
						<span>Address</span>
					</div>
					<button type="submit" onClick={this.submit}>
						✔️ Save
					</button>
					<button type="reset" onClick={this.props.toggleEditMode}>
						❌ Cancel
					</button>
				</form>
			</div>
		);
	}
	submit = (e) => {
		if (e.target.form.checkValidity()) {
			e.preventDefault();
			this.props.toggleEditMode();
			this.updateProps(e);
			let image = document.getElementById("photo-input").files[0];
			let fReader = new FileReader();
			try {
				fReader.readAsDataURL(image);
				fReader.onloadend = (event) => {
					this.props.data.image = event.target.result;
					this.props.updatePersonalSection(this.props.data);
				};
			} catch (err) {
				this.props.updatePersonalSection(this.props.data);
			}
		}
	};
	updateProps = (e) => {
		this.props.data.fullName = e.target.form["full-name"].value;
		this.props.data.jobTitle = e.target.form["job-title"].value;
		this.props.data.email = e.target.form["email"].value;
		this.props.data.phone = e.target.form["phone"].value;
		this.props.data.address = e.target.form["address"].value;
	};
}

export default PersonalSection;
