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


class ExplicationController
	extends BaseController {
	constructor() {
		super();
		this.questionnaireModel = new QuestionnaireModel();
		this.formatText()
	}
	
	formatText() {
		let nbTheme = window.listeTheme.length
		if (nbTheme < 2) {
			$('#nbThemes').innerHTML = `${nbTheme - 1} thème et a été rajouté, par défaut, 1 thème sur le SMQ`
		}
		else {
			$('#nbThemes').innerHTML = `${nbTheme - 1} thèmes et a été rajouté, par défaut, 1 thème sur le SMQ`
		}
		
		if (window.listeTheme.length > 12) {
			$('#nbMinutes').innerHTML      = window.listeTheme.length * 3
			$('#warning').style.visibility = 'visible'
		}
		else {
			$('#warning').style.display = 'none'
		}
	}
}

window.explicationController = new ExplicationController()
