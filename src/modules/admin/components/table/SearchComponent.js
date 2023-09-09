import {useEffect, useState} from 'react';

export default function SearchComponent({handleSearchChange}) {
    const [inputValue, setInputValue] = useState("")
    const [debouncedInputValue, setDebouncedInputValue] = useState("")

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedInputValue(inputValue);
        }, 1000);
        return () => {
            clearTimeout(delayInputTimeoutId)
        };
    }, [inputValue]);


    useEffect(() => {
        // debouncedInputValue her değiştiğinde handleSearchChange'i çağır
        handleSearchChange({searchText: debouncedInputValue});
    }, [debouncedInputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <>
            <div style={{padding: "3px 0"}}>
                <input
                    className={'table-search-comp me-3'}
                    placeholder="Ara"
                    onChange={handleInputChange}
                />
            </div>
        </>
    );
}
