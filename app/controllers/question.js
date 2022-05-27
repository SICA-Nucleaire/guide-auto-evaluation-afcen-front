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
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
							],
							borderColor     : [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
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
			const indexRequis             = tableau.findIndex(el => {
				return el.theme === reponse.theme;
			})
			tableau[indexRequis].scoreMax = reponse.scoreMax
			let body                      = {
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