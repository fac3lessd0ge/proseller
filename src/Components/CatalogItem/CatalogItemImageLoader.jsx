import * as React from 'react';
import ContentLoader from 'react-content-loader';

const CatalogItemImageLoader = () => {
	return (
		<ContentLoader
			speed={1.3}
			width={150}
			height={150}
			viewBox="0 0 150 150"
			backgroundColor="#4b4b4b"
			foregroundColor="#959595"
		>
			<rect x="0" y="0" rx="4" ry="4" width="150" height="150" />
		</ContentLoader>
	);
};

export default CatalogItemImageLoader;
