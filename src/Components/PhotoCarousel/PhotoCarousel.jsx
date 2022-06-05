import React from 'react';
import './PhotoCarousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const indicatorStyles = {
    background: '#727272',
    width: 8,
    height: 8,
    display: 'inline-block',
    margin: '0 13px',
    borderRadius: '50%'
};


const PhotoCarousel = ({ imgArr }) => {
    return (
        <div style={{marginTop: '50px', marginBottom:'80px'}}>
            <Carousel
                width={'100%'}
                showThumbs={false}
                autoPlay={true} 
                interval={5500}
                showArrows={false}
                swipeable={true}
                emulateTouch={true}
                infiniteLoop={true}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <li
                                style={{ ...indicatorStyles, background: '#2984c6' }}
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            style={indicatorStyles}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            title={`${label} ${index + 1}`}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}
            >
                {imgArr.map((elem, index) => 
                    <div key={index}>
                        <img className='carousel-image' src={elem} alt='Housing'/>
                    </div>    
                )}
            </Carousel>
        </div>
    );
}
 
export default PhotoCarousel;