"use strict";
const express_1 = require("express");
const heroes = require('../data');
class HeroRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * Get all heroes
     */
    getAll(req, res, next) {
        res.send(heroes);
    }
    /**
    * Take each handler, and attach to one of the Express.Router's
    * endpoints.
    */
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.HeroRouter = HeroRouter;
const heroRoutes = new HeroRouter();
heroRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
