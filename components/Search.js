import { useState, useRef } from 'react'
import { gql, useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift'
import debounce from 'lodash.debounce'
import { SearchStyles, DropDown, DropDownItem } from './styles/DropDown'
import { withApolloComponent } from '../lib/withApollo';
import { useRouter } from 'next/router';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY ($searchString: String!) {
        searchItems (searchString: $searchString) {
            id,
            title,
            image
        }
    }
`

const Search = () => {
    resetIdCounter();
    const [searchItems, { data, loading, error }] = useLazyQuery(SEARCH_ITEMS_QUERY, {
        fetchPolicy: 'no-cache'
    })
    const router = useRouter()
    const items = data?.searchItems || []
    const debounceSearchItems = useRef(debounce(function (searchString) {
        searchItems({
            variables: {
                searchString
            }
        })
    }, 350))
    const { getMenuProps, getInputProps, getComboboxProps, getItemProps, inputValue, isOpen, highlightedIndex } = useCombobox({
        items,
        onInputValueChange() {
            debounceSearchItems.current(inputValue)
        },
        onSelectedItemChange({ selectedItem }) {
            router.push({
                pathname: '/item/[id]',
                query: {
                    id: selectedItem.id
                }
            })
        },
        itemToString (item) {
            return item.title
        }
     })

    return (
    <SearchStyles>
        <div {...getComboboxProps()}>
            <input {...getInputProps({
                type: 'search',
                placeholder: 'Search for an item',
                id: 'search',
                className: loading ? 'loading' : ''
            })}/>
        </div>
        <DropDown {...getMenuProps()}>
            {isOpen ? items.map((item, index) => (
                <DropDownItem {...getItemProps({item, index, key: item.id})} highlighted={index === highlightedIndex}>
                    <img src={item.image} alt={item.title} width="50"/>
                    {item.title}
                </DropDownItem>
            )) : null}
            {isOpen && items.length === 0 && !loading && (<DropDownItem>Sorry, no items found</DropDownItem>)}          
        </DropDown>
    </SearchStyles>)
}

export default withApolloComponent(Search)
