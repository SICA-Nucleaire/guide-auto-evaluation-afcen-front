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

	envoyerReponse(reponse) {
		this.reponsesAEnvoyer.push(reponse)
		console.log(this.reponsesAEnvoyer)
	}

	supprimerReponse(id) {
		removeByIdInArray(this.reponsesAEnvoyer, id)
		console.log(this.reponsesAEnvoyer)
	}

	genererQuestionnaire() {
		$("#question").innerHTML = ''
		for (const listeThemeElement of listeTheme) {
			/* Gestion des questions */
			this.questionnaireModel.genererQuestionnaire({
				                                             "theme" : listeThemeElement
			                                             }).then(tableauQuestions => {
				const scoreMax = tableauQuestions[3].scoreMax
				const newTab = tableauQuestions.splice(0, 3)
				for (const question of newTab) {
					const intitule = question.bonnesReponses[0].intitule
					if (intitule === "Faux" || intitule === "Vrai") {
						let reponses = [];
						reponses.push(question.bonnesReponses[0].intitule)
						reponses.push(question.mauvaisesReponses[0].intitule)
						reponses = shuffle(reponses)
						console.log(`'${question.id}'`)
						$("#question").innerHTML +=
							`
                            <div id="infoQuestion">Question n°${question.numeroQuestion} (${question.theme} - ${question.difficulte}) : <span style="color: lightblue">${question.intituleDeLaQuestion}</span></div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" 
		                            name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}" 
		                            onchange="if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}').checked) { $('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}').checked = false; questionController.envoyerReponse(  JSON.stringify({ 'id' : '${question.id.substring(1).slice(0, -1)}', 'numeroQuestion' : ${question.numeroQuestion}, 'theme' : '${question.theme}', 'difficulte' : '${question.difficulte}', 'bonnesReponses' : [ { 'intitule' : '${reponses[0]}' } ] }) ); } else { this.supprimerReponse(${question.id}) console.log('coucou') } ">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}">
                                    <div id="reponseUne">${reponses[0]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}" onchange="if ($('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}').checked) $('#flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[0]}').checked = false">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-${reponses[1]}">
                                    <div id="reponseDeux">${reponses[1]}</div>
                                </label>
                            </div>
                            <button onclick="questionController.envoyerReponse(  );">Test</button>
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

						$("#question").innerHTML +=
							`
                            <div id="infoQuestion">Question n°${question.numeroQuestion} (${question.theme} - ${question.difficulte}) : <span style="color: lightblue">${question.intituleDeLaQuestion}</span></div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-0">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-0">
                                    <div id="reponseDeux">${reponsesMelangees[0]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-1">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-1">
                                    <div id="reponseDeux">${reponsesMelangees[1]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-2">
                                <label class="form-check-label" for="flexRadioDefault${question.id.substring(1).slice(0, -1)}-2">
                                    <div id="reponseDeux">${reponsesMelangees[2]}</div>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault${question.id.substring(1).slice(0, -1)}-3">
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
		await sleep(2000)
		console.log("coucou")
		this.questionnaireModel.verifierQuestionnaire({
			                                              "numeroQuestion" : 2,
			                                              "theme" : "SMQ",
			                                              "difficulte" : "debutant",
			                                              "bonnesReponses" : [
				                                              {
					                                              "intitule" : "Vrai"
				                                              }
			                                              ]
		                                              }).then(r => {
			console.log(r)
			console.log("fin")
		})
	}
}

window.questionController = new QuestionController()