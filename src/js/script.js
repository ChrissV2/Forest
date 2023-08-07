let hamburgerBtn
let mobileNav
let navLogo
let body
let mobileNavItems
let firstNavItem
let secondNavItem
let thirdNavItem
let fourthNavItem
let allNavItems
let contactInputs
let contactLabels
let textArea
let contactForm
let label
let textAreaLabel
let nameInput
let mailInput
let sendBtn
let inputArr
let allInputArr
let checkBox
let errorMsg
let alertMsg

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	scrollSpy()
}

const prepareDOMElements = () => {
	hamburgerBtn = document.querySelector('.hamburger')
	mobileNav = document.querySelector('.nav-mobile')
	navLogo = document.querySelector('.nav__logo')
	body = document.querySelector('body')
	mobileNavItems = document.querySelectorAll('.nav-mobile__items-item')
	firstNavItem = document.querySelector('.nav__items-item--first')
	secondNavItem = document.querySelector('.nav__items-item--second')
	thirdNavItem = document.querySelector('.nav__items-item--third')
	fourthNavItem = document.querySelector('.nav__items-item--fourth')
	allNavItems = document.querySelectorAll('.nav__items-item')
	contactInputs = document.querySelectorAll('.contact__box-input')
	contactLabels = document.querySelectorAll('.contact__box-label')
	textArea = document.querySelector('.contact__box-textarea')
	contactForm = document.querySelector('.contact__form')
	sendBtn = document.querySelector('.contact__form-btn')
	nameInput = document.querySelector('#name')
	mailInput = document.querySelector('#mail')
	inputArr = [nameInput, textArea]
	allInputArr = [nameInput, mailInput, textArea]
	checkBox = document.querySelector('#privacy')
	errorMsg = document.querySelector('.contact__box-error')
	alertMsg = document.querySelector('.contact__alert')
}

const prepareDOMEvents = () => {
	hamburgerBtn.addEventListener('click', handleNav)
	window.addEventListener('scroll', scrollSpy)
	body.addEventListener('click', handleContactAnimation)
	if (sendBtn) {
		sendBtn.addEventListener('click', e => {
			e.preventDefault()
			validateNameAndTextarea()
			validateMail()
			validateCheckbox()
			checkErrors()
		})
	}
}

const handleNav = () => {
	body.classList.toggle('overflow-hidden')
	mobileNav.classList.toggle('nav-mobile--active')
	mobileNavItems.forEach(element => closeNav(element))
	hamburgerBtn.classList.toggle('is-active')
}

const closeNav = element => {
	element.addEventListener('click', () => {
		body.classList.remove('overflow-hidden')
		mobileNav.classList.remove('nav-mobile--active')
		hamburgerBtn.classList.remove('is-active')
	})
}

const scrollSpy = () => {
	if (document.URL.includes('oferta.html')){
		removeActiveClass()
	} else if (document.URL.includes('kontakt.html')) {
		removeActiveClass()
		fourthNavItem.classList.add('nav__items-item--active')
	} else if (window.scrollY <= 557) {
		removeActiveClass()
		firstNavItem.classList.add('nav__items-item--active')
	} else if (window.scrollY <= 1515) {
		removeActiveClass()
		secondNavItem.classList.add('nav__items-item--active')
	} else {
		removeActiveClass()
		thirdNavItem.classList.add('nav__items-item--active')
	}
}

const removeActiveClass = () => {
	allNavItems.forEach(e => e.classList.remove('nav__items-item--active'))
}

const handleContactAnimation = e => {
	if (e.target.matches('.contact__box-input')) {
		removeAnimation()
		label = e.target.closest('div').firstElementChild
		label.classList.add('contact__box-label-animation')
	} else if (e.target.matches('.contact__box-textarea')) {
		removeAnimation()
		textAreaLabel = e.target.closest('div').firstElementChild
		textAreaLabel.classList.add('contact__box-label-animation')
	} else {
		removeAnimation()
	}
}

const removeAnimation = () => {
	contactLabels.forEach(label => {
		const inputId = label.getAttribute('for')
		const inputElement = document.getElementById(inputId)

		if (inputElement && inputElement.value.trim() === '') {
			label.classList.remove('contact__box-label-animation')
		}
	})
}

const validateNameAndTextarea = () => {
	inputArr.forEach(e => {
		if (e.value === '') {
			e.classList.add('contact__box-input-incorrect')
		} else {
			e.classList.remove('contact__box-input-incorrect')
		}
	})
}

const validateMail = () => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,4})$/i

	if (re.test(mailInput.value)) {
		mailInput.classList.remove('contact__box-input-incorrect')
	} else {
		mailInput.classList.add('contact__box-input-incorrect')
	}
}

const validateCheckbox = () => {
	if (!checkBox.checked) {
		errorMsg.style.opacity = '1'
		checkBox.classList.add('contact__box-input-incorrect')
	} else {
		errorMsg.style.opacity = '0'
		checkBox.classList.remove('contact__box-input-incorrect')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	mailInput.value = ''
	textArea.value = ''
	checkBox.checked = false
}

const checkErrors = () => {
	let errorCount = 0

	allInputArr.forEach(e => {
		if (e.classList.contains('contact__box-input-incorrect')) {
			errorCount++
		}
	})

	if (!checkBox.checked) {
		errorCount++
	}

	if (errorCount === 0) {
		clearInputs()
		alertMsg.classList.add('contact__alert-animation')

		setTimeout(function() {
			alertMsg.classList.remove('contact__alert-animation')
		}, 3000)
	}
}

const delayLinks = (event, url) => {
	event.preventDefault()

	setTimeout(function() {
		window.location.href = url
	}, 190)
}

document.addEventListener('DOMContentLoaded', main)
