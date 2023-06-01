/**
 * @jest-environment jsdom
 */

global.window = window;
global.$ = require('jquery');
global.jQuery = $;

const { expect } = require('@jest/globals');

const {Meme, MemeController, setUpButton} = require('./script');
const {dataFetchSuccessCallback, SERVER_URL} = require('./fetch-script');

describe('should implement fetch script', () => {

    test('should return an empty list from an empty list of JSON', () => {
        const data = [];
        const actual = dataFetchSuccessCallback(data);
        expect(actual).toEqual([]);
    });

    test('should return a list of 1 meme from an array of 1 meme', () => {
        const meme1 = {
            "like_count" : 1,
            "title" : "Always have pretty code!",
            "url" : "https://example.zyx/meme_1.jpg"
        };
        const data = [meme1];
        const expectMeme1 = {
            _likeNumber : 1,
            _url: "https://example.zyx/meme_1.jpg",
            _title: "Always have pretty code!",
            _id: 0
        };
        
        const actual = dataFetchSuccessCallback(data);
        
        expect(actual).toEqual([expectMeme1]);
    });

    test('should set correct IDs for the list of 3 memes', () => {
        const meme1 = {
            "like_count" : 3,
            "title" : "Meme 1",
            "url" : "https://example.zyx/meme_1.jpg"
        };

        const meme2 = {
            "like_count" : -100,
            "title" : "Meme 2",
            "url" : "https://example.zyx/meme_2.jpg"
        };

        const meme3 = {
            "like_count" : 7,
            "title" : "Meme 3",
            "url" : "https://example.zyx/meme_3.jpg"
        };
        const data = [meme1, meme2, meme3];
        
        const actual = dataFetchSuccessCallback(data);
        
        expect(actual[0].ID).toEqual(0);
        expect(actual[1].ID).toEqual(1);
        expect(actual[2].ID).toEqual(2);
    });

    test('should set the like number correctly', () => {
        const meme1 = {
            "like_count" : 3,
            "title" : "Meme 1",
            "url" : "https://example.zyx/meme_1.jpg"
        };

        const meme2 = {
            "like_count" : -100,
            "title" : "Meme 2",
            "url" : "https://example.zyx/meme_2.jpg"
        };

        const meme3 = {
            "like_count" : 7,
            "title" : "Meme 3",
            "url" : "https://example.zyx/meme_3.jpg"
        };
        const data = [meme1, meme2, meme3];
        
        const actual = dataFetchSuccessCallback(data);

        console.log(actual);
    
        expect(actual[0].likeNumber).toEqual(3);
        expect(actual[1].likeNumber).toEqual(-100);
        expect(actual[2].likeNumber).toEqual(7);
    });

    test('should set the title correctly', () => {
        const meme1 = {
            "like_count" : 3,
            "title" : "Meme 101",
            "url" : "https://example.zyx/meme_1.jpg"
        };

        const meme2 = {
            "like_count" : -100,
            "title" : "Meme 222",
            "url" : "https://example.zyx/meme_2.jpg"
        };

        const meme3 = {
            "like_count" : 7,
            "title" : "Meme 33",
            "url" : "https://example.zyx/meme_3.jpg"
        };
        const data = [meme1, meme2, meme3];
        
        const actual = dataFetchSuccessCallback(data);

        console.log(actual);
    
        expect(actual[0].title).toEqual("Meme 101");
        expect(actual[1].title).toEqual("Meme 222");
        expect(actual[2].title).toEqual("Meme 33");
    });

    test('should set the url correctly', () => {
        const meme1 = {
            "like_count" : 3,
            "title" : "Meme 101",
            "url" : "https://example.xyz/meme_1.jpg"
        };

        const meme2 = {
            "like_count" : -100,
            "title" : "Meme 222",
            "url" : "https://example.xyz/meme_2.jpg"
        };

        const meme3 = {
            "like_count" : 7,
            "title" : "Meme 33",
            "url" : "https://example.xyz/meme_3.jpg"
        };
        const data = [meme1, meme2, meme3];
        
        const actual = dataFetchSuccessCallback(data);

        console.log(actual);
    
        expect(actual[0].URL).toEqual("https://example.xyz/meme_1.jpg");
        expect(actual[1].URL).toEqual("https://example.xyz/meme_2.jpg");
        expect(actual[2].URL).toEqual("https://example.xyz/meme_3.jpg");
    });

    test('should return a list of 3 memes from an array of 3 memes', () => {
        const meme1 = {
            "like_count" : 3,
            "title" : "Meme 1",
            "url" : "https://example.zyx/meme_1.jpg"
        };

        const meme2 = {
            "like_count" : -100,
            "title" : "Meme 2",
            "url" : "https://example.zyx/meme_2.jpg"
        };

        const meme3 = {
            "like_count" : 7,
            "title" : "Meme 3",
            "url" : "https://example.zyx/meme_3.jpg"
        };
        const data = [meme1, meme2, meme3];
        const expectMeme1 = {
            _likeNumber : 3,
            _url: "https://example.zyx/meme_1.jpg",
            _title: "Meme 1",
            _id: 0
        };

        const expectMeme2 = {
            _likeNumber : -100,
            _url: "https://example.zyx/meme_2.jpg",
            _title: "Meme 2",
            _id: 1
        };

        const expectMeme3 = {
            _likeNumber : 7,
            _url: "https://example.zyx/meme_3.jpg",
            _title: "Meme 3",
            _id: 2
        };
        
        const actual = dataFetchSuccessCallback(data);
        
        expect(actual).toEqual([expectMeme1, expectMeme2, expectMeme3]);
    });

    test('should set up the SERVER_URL correctly', () => {
        expect(SERVER_URL).toEqual('https://javascriptclass-22d93.firebaseio.com/memes.json?print=pretty');
    });
});