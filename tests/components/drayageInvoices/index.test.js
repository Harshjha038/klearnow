import React from 'react';
import renderer from 'react-test-renderer';

import '../../__mocks__/env-config';
import DrayageInvoice from '../../../src/components/drayageInvoices';

test('DrayageInvoice renders correctly', () => {
    const tree = renderer.create(
        <DrayageInvoice
        invoiceContainer = ''
        invoiceContainerNumber = {1}
        />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
})