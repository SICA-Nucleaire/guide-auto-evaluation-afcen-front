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

class QuestionnaireApi {
    constructor() {
        this.api = "http://127.0.0.1:3000"
    }

    async myFetchPostBody(url, body) {
        return new Promise((resolve, reject) => {
            fetch(`${this.api}/${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(
                async r => {
                    if (r.status < 200 || r.status > 299) {
                        const data = r.json()
                        console.log(data)
                        reject(await data)
                    } else {
                        const data = r.json();
                        console.error(data)
                        resolve(data)
                    }
                }
            ).catch(
                err => reject(err)
            )
        })
    }

    /*
    async myFetchGet(url) {
        return new Promise((resolve, reject) => {
            fetch(`${this.api}/${url}`)
                .then(async r => {
                    if (r.status < 200 || r.status > 299) {
                        reject(await r.json())
                    } else {
                        resolve(r.json())
                    }
                })
                .catch(
                    err => reject(err)
                )
        })
    }
    */

    async genererQuestionnaire(body) {
        return this.myFetchPostBody('questions/questionnaire', body)
    }

    async verifierQuestionnaire(body) {
        return this.myFetchPostBody('questions/check', body)
    }
}