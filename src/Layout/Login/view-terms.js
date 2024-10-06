/*************************************************************************
 *
 * KLEAREXPRESS CONFIDENTIAL
 * __________________
 *
 *  Copyright (c) 2018 - 2018 KlearExpress Corporation.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of KlearExpress Corporation and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to KlearExpress Corporation
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from KlearExpress Corporation.
 */


import React, { Component } from 'react';
import { Segment, Form, Header, } from 'semantic-ui-react';
// import Images from '../media/tos/tos';
import {Link} from 'react-router-dom'
import TOS from './tos/index';
import './css/terms-of-service.css';

class ViewTerms extends Component {

	render() {
		return (
			<div className="mainContainer">
                <div className="flex-container">
                    <div className="top-content">
						<Segment padded='very' className="tos-form">
							<Form onSubmit={this.handleSubmit}>
								<center>
									<Header className='tos-title' as='h1'>KLEARNOW Corp. Terms and conditions of service.</Header>
									<Header className='tos-title' as='h5'>UNITED STATES AND CANADA</Header>
									<Header className='tos-title' as='h5'>As of October 5th, 2018</Header>
								</center>
								<Form.Field>
									<div className="tosContainer">
										<TOS />
									</div>
								</Form.Field>
							</Form>
						</Segment>
					</div>
					<div className="footer-wrapper" style={{ "color": "white", "marginTop": "25px" }}>
                        <p>
                            <span className="companyName">
                                <strong>KlearNow Corp.</strong>
                            </span>
                            &nbsp; &nbsp;| &nbsp; &nbsp;
                            <Link to="/view-terms" style={{ "color": "white", "margin-top": "25px" }}>Terms</Link>
                            &nbsp; &nbsp; | &nbsp; &nbsp;
                            <Link to="/privacy" style={{ "color": "white", "margin-top": "25px" }}>Privacy</Link>
                            &nbsp; &nbsp;
                        </p>
                    </div>
				</div>
			</div>
		);
	}
}

export default ViewTerms;
