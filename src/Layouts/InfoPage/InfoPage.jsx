import * as React from 'react';
import Header from '../../Components/Header/Header';
import Confidentiality from './Confidentiality';
import FAQ from './FAQ';
import Offer from './Offer';

const InfoPage = ({ type }) => {
	return (
		<>
			<Header back={true} title={type} faq={false} />
			<div
				className="catalog__container"
				style={{
                    fontWeight: '300',
                    padding: 'calc(min(9vh, 95px)) 20px 50px 20px'
				}}
			>
				{
					type === 'FAQ' && <FAQ />
				}
				{
					type === 'Offer' && <Offer></Offer>
				}
				{
					type === 'Privacy' && <Confidentiality />
				}
			</div>
		</>
	);
};

export default InfoPage;
