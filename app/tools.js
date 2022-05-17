/******************************************************************************
 * Copyright (c) 2022 SICA Nucléaire.                                         *
 *                                                                            *
 * This program is free software: you can redistribute it and/or modify       *
 * it under the terms of the GNU General Public License as published by       *
 * the Free Software Foundation, either version 3 of the License, or          *
 * (at your option) any later version.                                        *
 *                                                                            *
 * This program is distributed in the hope that it will be useful,            *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of             *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the               *
 * GNU General Public License for more details.                               *
 *                                                                            *
 * You should have received a copy of the GNU General Public License          *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.     *
 ******************************************************************************/

function $(selector, f) {
	if (f == undefined) {
		return document.querySelector(selector)
	}
	else {
		document.querySelectorAll(selector).forEach(f)
	}
}

function fetchJSON(url, token) {
	const headers = new Headers();
	if (token !== undefined) {
		headers.append("Authorization", `Bearer ${token}`)
	}
	return new Promise((resolve, reject) => fetch(url, {cache : "no-cache", headers : headers})
		.then(res => {
			if (res.status === 200) {
				resolve(res.json())
			}
			else {
				reject(res.status)
			}
		})
		.catch(err => reject(err)))
}

function include(selector, url, urlcontroller) {
	fetch(url, {cache : "no-cache"})
		.then(res => res.text())
		.then(html => {
			$(`#${selector}`).innerHTML = html
			fetch(urlcontroller, {cache : "no-cache"})
				.then(res => res.text())
				.then(js => {
					eval(js)
				})
		})
		.catch(function (err) {
			console.log('Failed to fetch page: ', err)
		});
}

function navigate(view) {
	include('content', `views/${view}.html`, `app/controllers/${view}.js`)
}

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function reviver(key, value) {
	if (typeof value === "string" && dateFormat.test(value)) {
		return new Date(value);
	}
	return value;
}

function getParameterByName(name) {
	let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


function removeAllElements(array, elem) {
	let index = array.indexOf(elem);
	while (index > -1) {
		array.splice(index, 1);
		index = array.indexOf(elem);
	}
}

function shuffle(array) {
	let copy = [], n = array.length, i;

	// While there remain elements to shuffle…
	while (n) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * n--);

		// And move it to the new array.
		copy.push(array.splice(i, 1)[0]);
	}

	return copy;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


const removeByIdInArray = (array, id) => {
	const requiredIndex = array.findIndex(el => {
		return el.id === String(id);
	})
	if (requiredIndex === -1) {
		return false;
	}
	return !!array.splice(requiredIndex, 1);
};