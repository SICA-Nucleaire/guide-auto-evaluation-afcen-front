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

class QuestionController extends BaseController {
	constructor() {
		super();
		this.reponsesAEnvoyer = [];
		this.questionnaireModel = new QuestionnaireModel();
		this.genererQuestionnaire()
	}

	ajouterReponse(id, numeroQuestion, theme, difficulte, reponse) {
		let temp = {
			'id' : id,
			'numeroQuestion' : numeroQuestion,
			'theme' : theme,
			'difficulte' : difficulte,
			'bonnesReponses' : []
		}
		temp.bonnesReponses.push(reponse)
		this.reponsesAEnvoyer.push(temp)
		console.log(this.reponsesAEnvoyer)
	}

	reponseExiste(id) {
		return isInArray(this.reponsesAEnvoyer, id)

	}

	ajouterReponseExistant(id, reponse) {
		this.reponsesAEnvoyer[indexInArray(this.reponsesAEnvoyer, id)].bonnesReponses.push(reponse)
	}

	supprimerReponse(id) {
		removeByIdInArray(this.reponsesAEnvoyer, id)
	}

	supprimerReponseIntitule(id, intitule) {
		removeIntituleByIdInArray(this.reponsesAEnvoyer, id, intitule)
	}

	genererQuestionnaire() {
		$("#question").innerHTML = ''
		for (const listeThemeElement of listeTheme) {
			/* Gestion des questions */
			this.questionnaireModel.genererQuestionnaire({
				                                             "theme" : listeThemeElement
			                                             }).then(tableauQuestions => {
				// const scoreMax = tableauQuestions[3].scoreMax
				const newTab = tableauQuestions.splice(0, 3)
				for (const question of newTab) {
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
		                            name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}" 
		                            onchange="
		                            	if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}').checked) { 
											$('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}').checked = false; 
											questionController.supprimerReponse('${question.id}'); 
											questionController.ajouterReponse( 
												'${question.id}', 
												'${question.numeroQuestion}', 
												'${question.theme}', 
												'${question.difficulte}', 
												{ 'intitule' : '${reponses[0]}' } 
											); 
										} 
									">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}">
                                    <div id="reponseUne">${reponses[0]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" 
                                	name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}" 
                                	onchange="
                                		if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}').checked) {
											$('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}').checked = false; 
											questionController.supprimerReponse('${question.id}'); 
											questionController.ajouterReponse( 
												'${question.id}',
												'${question.numeroQuestion}',
												'${question.theme}',
												'${question.difficulte}',
												{ 'intitule' : '${reponses[1]}' } 
											); 
										}
									">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}">
                                    <div id="reponseDeux">${reponses[1]}</div>
                                </label>
                            </div>
                            <hr class="solid" style="border-top: 3px solid #999999;">
                        `
					}
					else {
						let reponses = [];
						for (const bonneReponseKey in question.bonnesReponses) {
							reponses.push(question.bonnesReponses[bonneReponseKey].intitule)
						}
						for (const mauvaisesReponsesKey in question.mauvaisesReponses) {
							reponses.push(question.mauvaisesReponses[mauvaisesReponsesKey].intitule)
						}
						let reponsesMelangees = shuffle(reponses)

						$("#question").innerHTML += `
                            <div id="infoQuestion">Question n°${question.numeroQuestion} (${question.theme} - ${question.difficulte}) : <span style="color: lightblue">${question.intituleDeLaQuestion}</span></div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-0" 
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-0').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[0]}' }
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
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-0">
                                    <div id="reponseDeux">${reponsesMelangees[0]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-1"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-1').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[1]}' }
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
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-1">
                                    <div id="reponseDeux">${reponsesMelangees[1]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-2"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-2').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[2]}' }
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
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-2">
                                    <div id="reponseDeux">${reponsesMelangees[2]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-3"
                                	onchange="
	                                    if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-3').checked) {
											if (questionController.reponseExiste('${question.id}')) {
												questionController.ajouterReponse(
														'${question.id}', 
														'${question.numeroQuestion}', 
														'${question.theme}', 
														'${question.difficulte}', 
														{ 'intitule' : '${reponsesMelangees[3]}' }
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
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-3">
                                    <div id="reponseDeux">${reponsesMelangees[3]}</div>
                                </label>
                            </div>
                            <hr class="solid" style="border-top: 3px solid #999999;">
                        `
					}
				}
			})
		}
		window.listeTheme = ['SMQ']
	}

	async verifierQuestionnaire() {
		for (const reponse of this.reponsesAEnvoyer) {
			let body = {
				"numeroQuestion" : reponse.numeroQuestion,
				"theme" : reponse.theme,
				"difficulte" : reponse.difficulte,
				"bonnesReponses" : []
			}
			for (const bonnesReponsesChoisie of reponse.bonnesReponses) {
				body.bonnesReponses.push(bonnesReponsesChoisie)
			}
			this.questionnaireModel.verifierQuestionnaire(body).then(r => {
				console.log(`Question ${body.numeroQuestion} (${body.theme} - ${body.difficulte}) :`, r)
			})
		}
	}
}

window.questionController = new QuestionController()