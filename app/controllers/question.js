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

class QuestionController
	extends BaseController {
	constructor() {
		super();
		this.reponsesAEnvoyer   = [];
		this.questionnaireModel = new QuestionnaireModel();
		this.genererQuestionnaire()
	}
	
	ajouterReponse(
		id,
		numeroQuestion,
		theme,
		difficulte,
		reponse,
		scoreMax
	) {
		let temp = {
			'id'             : id,
			'numeroQuestion' : numeroQuestion,
			'theme'          : theme,
			'difficulte'     : difficulte,
			'bonnesReponses' : [],
			'scoreMax'       : scoreMax
		}
		temp.bonnesReponses.push(reponse)
		this.reponsesAEnvoyer.push(temp)
	}
	
	reponseExiste(id) {
		return isInArray(
			this.reponsesAEnvoyer,
			id
		)
		
	}
	
	ajouterReponseExistant(
		id,
		reponse
	) {
		this.reponsesAEnvoyer[indexInArray(
			this.reponsesAEnvoyer,
			id
		)].bonnesReponses.push(reponse)
	}
	
	supprimerReponse(id) {
		removeByIdInArray(
			this.reponsesAEnvoyer,
			id
		)
	}
	
	supprimerReponseIntitule(
		id,
		intitule
	) {
		removeIntituleByIdInArray(
			this.reponsesAEnvoyer,
			id,
			intitule
		)
	}
	
	genererQuestionnaire() {
		$("#question").innerHTML = ''
		for (const listeThemeElement of
			listeTheme) {
			/* Gestion des questions */
			this.questionnaireModel.genererQuestionnaire({
				                                             "theme" : listeThemeElement
			                                             }).then(tableauQuestions => {
				const scoreMax = tableauQuestions[3].scoreMax
				// console.log('genererQuestionnaire', scoreMax)
				const newTab   = tableauQuestions.splice(
					0,
					3
				)
				for (const question of
					newTab) {
					const intitule = question.bonnesReponses[0].intitule
					if (intitule === "Faux" || intitule === "Vrai") {
						let reponses = [];
						reponses.push(question.bonnesReponses[0].intitule)
						reponses.push(question.mauvaisesReponses[0].intitule)
						reponses = shuffle(reponses)
						$("#question").innerHTML +=
							`
                            <div id="infoQuestion">Question n°${question.numeroQuestion} (${question.theme} - ${question.difficulte}) : <span style="color: lightblue">${question.intituleDeLaQuestion}</span></div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" 
		                            name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[0]}"
		                            onchange="
		                            	if ($('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[0]}').checked) {
											$('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[1]}').checked = false;
											questionController.supprimerReponse('${question.id}'); 
											questionController.ajouterReponse( 
												'${question.id}', 
												'${question.numeroQuestion}', 
												'${question.theme}', 
												'${question.difficulte}',
												{ 'intitule' : '${reponses[0]}' },
												${scoreMax}
											); 
										} 
									">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[0]}">
                                    <div id="reponseUne">${reponses[0]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" 
                                	name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[1]}"
                                	onchange="
                                		if ($('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[1]}').checked) {
											$('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[0]}').checked = false;
											questionController.supprimerReponse('${question.id}'); 
											questionController.ajouterReponse( 
												'${question.id}',
												'${question.numeroQuestion}',
												'${question.theme}',
												'${question.difficulte}',
												{ 'intitule' : '${reponses[1]}' },
												${scoreMax}
											); 
										}
									">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-${reponses[1]}">
                                    <div id="reponseDeux">${reponses[1]}</div>
                                </label>
                            </div>
                            <hr class="solid" style="border-top: 3px solid #999999;">
                        `
					}
					else {
						let reponses = [];
						for (const bonneReponseKey in
							question.bonnesReponses) {
							reponses.push(question.bonnesReponses[bonneReponseKey].intitule)
						}
						for (const mauvaisesReponsesKey in
							question.mauvaisesReponses) {
							reponses.push(question.mauvaisesReponses[mauvaisesReponsesKey].intitule)
						}
						let reponsesMelangees = shuffle(reponses)
						
						$("#question").innerHTML +=
							`
                            <div id="infoQuestion">Question n°${question.numeroQuestion} (${question.theme} - ${question.difficulte}) : <span style="color: lightblue">${question.intituleDeLaQuestion}</span></div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-0"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-0').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}',
														{ 'intitule' : '${reponsesMelangees[0]}' }, 
														${scoreMax}
												)
											} else {
												questionController.ajouterReponseExistant(
														'${question.id}',
														{ 'intitule' : '${reponsesMelangees[0]}' }
												)
											}
	                                    } else {
											questionController.supprimerReponseIntitule(
													'${question.id}', 
													'${reponsesMelangees[0]}'
											)
	                                    }
                                	">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-0">
                                    <div id="reponseUne">${reponsesMelangees[0]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-1"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-1').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[1]}' },
														${scoreMax}
												)
											} else {
												questionController.ajouterReponseExistant(
														'${question.id}',
														{ 'intitule' : '${reponsesMelangees[1]}' }
												)
											}
	                                    } else {
											questionController.supprimerReponseIntitule(
													'${question.id}', 
													'${reponsesMelangees[1]}'
											)
	                                    }
                                	">	
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-1">
                                    <div id="reponseDeux">${reponsesMelangees[1]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-2"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-2').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[2]}' },
														${scoreMax}
												)
											} else {
												questionController.ajouterReponseExistant(
														'${question.id}',
														{ 'intitule' : '${reponsesMelangees[2]}' }
												)
											}
	                                    } else {
											questionController.supprimerReponseIntitule(
													'${question.id}', 
													'${reponsesMelangees[2]}'
											)
	                                    }
                                	">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-2">
                                    <div id="reponseTrois">${reponsesMelangees[2]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-3"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-3').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[3]}' },
														${scoreMax}
												)
											} else {
												questionController.ajouterReponseExistant(
														'${question.id}',
														{ 'intitule' : '${reponsesMelangees[3]}' }
												)
											}
	                                    } else {
											questionController.supprimerReponseIntitule(
													'${question.id}', 
													'${reponsesMelangees[3]}'
											)
	                                    }
                                	">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(
								0,
								-1
							)}-3">
                                    <div id="reponseQuatre">${reponsesMelangees[3]}</div>
                                </label>
                            </div>
                            <hr class="solid" style="border-top: 3px solid #999999;">
                        `
					}
				}
			})
		}
	}
	
	creerChart(
		themes,
		notes
	) {
		const ctx                                         = document.getElementById('myChart');
		document.getElementById('divChart').style.display = 'block';
		new Chart(
			ctx,
			{
				type    : 'bar',
				data    : {
					labels   : themes,
					datasets : [
						{
							axis            : 'y',
							label           : 'Note (en %)',
							data            : notes,
							backgroundColor : [
								'rgba(226, 71, 230, 0.2)',
								'rgba(230, 197, 83, 0.2)',
								'rgba(133, 60, 230, 0.2)',
								'rgba(109, 230, 37, 0.2)',
								'rgba(48, 68, 230, 0.2)',
								'rgba(204, 130, 98, 0.2)',
								'rgba(230, 199, 53, 0.2)',
								'rgba(83, 230, 30, 0.2)',
								'rgba(11, 230, 200, 0.2)',
								'rgba(23, 18, 230, 0.2)',
								'rgba(69, 204, 182, 0.2)',
								'rgba(181, 182, 230, 0.2)',
								'rgba(230, 158, 30, 0.2)',
								'rgba(230, 166, 140, 0.2)',
								'rgba(230, 214, 147, 0.2)',
								'rgba(204, 91, 69, 0.2)',
								'rgba(230, 225, 181, 0.2)',
								'rgba(230, 158, 225, 0.2)',
								'rgba(97, 230, 176, 0.2)',
								'rgba(51, 0, 230, 0.2)',
								'rgba(255, 255, 163, 0.2)',
								'rgba(90, 230, 216, 0.2)',
								'rgba(230, 181, 67, 0.2)',
								'rgba(115, 5, 230, 0.2)',
								'rgba(230, 181, 158, 0.2)',
								'rgba(111, 222, 183, 0.2)',
								'rgba(203, 122, 222, 0.2)',
								'rgba(100, 222, 110, 0.2)',
								'rgba(222, 105, 78, 0.2)',
								'rgba(168, 222, 89, 0.2)',
								'rgba(28, 217, 64, 0.2)',
								'rgba(103, 39, 217, 0.2)',
								'rgba(110, 217, 17, 0.2)',
								'rgba(217, 39, 69, 0.2)',
								'rgba(217, 207, 7, 0.2)',
								'rgba(69, 100, 222, 0.2)',
								'rgba(222, 112, 80, 0.2)',
								'rgba(58, 178, 222, 0.2)',
								'rgba(222, 173, 35, 0.2)',
								'rgba(47, 222, 173, 0.2)',
								'rgba(28, 192, 230, 0.2)',
								'rgba(230, 39, 112, 0.2)',
								'rgba(16, 230, 151, 0.2)',
								'rgba(230, 129, 39, 0.2)',
								'rgba(5, 230, 20, 0.2)',
								'rgba(215, 91, 235, 0.2)',
								'rgba(235, 200, 103, 0.2)',
								'rgba(129, 80, 235, 0.2)',
								'rgba(150, 235, 56, 0.2)',
								'rgba(68, 105, 235, 0.2)',
								'rgba(97, 250, 173, 0.2)',
								'rgba(203, 110, 250, 0.2)',
								'rgba(99, 250, 85, 0.2)',
								'rgba(250, 81, 60, 0.2)',
								'rgba(211, 250, 72, 0.2)',
								'rgba(232, 188, 26, 0.2)',
								'rgba(37, 232, 203, 0.2)',
								'rgba(232, 141, 14, 0.2)',
								'rgba(37, 54, 232, 0.2)',
								'rgba(232, 69, 2, 0.2)',
							],
							borderColor     : [
								'rgba(226, 71, 230, 1)',
								'rgba(230, 197, 83, 1)',
								'rgba(133, 60, 230, 1)',
								'rgba(109, 230, 37, 1)',
								'rgba(48, 68, 230, 1)',
								'rgba(204, 130, 98, 1)',
								'rgba(230, 199, 53, 1)',
								'rgba(83, 230, 30, 1)',
								'rgba(11, 230, 200, 1)',
								'rgba(23, 18, 230, 1)',
								'rgba(69, 204, 182, 1)',
								'rgba(181, 182, 230, 1)',
								'rgba(230, 158, 30, 1)',
								'rgba(230, 166, 140, 1)',
								'rgba(230, 214, 147, 1)',
								'rgba(204, 91, 69, 1)',
								'rgba(230, 225, 181, 1)',
								'rgba(230, 158, 225, 1)',
								'rgba(97, 230, 176, 1)',
								'rgba(51, 0, 230, 1)',
								'rgba(255, 255, 163, 1)',
								'rgba(90, 230, 216, 1)',
								'rgba(230, 181, 67, 1)',
								'rgba(115, 5, 230, 1)',
								'rgba(230, 181, 158, 1)',
								'rgba(111, 222, 183, 1)',
								'rgba(203, 122, 222, 1)',
								'rgba(100, 222, 110, 1)',
								'rgba(222, 105, 78, 1)',
								'rgba(168, 222, 89, 1)',
								'rgba(28, 217, 64, 1)',
								'rgba(103, 39, 217, 1)',
								'rgba(110, 217, 17, 1)',
								'rgba(217, 39, 69, 1)',
								'rgba(217, 207, 7, 1)',
								'rgba(69, 100, 222, 1)',
								'rgba(222, 112, 80, 1)',
								'rgba(58, 178, 222, 1)',
								'rgba(222, 173, 35, 1)',
								'rgba(47, 222, 173, 1)',
								'rgba(28, 192, 230, 1)',
								'rgba(230, 39, 112, 1)',
								'rgba(16, 230, 151, 1)',
								'rgba(230, 129, 39, 1)',
								'rgba(5, 230, 20, 1)',
								'rgba(215, 91, 235, 1)',
								'rgba(235, 200, 103, 1)',
								'rgba(129, 80, 235, 1)',
								'rgba(150, 235, 56, 1)',
								'rgba(68, 105, 235, 1)',
								'rgba(97, 250, 173, 1)',
								'rgba(203, 110, 250, 1)',
								'rgba(99, 250, 85, 1)',
								'rgba(250, 81, 60, 1)',
								'rgba(211, 250, 72, 1)',
								'rgba(232, 188, 26, 1)',
								'rgba(37, 232, 203, 1)',
								'rgba(232, 141, 14, 1)',
								'rgba(37, 54, 232, 1)',
								'rgba(232, 69, 2, 1)',
							],
							borderWidth     : 1
						}
					]
				},
				options : {
					indexAxis       : 'y',
					scales          : {
						x : {
							suggestedMin : 0,
							suggestedMax : 100
						}
					},
					backgroundColor : 'rgba(255,255,255,0.7)'
				}
			}
		);
	}
	
	verifierQuestionnaire() {
		let scoreParTheme = window.listeTheme
		let tableau       = []
		for (const theme of
			scoreParTheme) {
			tableau.push({
				             "theme"       : theme,
				             "scoreMax"    : 0,
				             "scoreActuel" : 0
			             })
		}
		for (const reponse of
			this.reponsesAEnvoyer) {
			const indexRequis = tableau.findIndex(el => {
				return el.theme === reponse.theme;
			})
			console.log('---------------------------------------------------------------------')
			console.log(
				'tableau[indexRequis].scoreMax === 0 :',
				tableau[indexRequis].scoreMax === 0
			)
			console.log(
				'tableau[indexRequis].scoreMax :',
				tableau[indexRequis].scoreMax
			)
			console.log(
				'reponse.scoreMax :',
				reponse.scoreMax
			)
			console.log(tableau[indexRequis])
			if (tableau[indexRequis].scoreMax === 0) {
				tableau[indexRequis].scoreMax = reponse.scoreMax
			}
			let body = {
				"numeroQuestion" : reponse.numeroQuestion,
				"theme"          : reponse.theme,
				"difficulte"     : reponse.difficulte,
				"bonnesReponses" : []
			}
			for (const bonnesReponsesChoisie of
				reponse.bonnesReponses) {
				body.bonnesReponses.push(bonnesReponsesChoisie)
			}
			this.questionnaireModel.verifierQuestionnaire(body).then(r => {
				if (r) {
					if (body.bonnesReponses[0].intitule === "Vrai" || body.bonnesReponses[0].intitule === "Faux") {
						tableau[indexRequis].scoreActuel += 1
					}
					else {
						switch (reponse.difficulte) {
							case "Débutant":
								tableau[indexRequis].scoreActuel += 2
								break;
							case "Intermédiaire":
								tableau[indexRequis].scoreActuel += 3
								break;
							case "Expert":
								tableau[indexRequis].scoreActuel += 4
								break;
							default:
								break;
						}
					}
				}
			})
		}
		window.listeTheme = ['SMQ']
		sleep(2000).then(_ => {
			let themes = []
			let notes  = []
			for (const element of
				tableau) {
				themes.push(element.theme)
				const pourcentage = (
					(
						100 * element.scoreActuel
					) / element.scoreMax
				)
				notes.push(pourcentage)
			}
			this.creerChart(
				themes,
				notes
			)
		})
	}
}

window.questionController = new QuestionController()