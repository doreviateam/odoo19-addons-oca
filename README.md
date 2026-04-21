# odoo19-addons-oca

**Dépôt GitHub** : [doreviateam/odoo19-addons-oca](https://github.com/doreviateam/odoo19-addons-oca)

## Objet

Ce répertoire accueille les **modules OCA additionnels** retenus pour le sandbox
Odoo local de Dorevia.

Il ne s'agit pas d'un miroir large d'OCA.
Il s'agit d'un **sous-ensemble minimal et choisi**, utile à l'instance locale et
à la démonstration en cours.

## Règle

On n'ajoute ici un module OCA que s'il répond à un besoin concret du sandbox
Odoo local.

Le principe à préserver est simple :

> on n'accumule pas des addons OCA "au cas où" ; on ne garde ici que ce qui sert
> réellement l'instance de travail.

## Contenu actuel

- `web_responsive`
- **Relances et encours client** (dépôt [OCA/credit-control](https://github.com/OCA/credit-control)) :
  - `account_invoice_overdue_warn` — bannière d’avertissement sur la fiche contact si factures en retard (branche **19.0** upstream)
  - `account_invoice_overdue_reminder` — assistant de relance courrier / e-mail / téléphone (copie depuis la branche **18.0** upstream, version manifest `19.0.1.0.0` en attendant un port officiel sur **19.0**)
- `account_statement_base`
- `account_reconcile_model_oca`
- `account_reconcile_oca`
- **DMS (OCA)** — confort métier documents, indépendant de la chaîne Vault :
  - `dms` (noyau)
  - `dms_field`, `dms_auto_classification`, `dms_field_auto_classification`, `dms_user_role`
  - `hr_dms_field`, `web_editor_media_dialog_dms` (optionnels selon besoin)
- **Association / Adhésions** (dépôt [OCA/vertical-association](https://github.com/OCA/vertical-association)) :
  - `membership_extension` — extension de la gestion des adhésions (base **18.0** upstream, portée localement pour **19.0**)
- **Contacts / identité** (dépôt [OCA/partner-contact](https://github.com/OCA/partner-contact), branche **19.0**) :
  - `partner_firstname` — prénom et nom séparés sur les partenaires personnes (AGPL-3) ; dépend uniquement de `base_setup`
- **Packs produit (kits)** (dépôt [OCA/product-pack](https://github.com/OCA/product-pack)) :
  - `product_pack` — noyau **pack** / composition de produits (copie **branche 19.0** upstream, `installable: True`)
  - `sale_product_pack`, `purchase_product_pack`, `stock_product_pack`, `sale_stock_product_pack` — extensions vente / achat / stock (copie **branche 18.0** upstream au moment de l’import ; `__manifest__.py` en **19.0.1.0.0**, **`installable: False`** jusqu’au port fonctionnel Odoo 19 ; `stock_product_pack` : `auto_install` désactivé tant que le module n’est pas installable)

## Frontière

- `odoo19-addons-dorevia/` : modules Dorevia reconstruits et versionnés pour la chaîne locale — [dépôt GitHub](https://github.com/doreviateam/odoo19-addons-dorevia)
- `odoo19-addons-oca/` : modules OCA externes retenus pour l'instance Odoo locale (ce dépôt)

## Source

`web_responsive` a été copié depuis la source OCA du lab historique afin de
disposer d'une copie locale claire dans le workspace courant.

Le lot minimal de réconciliation bancaire OCA a aussi été ajouté pour Odoo 19 :

- `account_statement_base`
- `account_reconcile_model_oca`
- `account_reconcile_oca`

Il constitue le paquet minimal retenu pour ouvrir le front de réconciliation
bancaire sans embarquer d'extensions annexes prématurées.

Les modules **credit-control** ci-dessus proviennent du dépôt
[OCA/credit-control](https://github.com/OCA/credit-control).

Les modules **DMS** proviennent du dépôt [OCA/dms](https://github.com/OCA/dms) ;
ils sont copiés ici pour être servis par le **même** `addons_path` `/mnt/odoo19-addons-oca` que
le reste des OCA retenus (plus de montage séparé `oca-dms` dans le sandbox).

Le module **membership_extension** provient du dépôt
[OCA/vertical-association](https://github.com/OCA/vertical-association), branche
**18.0** (pas de dossier module disponible sur la branche **19.0** au moment de
l'intégration locale). Une adaptation locale est appliquée pour usage **19.0**.

Les **immobilisations** sont gérées avec le module standard **`account_asset`**
(Facturation / Comptabilité) : pas de lot OCA `account_asset_management` dans ce
répertoire (il exclut d’ailleurs `account_asset` et sert d’alternative, pas de
complément).

Le module **`partner_firstname`** provient du dépôt
[OCA/partner-contact](https://github.com/OCA/partner-contact) (branche **19.0**) ;
seul ce dossier module est copié ici (pas l’intégralité du dépôt).

Les modules **product_pack** et extensions **sale_** / **purchase_** / **stock_** /
**sale_stock_product_pack** proviennent du dépôt [OCA/product-pack](https://github.com/OCA/product-pack) :
**`product_pack`** est aligné sur la branche **19.0** officielle ; les quatre autres
dossiers sont importés depuis la branche **18.0** (absence de versions prêtes sur
**19.0** upstream au moment de l’import) et restent **non installables** jusqu’à
adaptation du code et des dépendances pour Odoo 19.
