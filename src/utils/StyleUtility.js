const isInputInvalid = (bool) => {
    return {
        marginRight: bool ? 'calc(1.5em + 0.75rem)' : '0',
        borderColor: bool ? '#dc3545' : '',
        backgroundImage: bool ? 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e")' : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right calc(0.375em + 0.1875rem) center',
        backgroundSize: 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)',
    }
}

export {
    isInputInvalid
}