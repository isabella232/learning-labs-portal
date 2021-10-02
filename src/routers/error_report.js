/**
 * Copyright 2021 Splunk Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

'use strict'

const express = require('express')
const _ = require('underscore')
const middleware = require('./middleware')
const logger = require('../lib/logger').create('ErrorReport')

//-----------------------------------------------------------------------------
// Router for APIs
//-----------------------------------------------------------------------------

exports.api = function (authService) {
  const routerApi = express.Router()

  routerApi.use(express.json())

  routerApi.use(middleware.createPageAuthMiddleware(authService))

  routerApi.post('/', async function (req, res) {
    const body = req.body
    body.user = req.parsedToken.user
    logger.error(body)
    res.end()
  })

  return routerApi
}
