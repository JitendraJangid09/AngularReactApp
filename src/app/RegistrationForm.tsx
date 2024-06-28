import React, { useEffect, useState } from 'react';

// Define a type for props
type Props = {
	onSendDataToAngular: (data: any) => void; // Example type for onSendDataToAngular
	isSubmitClicked: boolean
};

const RegistrationForm: React.FC<Props> = ({ onSendDataToAngular, isSubmitClicked }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	useEffect(() => {
		const handleAngularEvent = (event: any) => {
			sendData()
			console.log('Event received from Angular:', event.detail);
			// Handle the received data as needed
		};

		window.addEventListener('angularEvent', handleAngularEvent);

		return () => {
			window.removeEventListener('angularEvent', handleAngularEvent);
		};
	}, []);

	const sendData = () => {
		onSendDataToAngular(formData);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Handle form submission logic, e.g., send data to backend
		console.log(formData);
		// Reset form fields after submission
		setFormData({
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		});

		onSendDataToAngular(formData)
	};

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Registration Form</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">Username:</label>
					<input
						type="text"
						className="form-control"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email:</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password:</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
					<input
						type="password"
						className="form-control"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>

			</form>
		</div>
	);
};

export default RegistrationForm;
