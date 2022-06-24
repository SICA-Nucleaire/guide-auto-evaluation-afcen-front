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

class RestitutionController
	extends BaseController {
	
	constructor() {
		super();
		$("#date").innerHTML = new Date().toLocaleDateString()
		this.domaines        =
			[
				{
					"Domaine"      : "Fabrication et / ou remise en état",
					"Sous-Domaine" : [
						{
							"Électronique" : [
								"Aspect matériel"
							]
						},
						{
							"Traçabilité" : [
								"Déclaration de Conformité",
								"Document de Suivi",
								"Procès-Verbal d’essais",
								"Rapport de Fin de Fabrication"
							]
						},
						{
							"Fournisseur / sous-traitants" : [
								"Spécification d’approvisionnement"
							]
						},
						{
							"Ingénierie du matériel" : [
								"Interférence électromagnétique",
								"Résistance mécanique",
								"Enveloppes",
								"Marquage",
								"Sertissage",
								"Polymère",
								"Résistance au feu",
								"Termipoint",
								"Wrapping",
								"Exigences et recommandations spécifiques aux matériels",
								"Interchangeabilité",
								"Câblage interne",
								"Maintenance",
								"Contrôles et essais",
								"Déverminage"
							]
						}
					],
				},
				{
					"Domaine"      : "Études",
					"Sous-Domaine" : [
						{
							"Qualification logiciel" : [
								"ANFL",
								"HDL",
								"Système programmé"
							]
						},
						{
							"Qualification matériel" : [
								"KLIF aux conditions normales d’ambiance",
								"KLIF K3",
								"KLIF K2",
								"KLIF K1",
								"KLIF AG",
								"Données d’entrée",
								"Généralités et documents",
								"Contrôle des performances",
								"Extension de KLIF matériel"
							]
						},
						{
							"Obsolescence" : [
								"Obsolescence"
							]
						},
						{
							"Pérennité de qualification" : [
								"Dossier de Référence",
								"Opération sensible d’approvisionnement ou de fabrication",
								"Essais sur prélèvement",
								"Procédure de gestion du Dossier de Référence"
							]
						}
					]
				},
				{
					"Domaine"      : "Installation",
					"Sous-Domaine" : [
						{
							"Études" : [
								"Études"
							]
						},
						{
							"Vérifications" : [
								"Vérifications"
							]
						},
						{
							"Pérennité" : [
								"Pérennité"
							]
						},
						{
							"Dispositions" : [
								"Séparation",
								"Exigences particulières pour le séisme",
								"Dispositifs",
								"Raccordements",
								"Réseaux de terre et de masse",
								"Identification des liaisons"
							]
						}
					]
				},
				{
					"Domaine"      : "Système électrique",
					"Sous-Domaine" : [
						{
							"Exigences de sûreté et exigences fonctionnelles" : [
								"Exigences de sûreté et exigences fonctionnelles"
							]
						},
						{
							"Exigences en matière de conception du système électrique" : [
								"Exigences en matière de conception du système électrique"
							]
						},
						{
							"Architecture du système électrique" : [
								"Architecture du système électrique"
							]
						},
						{
							"Conception des systèmes électriques" : [
								"Conception des systèmes électriques"
							]
						},
					]
				}
			]
		this.sousDomaines    =
			[
				"Électronique",
				"Traçabilité",
				"Fournisseur / sous-traitants",
				"Ingénierie du matériel",
				"Qualification logiciel",
				"Qualification matériel",
				"Obsolescence",
				"Pérennité de qualification",
				"Études",
				"Vérifications",
				"Pérennité",
				"Dispositions",
				"Exigences de sûreté et exigences fonctionnelles",
				"Exigences en matière de conception du système électrique",
				"Architecture du système électrique",
				"Conception des systèmes électriques",
			]
		this.restituerThemes(window.themes)
		this.creerChart(
			window.themes,
			window.notes
		)
	}
	
	restituerThemes(listeDeThemes) {
		for (const domaine of
			this.domaines) {
			let ulName = `ul${domaine.Domaine}`
			$("#divListeThemeRestitution").innerHTML +=
				`
					<li>
						<span class="caret-down">${domaine.Domaine}</span>
						<ul id="${ulName}">
						</ul>
					</li>
				`
			for (const sousDomaine of
				domaine["Sous-Domaine"]) {
				const i = domaine["Sous-Domaine"].indexOf(sousDomaine)
				
				for (const sousDomaineElement of
					this.sousDomaines) {
					if (domaine["Sous-Domaine"][i][sousDomaineElement]) {
						document.getElementById(ulName).innerHTML +=
							`
						                <li>
						                    <span class="caret-down">
						                        ${sousDomaineElement}
						                    </span>
						                    <ul id="ul ${domaine.Domaine} ${sousDomaineElement}">
							                    <li>
							                    
												</li>
											</ul>
						                </li>
									`
					}
					for (const theme of
						listeDeThemes) {
						if (domaine["Sous-Domaine"][i][sousDomaineElement]) {
							for (const themeTrouve of
								domaine["Sous-Domaine"][i][sousDomaineElement]) {
								if (themeTrouve === theme) {
									let ulToFill = `ul ${domaine.Domaine} ${sousDomaineElement}`
									document.getElementById(ulToFill).innerHTML +=
										`
							                <li>
							                    <div id="div ${domaine.Domaine} ${theme}">
									                <div class="form-check">
										                <input class="form-check-input" checked disabled type="checkbox" id="flexCheck ${domaine.Domaine} ${theme}">
										                <label class="form-check-label" for="flexCheck ${domaine.Domaine} ${theme}">
										                    ${theme}
										                </label>
									                </div>
							                    </div>
							                </li>
										`
								}
							}
						}
						
					}
				}
			}
		}
		if (listeDeThemes.includes('SMQ')) {
			$("#divListeThemeRestitution").innerHTML +=
				`
	                <li>
	                    <div id="div SMQ">
			                <div class="form-check">
				                <input class="form-check-input" checked disabled type="checkbox" id="flexCheckSMQ">
				                <label class="form-check-label" for="flexCheckSMQ">
				                    SMQ
				                </label>
			                </div>
	                    </div>
	                </li>
				`
			
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
}

window.restitutionController = new RestitutionController()