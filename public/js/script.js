const $ = (selector) => document.querySelector(selector)

const inputArray = document.querySelectorAll('#g2-form input')
const input = $('#g-form #licenseno')
let errors = false
let regex = /^[0-9A-Za-z]{5}-[0-9A-Za-z]{5}-[0-9A-Za-z]{5}$/

const validateForm = (e) => {
	resetErrors()
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

const validateLicense = (e) => {
	resetErrors()
	if (!input.value.match(regex)) {
		showError(input, 'License Number is not in proper format')
	}
	if (input.value == '') {
		showError(input, 'Cannot be Empty')
	}

	if (errors) {
		e.preventDefault()
		$('.search-result').style.display = 'none'
	}
}

const showError = (input, message) => {
	input.nextElementSibling.style.display = 'block'
	input.nextElementSibling.textContent = message
	return (errors = true)
}

const resetErrors = () => {
	errors = false
	inputArray.forEach((input) => {
		input.nextElementSibling.style.display = 'none'
		input.nextElementSibling.textContent = ''
	})
}

document.addEventListener('DOMContentLoaded', () => {
	if ($('#g2-form')) $('#g2-form').addEventListener('submit', validateForm)
	if ($('#g-form')) $('#g-form').addEventListener('submit', validateLicense)
})
