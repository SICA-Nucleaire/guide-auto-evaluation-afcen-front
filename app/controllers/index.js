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

class IndexController
	extends BaseController {
	constructor() {
		super()
		
		const toggler = document.getElementsByClassName("caret");
		let i;
		
		for (
			i = 0;
			i < toggler.length;
			i++
		) {
			toggler[i].addEventListener(
				"click",
				function () {
					this.parentElement.querySelector(".nested").classList.toggle("active");
					this.classList.toggle("caret-down");
				}
			);
		}
	}
}

window.indexController = new IndexController()
