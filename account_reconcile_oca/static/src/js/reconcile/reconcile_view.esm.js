import {ReconcileController} from "./reconcile_controller.esm.js";
import {ReconcileRenderer} from "./reconcile_renderer.esm.js";
import {kanbanView} from "@web/views/kanban/kanban_view";
import {registry} from "@web/core/registry";

// Odoo 19 : le registre « views » valide `type` contre `session.view_info`
// (types issus d’ir.ui.view, ex. kanban). Le XML est un <kanban js_class="reconcile"> :
// le type serveur reste « kanban », seul l’identifiant d’enregistrement est « reconcile ».
export const reconcileView = {
    ...kanbanView,
    type: "kanban",
    Renderer: ReconcileRenderer,
    Controller: ReconcileController,
    buttonTemplate: "account_reconcile.ReconcileView.Buttons",
    searchMenuTypes: ["filter"],
};

registry.category("views").add("reconcile", reconcileView);
