/**
 * 
 * @returns a word to try to guess in the app
 */

export interface WordData{
    word: string;
    deletor: string;
    revision_id: number;
    modetator: string;
    xml:  string;
    deleted?: number;
    last_revision: number;
    sense: number;
    creator: string;
    timestamp: string;
    normalized: string;
    derived_from: string;
    word_id: number;
}

export const getRandomWord = async (): Promise<WordData> => {
    try{   
        const randomWordFetch = await fetch('https://api.dicionario-aberto.net/random', {
            method: 'GET'
        });
    
        const randomWordResponse = await randomWordFetch.json();
    
        const wordFetchMoreData = await fetch(`https://api.dicionario-aberto.net/word/${randomWordResponse.word}/1`, {
            method: 'GET'
        });
    
        const finalWordData =  await wordFetchMoreData.json();
        return finalWordData[0];
    }catch(err){
        console.log(err);
        return {word: ''}
    }
}