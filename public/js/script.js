const $ = (selector) => document.querySelector(selector)

const inputArray = document.querySelectorAll('#g2-form input')
const signupInputArray = document.querySelectorAll('#signup-form input')
const loginInputArray = document.querySelectorAll('#login-form input')
const input = $('#g-form #licenseno')

let errors = false
let regex = /^[0-9A-Za-z]{5}-[0-9A-Za-z]{5}-[0-9A-Za-z]{5}$/

const validateForm = (e) => {
	resetErrors(inputArray)
	inputArray.forEach((input) => {
		if (input.id == 'age' && isNaN(input.value)) {
			showError(input, 'Value must be a number')
		}
		if (input.id == 'licenseno' && !input.value.match(regex)) {
			showError(input, 'License Number is not in proper format')
		}
		if (input.value == '') {
			showError(input, 'Cannot be Empty')
		}
	})
	if (errors) {
		e.preventDefault()
	}
}

const validateSignup = (e) => {
	resetErrors(signupInputArray)
	signupInputArray.forEach((input) => {
		if (input.value == '') {
			showError(input, 'Cannot be Empty')
		}
	})
	if (
		$('#signup-form #password').value !==
		$('#signup-form #confirmpassword').value
	) {
		showError($('#password'), 'Passwords do not match')
	}
	if (errors) {
		e.preventDefault()
	}
}

const validateLogin = (e) => {
	resetErrors(loginInputArray)
	loginInputArray.forEach((input) => {
		if (input.value == '') {
			showError(input, 'Cannot be Empty')
		}
	})

	if (errors) {
		e.preventDefault()
	}
}

const showError = (input, message) => {
	input.nextElementSibling.style.display = 'block'
	input.nextElementSibling.textContent = message
	return (errors = true)
}

const resetErrors = (array) => {
	errors = false
	array.forEach((input) => {
		input.nextElementSibling.style.display = 'none'
		input.nextElementSibling.textContent = ''
	})
}

const getTimeSlots = async (date) => {
	$('#appointment-time').innerHTML = ''
	let appointmentData = await fetch(`/getTimeSlots`)
	let data = await appointmentData.json()

	data = data.filter((d) => d.date == date)
	for (let time of data) {
		let timeSlot = document.createElement('option')
		timeSlot.innerHTML = time.time
		if (time.isAvailable != true) {
			timeSlot.disabled = true
		}
		$('#appointment-time').appendChild(timeSlot)
	}
}

const getAdminTimeSlots = async (date) => {
	let times = document.querySelectorAll('#admin-time-slot option')
	for (let time of times) {
		time.disabled = false
	}

	let appointmentData = await fetch(`/getTimeSlots`)
	let data = await appointmentData.json()

	for (let time of times) {
		for (let i = 0; i < data.length; i++) {
			if (time.value == data[i].time && data[i].date == date) {
				time.disabled = true
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if ($('#g2-form')) $('#g2-form').addEventListener('submit', validateForm)

	if ($('#signup-form'))
		$('#signup-form').addEventListener('submit', validateSignup)

	if ($('#login-form'))
		$('#login-form').addEventListener('submit', validateLogin)

	if ($('#appointment-date'))
		$('#appointment-date').addEventListener('change', () =>
			getTimeSlots($('#appointment-date').value)
		)

	if ($('#admin-appointment-date'))
		$('#admin-appointment-date').addEventListener('change', () =>
			getAdminTimeSlots($('#admin-appointment-date').value)
		)
})
