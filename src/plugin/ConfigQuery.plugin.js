/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

const addBaseFields = (args, callback) => [
    ...callback(...args),
    'braintree_cc_vault'
];

export default {
    'Query/Config': {
        'member-function': {
            _getStoreConfigFields: addBaseFields
        }
    }
};
