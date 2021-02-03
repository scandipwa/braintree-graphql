/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/braintree-graphql
 * @link https://github.com/scandipwa/braintree-graphql
 */

import { BRAINTREE, BRAINTREE_CONTAINER_ID } from '../component/Braintree/Braintree.config';
import BraintreeDropIn from '../util/Braintree';

export class CheckoutPaymentsContainerPlugin {
    braintree = new BraintreeDropIn(BRAINTREE_CONTAINER_ID);

    aroundMapStateToProps = (args, callback) => {
        const {
            0: {
                ConfigReducer: {
                    braintree_cc_vault: braintreeVaultActive
                }
            }
        } = args;

        return {
            ...callback(...args),
            braintreeVaultActive
        }
    }

    aroundContainerFunctions = (originalMember) => ({
        ...originalMember,
        initBraintree: this.initBraintree.bind(this)
    });

    aroundDataMap = (originalMember, instance) => ({
        ...originalMember,
        [BRAINTREE]: this.getBraintreeData.bind(instance, this)
    });

    getBraintreeData(instance) {
        const {
            totals: {
                grand_total = 0
            },
            email,
            address
        } = this.props;

        return {
            asyncData: instance.braintree.requestPaymentNonce(grand_total, email, address)
        };
    }

    initBraintree() {
        return this.braintree.create();
    }
}

const {
    aroundContainerFunctions,
    aroundDataMap,
    aroundMapStateToProps
} = new CheckoutPaymentsContainerPlugin();

export const config = {
    'Component/CheckoutPayments/Container': {
        'member-property': {
            containerFunctions: aroundContainerFunctions,
            dataMap: aroundDataMap
        }
    },
    'Component/CheckoutPayments/Container/mapStateToProps': {
        function: aroundMapStateToProps
    }
};

export default config;

