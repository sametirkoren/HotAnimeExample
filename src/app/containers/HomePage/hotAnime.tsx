import React from 'react';
import { createSelector } from 'reselect';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { makeSelectAnimePage } from './selectors';


const HotAnimeContainer = styled.div`
    display: block;
    margin: 1rem auto;
    padding: 0;
    font-size: 0;
    text-align: center;
`;


const AnimeItemContainer = styled.div`
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    display: inline-block;
    width: 90%;
    max-width: 20rem;
    margin: 1rem;
    font-size: 1rem;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 3rem -1rem rgba(0,0,0,0.5);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s;
    &:hover {
        transform: translateY(-0.5rem) scale(1.0125);
        box-shadow: 0 0.5em 3rem -1rem rgba(0,0,0,0.5);
    }
`;

const AnimeCover = styled.div`
    width: auto;
    height: 30em;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

const AnimeTitle = styled.h6`
    display: block;
    padding: 1em 0.5em;
    color: #515151;
    font-size: 11.5px;
`;

const AnimeAverageScore = styled.div`
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
`


const stateSelector = createSelector(makeSelectAnimePage, (animePage) => ({
    animePage
}))


export function HotAnime() {
    const {animePage} = useAppSelector(stateSelector);

    const isEmptyAnimePage = !animePage || !animePage.media || animePage.media.length === 0

    if(isEmptyAnimePage)
        return null;


        const getAverageScoreColor = (averageScore: number) => {
            if(averageScore >= 85 && averageScore <= 100) {
                return 'green';
            }
            if(averageScore >= 70 && averageScore <= 84) {
                return '#DEC20B';
            }
            return 'red';
        }

    return <HotAnimeContainer>
        {animePage && animePage.media && animePage.media.map((anime) => (
             <AnimeItemContainer>
                <AnimeCover>
                    <img src={anime?.coverImage?.extraLarge || ""} />
                </AnimeCover>
                <AnimeTitle>{anime?.title?.english || anime?.title?.native}</AnimeTitle>
                <AnimeAverageScore style={{ backgroundColor: getAverageScoreColor(anime?.averageScore!)}}>{anime?.averageScore}</AnimeAverageScore>
             </AnimeItemContainer>

        ))}
    </HotAnimeContainer>
}