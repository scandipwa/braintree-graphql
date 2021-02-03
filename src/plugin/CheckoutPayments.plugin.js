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

import PropTypes from 'prop-types';

import Braintree from '../component/Braintree';
import { BRAINTREE } from '../component/Braintree/Braintree.config';

export class CheckoutPaymentsPlugin {
    renderBrainTreePayment() {
        const {
            initBraintree,
            onPaymentSavedInVaultChange,
            isSavePayment,
            braintreeVaultActive
        } = this.props;

        return (
            <Braintree
              init={ initBraintree }
              onPaymentSavedInVaultChange={ onPaymentSavedInVaultChange }
              isSavePayment={ isSavePayment }
              isVaultActive={ braintreeVaultActive }
            />
        );
    }

    addBrainTreePayment = (originalMember, instance) => ({
        ...originalMember,
        [BRAINTREE]: this.renderBrainTreePayment.bind(instance, this)
    });

    aroundPropTypes = (args, callback) => {
        return {
            ...callback,
            braintreeVaultActive: PropTypes.bool.isRequired,
            onPaymentSavedInVaultChange: PropTypes.func.isRequired
        };
    };
}

const {
    addBrainTreePayment,
    aroundPropTypes
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: addBrainTreePayment
        },
        'member-function': {
            propTypes: aroundPropTypes
        }
    }
};

export default config;
