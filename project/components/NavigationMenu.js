import React from 'react';
import {css, cx} from '@emotion/css'

import {CATEGORIES} from "../utils/constants";
import {hasCategoryArticles} from "../utils/helpers";

const styledListWrapper = css`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`;

const styledListItem = css`
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    color: blue;
    font-weight: bold;
  }
`;

const styledSearch = css`
padding: 7px;
`;

function NavigationMenu(
    {
        onSelectCategory,
        articles,
        onSearchInputChange
    }) {

    return (
        <ul className={styledListWrapper}>
            {hasCategoryArticles(articles, CATEGORIES.universe.id) &&
                <li className={styledListItem} onClick={() => onSelectCategory(CATEGORIES.universe.id)}>
                    {CATEGORIES.universe.value}
                </li>
            }
            {hasCategoryArticles(articles, CATEGORIES.elite.id) &&
                <li className={styledListItem} onClick={() => onSelectCategory(CATEGORIES.elite.id)}>
                    {CATEGORIES.elite.value}
                </li>
            }
            {hasCategoryArticles(articles, CATEGORIES.starpoint.id) &&
                <li className={styledListItem} onClick={() => onSelectCategory(CATEGORIES.starpoint.id)}>
                    {CATEGORIES.starpoint.value}
                </li>
            }
            {hasCategoryArticles(articles, CATEGORIES.eveOnline.id) &&
                <li className={styledListItem} onClick={() => onSelectCategory(CATEGORIES.eveOnline.id)}>
                    {CATEGORIES.eveOnline.value}
                </li>
            }
            <li>
            <input
                className={styledSearch}
                type="text" placeholder="Search.."
                onChange={(e) => onSearchInputChange(e.target.value)}
            />
            </li>
            <li className={styledListItem} onClick={() => onSelectCategory('all')}>
                Show All
            </li>
        </ul>
    );
}

export default NavigationMenu;