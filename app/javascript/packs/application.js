import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

import Vue from "@/main.js"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

Vue.start()
