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

import CheckoutPayments from 'Component/CheckoutPayments';

export class CheckoutBillingPlugin {
    aroundRenderPayments(args, callback, instance) {
        const {
            isSavePayment,
            paymentMethods,
            onPaymentMethodSelect,
            onPaymentSavedInVaultChange,
            onStoredPaymentMethodSelect,
            setLoading,
            setDetailsStep,
            shippingAddress
        } = instance.props;

        if (!paymentMethods.length) {
            return null;
        }

        return (
            <CheckoutPayments
              isSavePayment={ isSavePayment }
              setLoading={ setLoading }
              setDetailsStep={ setDetailsStep }
              paymentMethods={ paymentMethods }
              onPaymentMethodSelect={ onPaymentMethodSelect }
              onPaymentSavedInVaultChange={ onPaymentSavedInVaultChange }
              onStoredPaymentMethodSelect={ onStoredPaymentMethodSelect }
              setOrderButtonVisibility={ instance.setOrderButtonVisibility }
              billingAddress={ shippingAddress }
              setOrderButtonEnableStatus={ instance.setOrderButtonEnableStatus }
            />
        );
    }
}

const {
    aroundRenderPayments
} = new CheckoutBillingPlugin();

export const config = {
    'Component/CheckoutBilling/Component': {
        'member-function': {
            renderPayments: aroundRenderPayments
        }
    }
};

export default config;
