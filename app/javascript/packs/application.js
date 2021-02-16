import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

import Vue from "@/main.js"

import '../../stylesheets/application.sass'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

Vue.start()
