const capitalize = (str) => {
    if(!str) throw new Error('A string is required')
    str = str.toLowerCase().trim();
    let aux = str.at(0).toUpperCase();

    for (let i = 1; i < str.length; i++) 
        aux += (str.charCodeAt(i - 1) == 32) ? str.at(i).toUpperCase() : str.at(i);
    
    return aux;
};

module.exports = { capitalize }