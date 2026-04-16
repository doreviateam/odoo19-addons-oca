import {ListController} from "@web/views/list/list_controller";

export class ReconcileMoveLineController extends ListController {
    /**
     * Odoo 19+ : les many2one passent par _completeMany2OneValue qui attend
     * { id, display_name }, pas le couple [id, name] (sinon id/display_name
     * restent undefined et la mise à jour est ignorée).
     */
    async openRecord(record, options = {}) {
        const dirty = await record.isDirty();
        if (dirty) {
            await record.save();
        }
        const fieldName = this.props.parentField;
        const displayName = record.data?.display_name;
        const data = {
            [fieldName]: {
                id: record.resId,
                display_name: displayName,
            },
        };
        await this.props.parentRecord.update(data);
    }
    async clickAddAll() {
        await this.props.parentRecord.save();
        await this.model.orm.call(
            this.props.parentRecord.resModel,
            "add_multiple_lines",
            [this.props.parentRecord.resIds, this.model.root.domain]
        );
        await this.props.parentRecord.load();
        this.props.parentRecord.model.notify();
    }
}

ReconcileMoveLineController.template = `account_reconcile_oca.ReconcileMoveLineController`;
ReconcileMoveLineController.props = {
    ...ListController.props,
    parentRecord: {type: Object, optional: true},
    parentField: {type: String, optional: true},
};
