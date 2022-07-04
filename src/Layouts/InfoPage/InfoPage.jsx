import * as React from 'react';
import Header from '../../Components/Header/Header';
import Confidentiality from './Confidentiality';
import FAQ from './FAQ';
import Offer from './Offer';
import ContactsPage from './ContactsPage';

const InfoPage = ({ type }) => {

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [])

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
				{
					type === 'Contacts' && <ContactsPage />
				}
			</div>
		</>
	);
};

export default InfoPage;
