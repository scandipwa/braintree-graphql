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

import { BRAINTREE } from '../component/Braintree/Braintree.config';

export class CheckoutBillingContainerPlugin {
    onPaymentSavedInVaultChange() {
        this.setState(({ isSavePayment }) => ({ isSavePayment: !isSavePayment }));
    }

    aroundContainerFunctions = (originalMember, instance) => ({
        ...originalMember,
        onPaymentSavedInVaultChange: this.onPaymentSavedInVaultChange.bind(instance)
    });

    aroundGetPaymentData(args, callback, instance) {
        const { paymentMethod: code, isSavePayment } = instance.state;

        if (code === BRAINTREE) {
            const [{ 0: { nonce } }] = args;

            return {
                code,
                additional_data: {
                    payment_method_nonce: nonce,
                    is_active_payment_token_enabler: isSavePayment
                }
            };
        }

        return callback(...args);
    }

    // Init state
    aroundComponentDidMouth = (args, callback, instance) => {
        callback.apply(instance, args);
        instance.setState({ isSavePayment: false });
    };
}

const {
    aroundContainerFunctions,
    aroundGetPaymentData,
    aroundComponentDidMouth
} = new CheckoutBillingContainerPlugin();

export const config = {
    'Component/CheckoutBilling/Container': {
        'member-property': {
            containerFunctions: aroundContainerFunctions
        },
        'member-function': {
            _getPaymentData: aroundGetPaymentData,
            componentDidMount: aroundComponentDidMouth
        }
    }
};

export default config;
